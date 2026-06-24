/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Code, Database, Cloud, Settings, Layers, Sliders } from "lucide-react";
import { motion } from "motion/react";
import { SKILL_CATEGORIES } from "../data";

export default function Skills() {
  // Map icons to categories (all monochrome)
  const getIcon = (categoryTitle: string) => {
    switch (categoryTitle) {
      case "Languages":
        return <Code className="text-black" size={16} />;
      case "Frameworks & Tools":
        return <Layers className="text-black" size={16} />;
      case "Cloud & DevOps":
        return <Cloud className="text-black" size={16} />;
      case "Infrastructure & Reliability":
        return <Settings className="text-black" size={16} />;
      case "Architecture Concepts":
        return <Sliders className="text-black" size={16} />;
      case "Databases":
        return <Database className="text-black" size={16} />;
      default:
        return <Code className="text-black" size={16} />;
    }
  };

  return (
    <section className="py-16 bg-white border-y border-gray-200" id="skills-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-black sm:text-3xl" id="skills-header">
            Core Skills Inventory
          </h2>
          <div className="h-0.5 w-12 bg-black mx-auto my-3" />
          <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, structured view of my technical competencies. Backed by real-world engineering experience and hands-on systems operations.
          </p>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="skills-grid">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              id={`skill-card-${idx}`}
              className="flex flex-col border border-gray-200 bg-[#f9fafb] p-6 hover:border-black transition-colors duration-200"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center bg-white border border-gray-200">
                  {getIcon(cat.title)}
                </div>
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-black">
                  {cat.title}
                </h3>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center bg-white px-2 py-0.5 font-mono text-[10px] uppercase font-semibold text-gray-700 border border-gray-200 hover:border-black hover:text-black transition-colors duration-150 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
