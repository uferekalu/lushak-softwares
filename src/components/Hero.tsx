"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/parallax";

const slides = [
  {
    image: "/images/innovativeweb.jpg",
    title: "Innovative Web & App Solutions for Your Business",
    desc: "At LUSHAK DATA SYSTEMS, we craft custom websites and cross-platform apps that drive growth. From scalable e-commerce platforms to secure banking systems.",
  },
  {
    image: "/images/ecommerce.png",
    title: "E-Commerce Web Development",
    desc: "Build powerful online stores with seamless user experiences, integrated payments, and inventory management for retail success.",
  },
  {
    image: "/images/fintech.jpeg",
    title: "Fintech & Banking Applications",
    desc: "Secure, compliant apps for financial services – mobile banking, transactions, and data analytics tailored to your needs.",
  },
  {
    image: "/images/logistics.png",
    title: "Logistics & Supply Chain Software",
    desc: "Optimize operations with real-time tracking, inventory, and automation tools for efficient logistics management.",
  },
  {
    image: "/images/realestate.jpg",
    title: "Real Estate Web & App Platforms",
    desc: "Interactive property listings, virtual tours, and management systems to elevate your real estate business.",
  },
  {
    image: "/images/crossplatform.jpg",
    title: "Cross-Platform Mobile App Development",
    desc: "Build apps for iOS and Android with React Native or Flutter – fast, responsive, and cost-effective.",
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <style jsx global>{`
        :root {
          --swiper-navigation-size: 32px;           /* Smaller arrows */
          --swiper-navigation-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
        }

        .swiper-button-next,
        .swiper-button-prev {
          transition: all 0.3s ease;
        }

        /* Even smaller on mobile */
        @media (max-width: 768px) {
          :root {
            --swiper-navigation-size: 17px;
          }
          .swiper-button-next,
          .swiper-button-prev {
            opacity: 0.8;
          }
        }

        /* Hide arrows when too small screen if needed, but kept visible */
        @media (max-width: 480px) {
          .swiper-button-next,
          .swiper-button-prev {
            --swiper-navigation-size: 17px;
          }
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Parallax, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        parallax={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="-15%"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

            <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-8 md:px-12 lg:px-16">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-5 md:mb-6 leading-tight drop-shadow-xl"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl lg:max-w-3xl mb-8 md:mb-12 drop-shadow-lg"
              >
                {slide.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 }}
              >
                <Link
                  href="/contact"
                  className="inline-block bg-slate-950 hover:bg-slate-900 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-105 shadow-xl ring-1 ring-slate-700/70 border border-slate-700"
                >
                  Get Started Today
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}