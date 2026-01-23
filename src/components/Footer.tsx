"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/lushak", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/lushak", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/lushak", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/lushakdata", label: "Instagram" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/60 text-slate-300">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                <span className="text-blue-400">LUSHAK</span> DATA
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Innovative software solutions & data systems for modern businesses. 
              We turn ideas into powerful digital experiences.
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 bottom-[-4px] h-[2px] bg-blue-500 w-0 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Legal & Support</h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Get in Touch</h3>
            <ul className="space-y-5 text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@lushaksoftwaresystems.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@lushaksoftwaresystems.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>+234 813 014 9426</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-10 border-t border-slate-800/60 text-center md:flex md:items-center md:justify-between text-sm text-slate-500">
          <p>
            © {currentYear} LUSHAK DATA SYSTEMS. All rights reserved.
          </p>
          {/* <p className="mt-3 md:mt-0">
            Built with passion & precision in Nigeria
          </p> */}
        </div>
      </div>
    </footer>
  );
}