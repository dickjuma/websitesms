'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  noLink?: boolean;
};

interface SiteInfo {
  companyName?: string;
  logoUrl?: string;
}

export function Logo({ className = "", size = "md", noLink = false }: LogoProps) {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSiteInfo() {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data) {
          setSiteInfo(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch site info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSiteInfo();
  }, []);

  const sizeConfig = {
    sm: { containerClass: "h-8 w-8", textClass: "text-sm" },
    md: { containerClass: "h-11 w-11", textClass: "text-base" },
    lg: { containerClass: "h-14 w-14", textClass: "text-lg" },
  };

  const config = sizeConfig[size];
  const companyName = siteInfo.companyName || "SMA";
  const hasCustomLogo = siteInfo.logoUrl && siteInfo.logoUrl.length > 0;
  const logoUrl = siteInfo.logoUrl || "/images/logo.png";

  const logoContent = loading ? (
    <>
      <div className={`relative ${config.containerClass}`}>
        <Image
          src="/images/logo.png"
          alt="SMA"
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>
      <div className={`font-bold tracking-tight text-slate-950 ${config.textClass}`}>
        SMA
      </div>
    </>
  ) : (
    <>
      <div className={`relative ${config.containerClass}`}>
        <Image
          src={logoUrl}
          alt={companyName}
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>
      <div>
        <p
          className={`font-bold tracking-tight text-slate-950 ${config.textClass}`}
        >
          {companyName.replace(" Systems and Softwares", "").replace(" Systems", "")}
        </p>
        <p className="text-xs text-slate-500">Enterprise Solutions</p>
      </div>
    </>
  );

  if (noLink) {
    return (
      <div className={`flex items-center gap-3 ${className}`} suppressHydrationWarning>
        {logoContent}
      </div>
    );
  }

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 transition-all hover:scale-[1.01] ${className}`}
      suppressHydrationWarning
    >
      {logoContent}
    </Link>
  );
}

export function LogoMark({
  className = "",
  size = "md",
  noLink = false,
}: LogoProps & { noLink?: boolean }) {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSiteInfo() {
      try {
        const res = await fetch("/api/site", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data) {
          setSiteInfo(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch site info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSiteInfo();
  }, []);

  const sizeConfig = {
    sm: "h-8 w-8",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };

  const logoUrl = siteInfo.logoUrl || "/images/logo.png";

  const logoContent = loading ? (
    <div className={`relative ${sizeConfig[size]}`}>
      <Image
        src="/images/logo.png"
        alt="SMA"
        fill
        className="object-contain"
        sizes="48px"
      />
    </div>
  ) : (
    <div className={`relative ${sizeConfig[size]}`}>
      <Image
        src={logoUrl}
        alt="Logo"
        fill
        className="object-contain"
        sizes="48px"
      />
    </div>
  );

  if (noLink) {
    return <div className={`block ${className}`}>{logoContent}</div>;
  }

  return (
    <Link href="/" className={`block ${className}`}>
      {logoContent}
    </Link>
  );
}