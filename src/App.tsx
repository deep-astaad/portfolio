/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, ArrowUp, Mail, Code, Terminal, Sparkles, BookOpen } from "lucide-react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { EXPERIENCES, PERSONAL_INFO } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "blog" | "contact">("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load deep links (e.g. ?tab=blog or #blog) for search engine crawler discovery
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const hash = window.location.hash;
      
      if (tabParam === "blog" || hash === "#blog") {
        setActiveTab("blog");
      } else if (tabParam === "contact" || hash === "#contact") {
        setActiveTab("contact");
      }
    } catch (e) {
      console.error("Deep link routing failed:", e);
    }
  }, []);

  // Dynamic SEO optimized title updates
  useEffect(() => {
    try {
      if (activeTab === "home") {
        document.title = `${PERSONAL_INFO.name} | Backend & Cloud Engineer - Portfolio`;
      } else if (activeTab === "blog") {
        document.title = `Technical Writing & Blog | ${PERSONAL_INFO.name}`;
      } else if (activeTab === "contact") {
        document.title = `Get in Touch | ${PERSONAL_INFO.name} - Inquiry Form`;
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeTab]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" id="app-container">
      {/* Dynamic SEO JSON-LD injection for Google Crawler */}
      <script type="application/ld+json" id="seo-ld-json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": PERSONAL_INFO.name,
          "jobTitle": PERSONAL_INFO.title,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": PERSONAL_INFO.location
          },
          "email": PERSONAL_INFO.email,
          "url": window.location.origin,
          "sameAs": [
            PERSONAL_INFO.linkedin,
            PERSONAL_INFO.github
          ]
        })}
      </script>

      {/* Main Header navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary body contents */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              id="home-content-container"
            >
              {/* Hero Section & credentials */}
              <Hero setActiveTab={setActiveTab} />

              {/* Core visual skills bento grid */}
              <Skills />

              {/* Projects showcase with details overlays */}
              <Projects />

              {/* Experience Timeline Section */}
              <section className="py-16 bg-white border-t border-gray-200" id="experience-section">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  {/* Title */}
                  <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
                    <span className="inline-flex items-center border border-black bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-black">
                      <Briefcase size={10} className="text-black" />
                      <span>Career Path</span>
                    </span>
                    <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-black sm:text-3xl" id="experience-header">
                      Professional Experience
                    </h2>
                    <div className="h-0.5 w-12 bg-black mx-auto my-3" />
                    <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
                      Proven track record of designing, operating, and scaling production systems.
                    </p>
                  </div>

                  {/* Timeline structure */}
                  <div className="max-w-4xl mx-auto space-y-8" id="experience-timeline">
                    {EXPERIENCES.map((exp, idx) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        id={`experience-timeline-card-${exp.id}`}
                        className="relative pl-6 sm:pl-8 border-l border-gray-200 pb-2 last:pb-0"
                      >
                        {/* Bullet circle */}
                        <div className="absolute -left-[5px] top-2 flex h-2 w-2 bg-black rounded-none" />

                        {/* Card Detail */}
                        <div className="bg-[#f9fafb] border border-gray-200 p-6 sm:p-8 space-y-4 hover:border-black hover:bg-white transition-colors duration-200">
                          
                          {/* Header row */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-display font-bold text-base text-black">
                                  {exp.company}
                                </h3>
                                {exp.isInternPromoted && (
                                  <span className="inline-flex items-center border border-black bg-black text-white px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest">
                                    Promoted
                                  </span>
                                )}
                              </div>
                              <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {exp.role}
                              </p>
                            </div>
                            <div className="sm:text-right font-mono text-[10px] uppercase font-bold text-gray-400">
                              <p>{exp.duration}</p>
                              <p>{exp.location}</p>
                            </div>
                          </div>

                          {/* Detail bullets */}
                          <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600 leading-relaxed">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>

                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Call to action section for Home */}
              <section className="bg-black text-white py-16 border-t border-black" id="home-cta-section">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wider sm:text-3xl">
                    Interested in discussing technical challenges?
                  </h3>
                  <div className="h-0.5 w-12 bg-white mx-auto" />
                  <p className="font-sans text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                    Whether you need automation, cloud infrastructure design, parallel processing systems, or suggestions on reducing API response times, my inbox is always open.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setActiveTab("contact")}
                      id="home-cta-contact-trigger"
                      className="inline-flex items-center justify-center space-x-2 border border-black bg-white px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white hover:border-white transition-colors duration-150"
                    >
                      <Mail size={14} />
                      <span>Shoot me an Email</span>
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "blog" && (
            <motion.div
              key="blog-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              id="blog-content-container"
            >
              <Blog />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              id="contact-content-container"
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Semantic modern footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            id="scroll-to-top-button"
            className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-150 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
