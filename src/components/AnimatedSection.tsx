"use client";

import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";

type AnimatedSectionProps = MotionProps & HTMLAttributes<HTMLElement>;

export default function AnimatedSection({
  children,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}