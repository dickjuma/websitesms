import {
  Smartphone,
  Code,
  Cloud,
  Settings,
  BarChart,
  Shield,
  TestTube,
  Database,
  Server,
  GitBranch,
  Lock,
  CheckCircle,
} from "lucide-react";

// Hardcoded tech stack categories (no external dependency)
const techCategories = [
  {
    name: "Mobile App Development",
    icon: Smartphone,
    description:
      "Native and cross‑platform apps for iOS and Android, with real‑time sync and offline support.",
    technologies: ["Swift / SwiftUI", "Kotlin", "React Native", "Flutter", "Firebase", "Fastlane"],
    implementation:
      "We use **Firebase** for real‑time sync and push notifications. **Fastlane** automates builds and distribution.",
  },
  {
    name: "API & Integrations",
    icon: Code,
    description: "REST, GraphQL, and WebSocket APIs with secure authentication and third‑party integrations.",
    technologies: ["Node.js", "Python / FastAPI", "Kong Gateway", "JWT / OAuth2", "OpenAPI", "Postman"],
    implementation:
      "**Kong** handles rate limiting and key management. **OpenAPI** specs generate interactive documentation.",
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    description: "Infrastructure as Code, CI/CD pipelines, container orchestration, and observability.",
    technologies: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana"],
    implementation:
      "We version all infrastructure with **Terraform** and automate deployments via **ArgoCD** (GitOps).",
  },
  {
    name: "CRM & ERP Systems",
    icon: Settings,
    description: "Custom business systems for sales, finance, HR, inventory, and approval workflows.",
    technologies: ["React / Next.js", "Node.js / NestJS", "PostgreSQL", "Redis", "Camunda", "BullMQ"],
    implementation:
      "**Refine.dev** for rapid admin panels. **Camunda** models BPMN workflows. **Temporal** ensures reliable execution.",
  },
  {
    name: "Data Analytics & BI",
    icon: BarChart,
    description: "Data warehouses, ETL pipelines, interactive dashboards, and predictive models.",
    technologies: ["Snowflake", "BigQuery", "dbt", "Airflow", "Tableau", "Power BI", "scikit‑learn"],
    implementation:
      "**dbt** transforms raw data inside Snowflake. **Airflow** schedules daily refreshes. Models run on AWS Lambda.",
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    description: "MDR, compliance audits, penetration testing, and cloud security posture management.",
    technologies: ["Wazuh (SIEM)", "Snyk", "Burp Suite", "Drata", "AWS GuardDuty", "TheHive"],
    implementation:
      "**Wazuh** agents detect anomalies. **Snyk** scans repos for vulnerabilities. **Drata** automates compliance.",
  },
  {
    name: "QA & Testing",
    icon: TestTube,
    description: "Manual exploratory testing, test automation, performance, and security testing.",
    technologies: ["Playwright", "Jest", "k6", "OWASP ZAP", "TestRail", "Allure"],
    implementation:
      "**Playwright** runs parallel cross‑browser tests. **k6** simulates thousands of users. **Allure** generates rich reports.",
  },
  {
    name: "Databases & Storage",
    icon: Database,
    description: "Relational, NoSQL, and object storage for any scale.",
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "S3", "Elasticsearch"],
    implementation:
      "We choose the right database per use case – PostgreSQL for transactional integrity, Redis for caching, Elasticsearch for search.",
  },
  {
    name: "Backend Frameworks",
    icon: Server,
    description: "High‑performance server‑side frameworks and runtimes.",
    technologies: ["Node.js / Express", "NestJS", "Python / Django", "FastAPI", "Java / Spring Boot"],
    implementation:
      "We build modular, testable backends with NestJS or FastAPI, ensuring clean architecture and easy maintenance.",
  },
  {
    name: "Version Control & CI/CD",
    icon: GitBranch,
    description: "Collaborative development and automated deployment pipelines.",
    technologies: ["GitHub", "GitLab", "Bitbucket", "GitHub Actions", "GitLab CI", "Jenkins"],
    implementation:
      "Every project uses **Git** with feature branches. CI runs linting, tests, and security scans on every pull request.",
  },
];

export function TechStackSection() {
  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="border-t border-slate-200 bg-white px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 md:px-4 md:py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 md:text-sm">
              Technology Stack
            </span>
          </div>
          <h2
            id="tech-stack-heading"
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl"
          >
            Built With Modern Tech
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:mt-6 md:text-lg">
            We use industry‑leading tools and frameworks to build scalable,
            secure, and performant systems – tailored for Kenyan businesses.
          </p>
        </div>

        {/* Expertise summary card – flat, no gradient */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm md:mb-16 md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 md:h-12 md:w-12">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 md:text-xl">
                  Full‑Stack Expertise
                </h3>
                <p className="text-sm text-slate-600">
                  Our team handles everything from frontend to backend, databases to cloud, and DevOps to QA.
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 md:gap-3" aria-label="Expertise badges">
              <li className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 md:px-3 md:text-sm">
                15+ Senior Engineers
              </li>
              <li className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 md:px-3 md:text-sm">
                Full‑Cycle Development
              </li>
              <li className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 md:px-3 md:text-sm">
                Multi‑Cloud Certified
              </li>
            </ul>
          </div>
        </div>

        {/* Tech categories – semantic grid */}
        <ul className="grid gap-6 md:gap-8">
          {techCategories.map((category) => (
            <li key={category.name}>
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-6">
                <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 md:h-10 md:w-10">
                    <category.icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 md:text-xl">
                    {category.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 md:text-base">
                  {category.description}
                </p>
                <div className="mt-3 md:mt-4">
                  <p className="text-xs font-semibold text-blue-700 md:text-sm">
                    Technologies we use:
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5 md:mt-2 md:gap-2">
                    {category.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 md:px-3 md:py-1"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 rounded-lg bg-blue-50 p-3 md:mt-4 md:p-4">
                  <p className="text-xs font-semibold text-blue-800 md:text-sm">
                    How we implement it:
                  </p>
                  <p className="mt-1 text-xs text-slate-700 md:text-sm">
                    {category.implementation}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Stats section – flat counters */}
        <ul
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20 md:gap-6"
          aria-label="Technology statistics"
        >
          <li className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm md:p-6">
            <p className="text-2xl font-bold text-blue-700 md:text-3xl">50+</p>
            <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
              Technologies & Frameworks
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm md:p-6">
            <p className="text-2xl font-bold text-blue-700 md:text-3xl">10+</p>
            <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
              Years of Combined Experience
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm md:p-6">
            <p className="text-2xl font-bold text-blue-700 md:text-3xl">3</p>
            <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
              Cloud Providers (AWS, Azure, GCP)
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm md:p-6">
            <p className="text-2xl font-bold text-blue-700 md:text-3xl">24/7</p>
            <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
              DevOps & Support Coverage
            </p>
          </li>
        </ul>

        {/* Bottom trust badge */}
        <div className="mt-8 text-center md:mt-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 md:px-4 md:py-2">
            <Lock className="h-3.5 w-3.5 text-blue-600 md:h-4 md:w-4" aria-hidden="true" />
            <span className="text-xs font-medium text-slate-700 md:text-sm">
              Production‑proven stacks | Enterprise security | CI/CD ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
