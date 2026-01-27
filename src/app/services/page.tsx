"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Smartphone,
  Database,
  Cloud,
  ShieldCheck,
  BarChart3,
  Globe,
  Layout,
  Cpu,
  Zap,
  Headphones,
  RefreshCw,
  ShoppingCart,
  Building2,
  Truck,
  CreditCard,
  Landmark,
  Briefcase,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const coreServices = [
  {
    icon: <Layout className="w-12 h-12" />,
    title: "Custom Web Development",
    description:
      "Responsive, high-performance websites built with Next.js, React, TypeScript, Tailwind CSS and modern Jamstack architecture.",
    color: "from-blue-500 to-indigo-600",
    features: ["SPA / SSR / SSG", "SEO optimized", "Progressive Web Apps", "Headless CMS integration"],
  },
  {
    icon: <Smartphone className="w-12 h-12" />,
    title: "Cross-Platform Mobile Apps",
    description:
      "Native-like iOS & Android applications developed once using React Native, Flutter or Expo — maximum code reuse, consistent experience.",
    color: "from-purple-500 to-pink-600",
    features: ["iOS + Android from one codebase", "Push notifications", "Offline capabilities", "App Store & Play Store deployment"],
  },
  {
    icon: <Database className="w-12 h-12" />,
    title: "Backend & API Development",
    description:
      "Robust, scalable server-side solutions — REST & GraphQL APIs, microservices, authentication, real-time features.",
    color: "from-emerald-500 to-teal-600",
    features: ["Node.js / Express / NestJS", "GraphQL / Apollo", "PostgreSQL / MongoDB / Prisma", "WebSockets / Socket.io"],
  },
  {
    icon: <Cloud className="w-12 h-12" />,
    title: "Cloud Architecture & DevOps",
    description:
      "Modern cloud-native infrastructure — serverless, containers, CI/CD pipelines, monitoring, auto-scaling.",
    color: "from-amber-500 to-orange-600",
    features: ["AWS / Vercel / Azure / GCP", "Docker & Kubernetes", "GitHub Actions / Jenkins", "Terraform & Infrastructure as Code"],
  },
];

const industrySolutions = [
  {
    icon: <ShoppingCart className="w-10 h-10" />,
    title: "E-Commerce Platforms",
    industries: "Retail • Fashion • Electronics • Marketplace",
    description:
      "Headless commerce, Shopify / Medusa / Saleor integrations, custom checkout flows, multi-vendor support, payment gateways.",
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: "FinTech & Banking Solutions",
    industries: "Digital Banking • Payment Gateways • Lending • Insurance",
    description:
      "Secure transaction systems, KYC/AML compliance, wallet apps, fraud detection, open banking APIs.",
  },
  {
    icon: <Truck className="w-10 h-10" />,
    title: "Logistics & Supply Chain",
    industries: "Transportation • Warehousing • Last-mile Delivery • Fleet Management",
    description:
      "Real-time tracking, route optimization, warehouse management systems, driver apps, IoT integration.",
  },
  {
    icon: <Building2 className="w-10 h-10" />,
    title: "Real Estate & Property Tech",
    industries: "Residential • Commercial • Property Management • Vacation Rentals",
    description:
      "Property listing portals, virtual tours, CRM, tenant portals, smart home integrations, booking engines.",
  },
  {
    icon: <Landmark className="w-10 h-10" />,
    title: "Enterprise & Government Systems",
    industries: "Public Sector • Healthcare • Education • NGOs",
    description:
      "Secure internal portals, document management, workflow automation, compliance-ready architecture.",
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    title: "SaaS Product Development",
    industries: "B2B Software • Productivity • HR Tech • EdTech",
    description:
      "Multi-tenant architecture, subscription billing, admin dashboards, analytics, white-label capabilities.",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block mb-6 px-5 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 font-medium text-sm tracking-wide uppercase">
              World-Class Software Engineering
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
              Modern Software <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Delivered at Its Best
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100/85 max-w-4xl mx-auto leading-relaxed mb-12">
              We combine clean architecture, domain-driven design, event sourcing, micro-frontends, serverless patterns,
              TypeScript-first development and continuous delivery to create maintainable, scalable, and delightful digital products.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Project
                <Zap className="w-5 h-5 group-hover:animate-pulse" />
              </Link>

              <Link
                href="#industries"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                See Industry Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              Core Development Capabilities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every project is built using battle-tested patterns and modern practices that deliver long-term value.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {coreServices.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-400 border border-slate-100 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.color}`}
                />
                <div className="relative z-10">
                  <div className="mb-6 text-blue-600">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm text-slate-500">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="industries" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              Industry-Specific Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tailored digital products that solve real problems in your vertical.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrySolutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
              >
                <div className="text-blue-600 mb-6">{solution.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{solution.title}</h3>
                <p className="text-slate-500 text-sm mb-4 font-medium">{solution.industries}</p>
                <p className="text-slate-600">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Delivery Practices */}
      <section className="py-20 md:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How We Deliver World-Class Software in 2025–2026
            </h2>
            <p className="text-xl text-blue-200 max-w-4xl mx-auto">
              Modern development is no longer about writing code — it's about creating maintainable, evolvable systems that deliver continuous business value.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "TypeScript + Modern Tooling",
                desc: "100% typed codebases with ESLint, Prettier, Husky, tsup, Vite / Turborepo",
              },
              {
                title: "Clean Architecture & DDD",
                desc: "Domain-driven design, use-case centric layers, dependency inversion, vertical slice architecture",
              },
              {
                title: "Event-Driven & CQRS",
                desc: "Event sourcing, message queues (RabbitMQ/Kafka), command/query separation when complexity requires it",
              },
              {
                title: "Continuous Delivery / GitOps",
                desc: "Trunk-based development, feature flags, automated preview environments, progressive delivery",
              },
              {
                title: "Observability First",
                desc: "OpenTelemetry, structured logging, distributed tracing, dashboards (Grafana/Prometheus)",
              },
              {
                title: "Security by Design",
                desc: "OWASP Top 10 mitigation, secret scanning, SAST/DAST, dependency scanning, zero-trust principles",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-300">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Ready to Build Something Remarkable?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90"
          >
            Let's create software that doesn't just work — it transforms your business.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="bg-white text-indigo-700 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Start a Project
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-white/40 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}