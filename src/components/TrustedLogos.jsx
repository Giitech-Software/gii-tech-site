// src/components/TrustedLogos.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function TrustedLogos() {
  const logos = ['/logo1.png', '/logo2.png', '/logo3.png', '/logo4.png'];

  return (
    <motion.section
      className="bg-white py-12 px-4 sm:px-10 text-center mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-primary mb-6">
        Trusted by Innovative Institutions
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Client logo ${i + 1}`}
            className="h-12 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </motion.section>
  );
}
