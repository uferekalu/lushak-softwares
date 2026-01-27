"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Globe, Rocket, ShieldCheck, Users, Zap } from "lucide-react";

const values = [
    {
        icon: <Rocket className="w-10 h-10 text-blue-500" />,
        title: "Innovation First",
        desc: "We embrace cutting-edge technologies to build future-ready solutions.",
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
        title: "Security & Reliability",
        desc: "Every project is built with best security practices and rock-solid performance.",
    },
    {
        icon: <Users className="w-10 h-10 text-blue-500" />,
        title: "Client-Centric Approach",
        desc: "Your vision drives our work – transparent communication, timely delivery.",
    },
    {
        icon: <Zap className="w-10 h-10 text-blue-500" />,
        title: "Fast & Scalable",
        desc: "Solutions that grow with your business – from MVP to enterprise scale.",
    },
];

const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "12+", label: "Industries Served" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "3+", label: "Years of Excellence" },
];

export default function About() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/tech-pattern.jpg')] bg-repeat" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                            Building the Future,<br />
                            <span className="text-blue-400">One Line of Code at a Time</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-3xl mx-auto">
                            LUSHAK DATA SYSTEMS is a registered Nigerian software development firm dedicated to creating elegant, powerful, and scalable digital solutions for businesses across industries.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                href="/contact"
                                className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                            >
                                Start Your Project
                            </Link>
                            <Link
                                href="/services"
                                className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.7 }}
                            >
                                <div className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-3">
                                    {stat.number}
                                </div>
                                <p className="text-slate-600 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800"
                        >
                            Who We Are
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.9 }}
                            className="text-lg md:text-xl leading-relaxed text-slate-700 text-center mb-16 max-w-4xl mx-auto"
                        >
                            LUSHAK DATA SYSTEMS is a passionate team of software engineers, designers, and problem-solvers based in Nigeria. Founded with a mission to bridge the gap between great ideas and powerful digital realities, we specialize in custom website development, cross-platform mobile applications, and tailored data systems that help businesses thrive in the digital age.
                        </motion.p>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src="/images/team-coding.jpg" // replace with real team or office photo
                                    alt="LUSHAK Data Systems Team"
                                    className="rounded-2xl shadow-2xl w-full object-cover"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <h3 className="text-3xl font-bold text-slate-800">Our Mission</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    To deliver high-quality, innovative, and affordable software solutions that empower businesses to succeed in a fast-changing digital world.
                                </p>

                                <h3 className="text-3xl font-bold text-slate-800 mt-10">Our Vision</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    To become the most trusted software development partner in Africa and beyond, known for excellence, integrity, and measurable business impact.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-800"
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.7 }}
                                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100/50 text-center"
                            >
                                <div className="mb-6">{value.icon}</div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-800">{value.title}</h3>
                                <p className="text-slate-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-8"
                    >
                        Ready to Build Something Great?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90"
                    >
                        Let's turn your vision into reality with powerful, elegant software solutions.
                    </motion.p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-blue-700 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                    >
                        Get in Touch Today
                    </Link>
                </div>
            </section>
        </main>
    );
}