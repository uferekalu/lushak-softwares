"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const lineVariants = {
        closed: { rotate: 0, y: 0, opacity: 1 },
        open: (i: number) => ({
            rotate: i === 1 ? 45 : -45,
            y: i === 1 ? 6 : -6,
            opacity: i === 2 ? 0 : 1,
            transition: { duration: 0.35 },
        }),
    };

    const menuVariants = {
        closed: { x: "100%", opacity: 0 },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 40,
                when: "beforeChildren",
                staggerChildren: 0.07,
            } as const,
        },
    } as const;

    const itemVariants = {
        closed: { x: 20, opacity: 0 },
        open: { x: 0, opacity: 1 },
    } as const;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-slate-950/95 border-b border-slate-800/60 shadow-xl"
            >
                <div className="container mx-auto px-6 py-5 md:py-6 flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white"
                    >
                        <span className="text-blue-400">LUSHAK</span> DATA
                    </Link>

                    <div className="hidden lg:flex items-center space-x-10 xl:space-x-12">
                        {navLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                (link.href !== "/" && pathname.startsWith(link.href));

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`
                    group relative text-lg font-semibold transition-colors duration-300
                    ${isActive ? "text-white" : "text-slate-300 hover:text-white"}
                  `}
                                >
                                    {link.name}
                                    <span
                                        className={`
                      absolute left-0 bottom-[-8px] h-[3px] bg-blue-500 rounded-full
                      transition-all duration-400 ease-out
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            animate={isOpen ? "open" : "closed"}
                            className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={lineVariants}
                                    className="w-7 h-0.5 bg-white rounded-full origin-center"
                                />
                            ))}
                        </motion.div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - unchanged since you like it */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-sm pt-20"
                    >
                        <div className="container mx-auto px-6">
                            <div className="flex flex-col space-y-8 text-2xl font-medium">
                                {navLinks.map((link) => {
                                    const isActive =
                                        pathname === link.href ||
                                        (link.href !== "/" && pathname.startsWith(link.href));

                                    return (
                                        <motion.div key={link.name} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                className={`
                          block py-3 transition-all duration-300
                          ${isActive ? "text-blue-400 font-semibold" : "text-slate-200 hover:text-blue-400"}
                        `}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <motion.div variants={itemVariants} className="mt-12">
                                <p className="text-slate-400 text-sm mb-2">Reach out directly</p>
                                <a
                                    href="mailto:info@lushaksoftwaresystems.com"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                >
                                    info@lushaksoftwaresystems.com
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}