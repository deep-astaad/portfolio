/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Github, ExternalLink, Sparkles, Folder, ArrowUpRight, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-16 bg-white" id="projects-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-black sm:text-3xl" id="projects-header">
              Featured Engineering Work
            </h2>
            <div className="h-0.5 w-12 bg-black my-2" />
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              A curated selection of core platforms, background pipelines, and architectures I've designed and scaled.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center border border-black bg-white px-3 py-1 font-mono text-[10px] uppercase font-bold text-black">
              Total Work: {PROJECTS.length} Projects
            </span>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" id="projects-grid">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedProject(proj)}
              id={`project-card-${proj.id}`}
              className="group relative flex flex-col justify-between border border-gray-200 bg-[#f9fafb] p-6 hover:border-black hover:bg-white cursor-pointer transition-colors duration-200"
            >
              <div className="space-y-4">
                
                {/* Category & Icon */}
                <div className="flex items-center justify-between">
                  <div className="text-black">
                    <Folder size={18} />
                  </div>
                  <span className="inline-flex items-center border border-black bg-white px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-black">
                    {proj.category}
                  </span>
                </div>

                {/* Title & Role */}
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-black group-hover:underline flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight size={16} className="text-gray-400 group-hover:text-black transition-colors shrink-0 ml-1" />
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">{proj.role}</p>
                </div>

                {/* Short Description */}
                <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {/* Quick Highlight Metrics */}
                <div className="flex flex-wrap gap-1.5 py-1">
                  {proj.metrics.slice(0, 2).map((m) => (
                    <span 
                      key={m} 
                      className="inline-flex items-center space-x-1 border border-gray-200 bg-white px-2 py-0.5 font-mono text-[9px] uppercase font-bold text-gray-700"
                    >
                      <Sparkles size={8} className="text-black" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>

              </div>

              {/* Tags footer */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-gray-200">
                {proj.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-mono text-[9px] uppercase text-gray-400 font-semibold">
                    #{tag}
                  </span>
                ))}
                {proj.tags.length > 3 && (
                  <span className="font-mono text-[9px] uppercase text-black font-bold">
                    +{proj.tags.length - 3} more
                  </span>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            id="project-detail-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white border border-black p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1 border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {/* Modal Content */}
              <div className="space-y-6 overflow-y-auto pr-1 flex-1">
                
                {/* Header Section */}
                <div className="space-y-2 pr-6">
                  <span className="inline-flex items-center border border-black bg-white px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-black">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-black">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                    <span>Role: {selectedProject.role}</span>
                    <span>•</span>
                    <span>{selectedProject.date}</span>
                  </div>
                </div>

                {/* Metrics Callout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f9fafb] p-4 border border-gray-200">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center bg-black text-white">
                        <Check size={10} className="stroke-[3]" />
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold text-gray-700">{m}</span>
                    </div>
                  ))}
                </div>

                {/* Extended Details / Bullet points */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-black">Project Highlights & Impact</h4>
                  <ul className="space-y-2.5">
                    {selectedProject.highlights.map((bullet, i) => (
                      <li key={i} className="flex items-start text-xs text-gray-600 leading-relaxed">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center bg-black text-white font-mono text-[9px] font-bold mt-0.5 mr-2.5">
                          {i + 1}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Grid */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-black">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center bg-[#f9fafb] px-2 py-0.5 font-mono text-[10px] uppercase font-semibold text-gray-700 border border-gray-200 hover:border-black hover:text-black transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        id="modal-source-link"
                        className="inline-flex items-center space-x-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-gray-700 hover:text-black transition-colors"
                      >
                        <Github size={14} />
                        <span className="underline">Source Code</span>
                      </a>
                    )}

                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        id="modal-live-link"
                        className="inline-flex items-center space-x-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span className="underline">Live Link</span>
                      </a>
                    )}

                    {!selectedProject.github && !selectedProject.liveUrl && (
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider italic">Proprietary</span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="border border-black bg-black px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-black transition-colors duration-150 cursor-pointer"
                  >
                    Close Details
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
