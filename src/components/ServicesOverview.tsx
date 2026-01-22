"use client"; 

import { motion } from "framer-motion";
import { Code, Smartphone, Globe, CreditCard, Truck, Building } from "lucide-react";

const services = [
  {
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    image: "/images/webdev.png",
    title: "Website Development",
    desc: "Custom, responsive websites for e-commerce, corporate, and more. Using Next.js, Tailwind, and modern stacks for performance and SEO.",
  },
  {
    icon: <CreditCard className="w-12 h-12 text-blue-500" />,
    image: "/images/fintech2.png",
    title: "Fintech & Banking Solutions",
    desc: "Secure web and app platforms for financial services, including transaction processing, compliance, and user authentication.",
  },
  {
    icon: <Truck className="w-12 h-12 text-blue-500" />,
    image: "/images/logistics2.png", 
    title: "Logistics Software",
    desc: "Integrated systems for supply chain management, tracking, and optimization – web dashboards and mobile apps.",
  },
  {
    icon: <Building className="w-12 h-12 text-blue-500" />,
    image: "/images/realestate2.png",
    title: "Real Estate Platforms",
    desc: "Feature-rich web apps for property listings, CRM, and virtual tours, with mobile extensions for on-the-go access.",
  },
  {
    icon: <Smartphone className="w-12 h-12 text-blue-500" />,
    image: "/images/crossplatform2.png",
    title: "Cross-Platform App Development",
    desc: "Build once, deploy everywhere with React Native or Flutter. Ideal for iOS/Android apps in any industry.",
  },
  {
    icon: <Code className="w-12 h-12 text-blue-500" />,
    image: "/images/generaltech.png",
    title: "Custom Data Systems",
    desc: "Tailored databases, APIs, and analytics tools to power your business intelligence and operations.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Comprehensive Services
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-2xl font-semibold ml-4">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}