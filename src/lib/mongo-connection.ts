import { Resolver } from "node:dns/promises";
import { MongoClient, type MongoClientOptions } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const PUBLIC_DNS_SERVERS = ["1.1.1.1", "8.8.8.8"];

type MongoUriCache = {
  fallbackUri: string | null;
  fallbackUriPromise: Promise<string> | null;
};

declare global {
  var mongoUriCache: MongoUriCache | undefined;
}

const cache = global.mongoUriCache || {
  fallbackUri: null,
  fallbackUriPromise: null,
};

global.mongoUriCache = cache;

export function getMongoUri() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return MONGODB_URI;
}

export function isSrvDnsLookupError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const details = `${"code" in error ? String(error.code) : ""} ${error.message}`;
  return /querySrv|ECONNREFUSED|ETIMEOUT|ENOTFOUND|ESERVFAIL|EAI_AGAIN/i.test(
    details,
  );
}

function getDnsServers() {
  const configuredServers = process.env.MONGODB_DNS_SERVERS
    ?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  return configuredServers?.length ? configuredServers : PUBLIC_DNS_SERVERS;
}

async function resolveWithFallback<T>(
  name: string,
  resolve: (resolver: Resolver, recordName: string) => Promise<T>,
) {
  const resolvers = [new Resolver()];
  const fallbackResolver = new Resolver();
  fallbackResolver.setServers(getDnsServers());
  resolvers.push(fallbackResolver);

  let lastError: unknown = null;

  for (const resolver of resolvers) {
    try {
      return await resolve(resolver, name);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Failed to resolve MongoDB DNS records for ${name}.`);
}

function mergeTxtOptions(
  searchParams: URLSearchParams,
  txtRecords: string[][],
) {
  for (const entry of txtRecords.flat()) {
    for (const segment of entry.split("&")) {
      const [key, value = ""] = segment.split("=");
      if (!key || searchParams.has(key)) {
        continue;
      }

      searchParams.set(key, value);
    }
  }
}

async function buildDirectMongoUri(uri: string) {
  if (!uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  const parsedUri = new URL(uri);
  const srvRecordName = `_mongodb._tcp.${parsedUri.host}`;
  const srvRecords = await resolveWithFallback(srvRecordName, (resolver, name) =>
    resolver.resolveSrv(name),
  );

  if (!srvRecords.length) {
    throw new Error(`No MongoDB SRV records found for ${parsedUri.host}.`);
  }

  const txtRecords = await resolveWithFallback(parsedUri.host, (resolver, name) =>
    resolver.resolveTxt(name),
  ).catch(() => [] as string[][]);

  const searchParams = new URLSearchParams(parsedUri.searchParams);
  mergeTxtOptions(searchParams, txtRecords);

  if (!searchParams.has("tls") && !searchParams.has("ssl")) {
    searchParams.set("tls", "true");
  }

  const credentials =
    parsedUri.username || parsedUri.password
      ? `${parsedUri.username}${parsedUri.password ? `:${parsedUri.password}` : ""}@`
      : "";
  const databasePath = parsedUri.pathname === "/" ? "" : parsedUri.pathname;
  const hosts = srvRecords
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((record) => `${record.name}:${record.port}`)
    .join(",");
  const queryString = searchParams.toString();

  return `mongodb://${credentials}${hosts}${databasePath}${queryString ? `?${queryString}` : ""}`;
}

export async function getResolvedMongoUri() {
  const uri = getMongoUri();

  if (!uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  if (cache.fallbackUri) {
    return cache.fallbackUri;
  }

  if (!cache.fallbackUriPromise) {
    cache.fallbackUriPromise = buildDirectMongoUri(uri).catch((error) => {
      cache.fallbackUriPromise = null;
      throw error;
    });
  }

  cache.fallbackUri = await cache.fallbackUriPromise;
  return cache.fallbackUri;
}

export async function connectMongoClientWithFallback(
  options?: MongoClientOptions,
) {
  const uri = getMongoUri();
  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    return client;
  } catch (error) {
    await client.close().catch(() => undefined);

    if (!uri.startsWith("mongodb+srv://") || !isSrvDnsLookupError(error)) {
      throw error;
    }

    const fallbackUri = await getResolvedMongoUri();
    console.warn(
      "MongoDB SRV lookup failed. Retrying with resolved Atlas hosts.",
    );

    const fallbackClient = new MongoClient(fallbackUri, options);
    await fallbackClient.connect();
    return fallbackClient;
  }
}
