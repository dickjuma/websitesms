import { techStack } from "@/lib/site-data";
import { SiteIcon } from "@/components/ui/site-icon";
import { Users, Award, TrendingUp, CheckCircle, Code, Database, Cloud, Shield, BarChart, Smartphone, Settings, TestTube } from "lucide-react";

export function TechStackSection() {
  // Group tech by service area with explanations
  const serviceAreas = [
    {
      name: "Mobile App Development",
      icon: Smartphone,
      description: "Native iOS (Swift/SwiftUI), Android (Kotlin), and cross‑platform (React Native, Flutter).",
      tools: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "Fastlane"],
      implementation: "We use **Firebase** for real‑time sync and push notifications. **Fastlane** automates screenshots, beta distribution, and release. **SonarQube** ensures code quality."
    },
    {
      name: "API & Integrations",
      icon: Code,
      description: "REST, GraphQL, WebSocket APIs; third‑party integrations (payment, CRM, ERP).",
      tools: ["Node.js", "Python/FastAPI", "Kong Gateway", "JWT/OAuth2", "OpenAPI", "Postman"],
      implementation: "**Kong** unifies rate limiting, logging, and key management. **OpenAPI** specs generate interactive docs and client SDKs automatically."
    },
    {
      name: "Cloud & DevOps",
      icon: Cloud,
      description: "Infrastructure as Code, CI/CD, container orchestration, observability.",
      tools: ["AWS/Azure/GCP", "Terraform", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana"],
      implementation: "We version all infrastructure with **Terraform** and automate deployments via **ArgoCD** (GitOps). **Prometheus** collects metrics, **Grafana** visualises them."
    },
    {
      name: "CRM & ERP Systems",
      icon: Settings,
      description: "Custom CRM/ERP modules: sales, support, finance, HR, inventory.",
      tools: ["React/Next.js", "Node.js/NestJS", "PostgreSQL", "Redis", "Camunda", "BullMQ"],
      implementation: "**Refine.dev** for rapid admin panels. **Camunda** models BPMN approval workflows. **Temporal** ensures reliable execution of long‑running processes."
    },
    {
      name: "Data Analytics & BI",
      icon: BarChart,
      description: "Data warehouses, ETL pipelines, interactive dashboards, predictive models.",
      tools: ["Snowflake/BigQuery", "dbt", "Airflow", "Tableau/Power BI", "Python (scikit‑learn)"],
      implementation: "**dbt** transforms raw data inside Snowflake. **Airflow** schedules daily refreshes. **scikit‑learn** models run on AWS Lambda and push forecasts back into the warehouse."
    },
    {
      name: "Cybersecurity",
      icon: Shield,
      description: "MDR, compliance audits, penetration testing, CSPM.",
      tools: ["Wazuh (SIEM)", "Snyk", "Burp Suite", "Drata", "AWS GuardDuty", "TheHive"],
      implementation: "**Wazuh** agents collect logs and detect anomalies. **Snyk** scans repos for vulnerabilities. **Drata** automates 80% of compliance evidence gathering."
    },
    {
      name: "QA & Testing",
      icon: TestTube,
      description: "Manual/exploratory testing, test automation, performance & security testing.",
      tools: ["Playwright", "Jest", "k6", "OWASP ZAP", "TestRail", "Allure"],
      implementation: "**Playwright** tests run in parallel across browsers. **k6** simulates thousands of users. **Allure** generates rich test reports."
    }
  ];

  return (
    <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Technology Stack
            </span>
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Built With Modern Tech
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            We use industry-leading tools and frameworks to build scalable, secure, and performant systems.
          </p>
        </div>

        {/* Team Expertise Banner */}
        <div className="mb-16 rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Full‑Stack Expertise</h3>
                <p className="text-slate-600">
                  Our team handles everything from frontend to backend, databases to cloud, and DevOps to QA.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                15+ Senior Engineers
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                Full‑Cycle Development
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                Multi‑Cloud Certified
              </span>
            </div>
          </div>
        </div>

        {/* Service Areas with Tools & Implementation */}
        <div className="grid gap-12">
          {serviceAreas.map((area) => (
            <div key={area.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <area.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{area.name}</h3>
              </div>
              <p className="text-slate-600">{area.description}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-blue-700">Tools we use:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {area.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-800">How we implement it:</p>
                <p className="mt-1 text-sm text-slate-700">{area.implementation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-700">30+</p>
            <p className="mt-2 text-sm text-slate-600">Technologies & Frameworks</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-700">10+</p>
            <p className="mt-2 text-sm text-slate-600">Years of Combined Experience</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-700">3</p>
            <p className="mt-2 text-sm text-slate-600">Cloud Providers (AWS, Azure, GCP)</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-700">24/7</p>
            <p className="mt-2 text-sm text-slate-600">DevOps & Support Coverage</p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">
              Production‑proven stacks | Enterprise security | CI/CD ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}