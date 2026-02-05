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
    title: "QuickSearchPlus",
    category: "Productivity / Collaboration Software (SaaS)",
    description:
      `QuickSearchPlus is an AI-powered productivity and knowledge management platform 
      that automates meeting planning, live discussions, and follow-ups while 
      capturing key insights in real time. It also modernizes bookmarking by 
      making it easy to save, organize, and search information from across the 
      web—bringing meeting notes and web resources together in one centralized, searchable workspace.`,
    image: "/images/quicksearch.png",
    tags: ["React Native", "Next.js", "NestJS", "MySQL", "WebSocket", "Stripe"],
    year: "2025",
    link: "https://quicksearchplus.com",
    color: "from-cyan-500 to-blue-600",
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