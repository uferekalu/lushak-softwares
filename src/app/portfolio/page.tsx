"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Code, Smartphone, Globe, Database } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.5 },
  },
};

const projects = [
  {
    id: 1,
    title: "NovaPay – Digital Banking Platform",
    category: "FinTech / Mobile + Web",
    description:
      "Secure mobile-first banking app with real-time transactions, card management, savings goals, bill payments, and admin dashboard. Built with React Native + Next.js + NestJS + PostgreSQL.",
    image: "/images/portfolio/novapay-hero.jpg",
    tags: ["React Native", "Next.js", "NestJS", "PostgreSQL", "WebSocket", "Stripe"],
    year: "2025",
    role: "Lead Full-Stack Developer",
    link: "https://novapay.ng",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "ShopSphere – Multi-Vendor Marketplace",
    category: "E-Commerce",
    description:
      "Headless e-commerce platform supporting 50+ vendors, advanced search & filtering, real-time order tracking, seller dashboard, integrated payment & logistics APIs.",
    image: "/images/portfolio/shopsphere.jpg",
    tags: ["Next.js", "GraphQL", "Medusa.js", "Tailwind", "Redis", "Stripe Connect"],
    year: "2025",
    role: "Full-Stack & Architecture",
    link: "#",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 3,
    title: "LogiTrack – Logistics Management System",
    category: "Logistics / Enterprise",
    description:
      "End-to-end logistics platform with real-time GPS tracking, route optimization, warehouse management, driver mobile app, automated billing & analytics dashboard.",
    image: "/images/portfolio/logitrack.jpg",
    tags: ["Flutter", "Node.js", "MongoDB", "Socket.io", "Google Maps API", "Kafka"],
    year: "2024",
    role: "Technical Lead",
    link: "#",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "EstateHub – Real Estate Marketplace",
    category: "PropTech",
    description:
      "Modern property listing platform with virtual tours, AI-powered valuation, mortgage calculator, agent CRM, tenant screening & smart contract integration.",
    image: "/images/portfolio/estatehub.jpg",
    tags: ["Next.js", "TypeScript", "Prisma", "Three.js", "Stripe", "Sanity CMS"],
    year: "2025",
    role: "Full-Stack Developer",
    link: "#",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "EduFlow – Learning Management System",
    category: "EdTech / SaaS",
    description:
      "Multi-tenant LMS with course builder, live classes, quizzes, certificates, progress tracking, gamification, payment integration and admin analytics.",
    image: "/images/portfolio/eduflow.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "WebRTC", "MUI", "Razorpay"],
    year: "2024",
    role: "Full-Stack & UI/UX",
    link: "#",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    title: "FleetMaster – Fleet Management SaaS",
    category: "Logistics / Enterprise",
    description:
      "Comprehensive fleet management solution – vehicle tracking, maintenance scheduling, fuel monitoring, driver behavior analytics, compliance reporting.",
    image: "/images/portfolio/fleetmaster.jpg",
    tags: ["React Native", "NestJS", "TimescaleDB", "Mapbox", "Grafana", "MQTT"],
    year: "2025",
    role: "Lead Developer",
    link: "#",
    color: "from-lime-500 to-green-600",
  },
];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-gray-100">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8 text-blue-300 font-medium">
              <Code className="w-5 h-5" /> Selected Works
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-none tracking-tight">
              Real Impact,<br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Real Projects
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100/85 max-w-4xl mx-auto leading-relaxed">
              A curated showcase of digital products we've built that solve real problems, scale to thousands of users, and generate measurable business value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
          >
            {projects.map((project) => (
              <motion.article
                key={project.id}
                variants={item}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/70 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-10`} />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Category badge */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-5 right-5 z-20">
                    <span className="px-4 py-2 bg-white/90 text-slate-800 text-sm font-semibold rounded-full shadow-md">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 md:p-9 flex flex-col flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
                    <div className="text-sm text-slate-500 font-medium">
                      {project.role}
                    </div>

                    {project.link !== "#" ? (
                      <Link
                        href={project.link}
                        target="_blank"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="text-slate-400 text-sm font-medium italic">
                        Case study coming soon
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* More projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-20"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Have a project in mind?
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}