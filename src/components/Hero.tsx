/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Award, FileText, ExternalLink, ChevronRight, CheckCircle, Code, Trophy, Eye, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO, CERTIFICATIONS, SKILL_CATEGORIES } from "../data";
import Avatar from "./Avatar";
import resumePdf from "../resume.pdf";

interface HeroProps {
  setActiveTab: (tab: "home" | "blog" | "contact") => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const [showResume, setShowResume] = useState(false);
  const [showPdfDropdown, setShowPdfDropdown] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" id="hero-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Profile Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="pb-2"
            >
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28" />
            </motion.div>

            {/* Status Indicator / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 border border-black bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-black font-bold"
              id="active-badge"
            >
              <span className="flex h-1.5 w-1.5 bg-black animate-pulse" />
              <span>Based in Tokyo, Japan (Open to Global Opportunities)</span>
            </motion.div>

            {/* Display Typography Header */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl"
                id="hero-name"
              >
                Hi, I'm <span className="underline decoration-1 underline-offset-4">{PERSONAL_INFO.name}</span>
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-display text-xl font-medium uppercase tracking-wider text-gray-800 sm:text-2xl"
                id="hero-title"
              >
                {PERSONAL_INFO.title}
              </motion.h2>
            </div>

            {/* Structured Summary */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-sans text-base leading-relaxed text-gray-600 max-w-2xl"
              id="hero-summary"
            >
              {PERSONAL_INFO.summary} Specifically, I design distributed cloud-native scraping architectures, optimize SQL and backend REST APIs (reducing latency by up to 45%), and scale robust task executors.
            </motion.p>

            {/* Social Links & Meta Info */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 py-2"
              id="social-icons-row"
            >
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer"
                id="hero-github-link"
                className="flex items-center space-x-1.5 font-sans text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Github size={16} />
                <span className="font-semibold">GitHub</span>
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer"
                id="hero-linkedin-link"
                className="flex items-center space-x-1.5 font-sans text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Linkedin size={16} />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                id="hero-email-link"
                className="flex items-center space-x-1.5 font-sans text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Mail size={16} />
                <span className="font-semibold">{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-center space-x-1.5 font-sans text-sm text-gray-500">
                <MapPin size={16} className="text-gray-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
              id="hero-cta-buttons"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                id="cta-view-projects"
                className="inline-flex items-center justify-center space-x-2 border border-black bg-black px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black duration-200"
              >
                <span>Explore Projects</span>
                <ChevronRight size={14} />
              </button>
              
              <button
                onClick={() => setShowResume(true)}
                id="cta-view-resume"
                className="inline-flex items-center justify-center space-x-2 border border-black bg-white px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white duration-200"
              >
                <FileText size={14} className="text-gray-500" />
                <span>Interactive CV</span>
              </button>

              <div className="relative inline-block text-left" id="pdf-resume-dropdown-container">
                <button
                  onClick={() => setShowPdfDropdown(!showPdfDropdown)}
                  id="cta-pdf-resume"
                  className="inline-flex items-center justify-center space-x-2 border border-black bg-white px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white group duration-200"
                >
                  <FileText size={14} className="text-gray-500 group-hover:text-white" />
                  <span>PDF Resume</span>
                  <span className="text-[8px] text-gray-500 group-hover:text-white transition-colors">▼</span>
                </button>
                {showPdfDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowPdfDropdown(false)}
                    />
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-black shadow-lg z-20 font-sans">
                      <a
                        href={resumePdf}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setShowPdfDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-3 text-xs text-black hover:bg-gray-100 transition-colors border-b border-gray-100"
                      >
                        <Eye size={14} className="text-gray-500" />
                        <span>View PDF in Browser</span>
                      </a>
                      <a
                        href={resumePdf}
                        download="Aman_Deep_Singh_Resume.pdf"
                        onClick={() => setShowPdfDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-3 text-xs text-black hover:bg-gray-100 transition-colors"
                      >
                        <Download size={14} className="text-gray-500" />
                        <span>Download PDF File</span>
                      </a>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setActiveTab("blog")}
                id="cta-read-blog"
                className="inline-flex items-center justify-center space-x-2 border border-transparent bg-transparent px-4 py-3 font-sans text-xs font-bold uppercase tracking-wider text-black transition-all hover:underline"
              >
                <span>Read Technical Blog</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-black bg-black text-white">3 Articles</span>
              </button>
            </motion.div>

          </div>

          {/* Quick Metrics / Credentials Grid */}
          <div className="mt-12 lg:mt-0 lg:col-span-5" id="hero-metrics-grid">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              
              {/* Certification Cards */}
              <div className="bg-white border border-gray-200 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Award className="text-black" size={16} />
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-black">Certifications & Courses</span>
                  </div>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">Verified</span>
                </div>
                
                <div className="space-y-3">
                  {CERTIFICATIONS.map((cert) => (
                    <a 
                      key={cert.id}
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      id={`cert-link-${cert.id}`}
                      className="group flex items-start justify-between p-2 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                    >
                      <div className="space-y-0.5 pr-2">
                        <h4 className="font-sans text-xs font-bold text-gray-800 group-hover:text-black transition-colors">
                          {cert.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-1.5 text-[9px] font-mono uppercase text-gray-400">
                          <span>{cert.issuer}</span>
                          <span>•</span>
                          <span>{cert.dateRange}</span>
                        </div>
                      </div>
                      <ExternalLink size={12} className="text-gray-400 group-hover:text-black shrink-0 mt-1" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Competitive Programming Badges */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Codeforces Badge */}
                <div className="bg-white border border-gray-200 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <Trophy className="text-black" size={16} />
                    <span className="font-mono text-[8px] text-black font-bold uppercase tracking-widest border border-black bg-white px-1.5 py-0.5">Specialist</span>
                  </div>
                  <div>
                    <p className="font-sans text-2xl font-bold text-black tracking-tight">1455</p>
                    <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Max Rating</p>
                  </div>
                  <p className="font-mono text-[9px] text-gray-400">Global Rank 892</p>
                </div>

                {/* LeetCode Badge */}
                <div className="bg-white border border-gray-200 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <Code className="text-black" size={16} />
                    <span className="font-mono text-[8px] text-white font-bold uppercase tracking-widest bg-black px-1.5 py-0.5">Expert</span>
                  </div>
                  <div>
                    <p className="font-sans text-2xl font-bold text-black tracking-tight">1000+</p>
                    <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Problems Solved</p>
                  </div>
                  <p className="font-mono text-[9px] text-gray-400">Competitive platforms</p>
                </div>

              </div>

              {/* Company MVP Badge */}
              <div className="bg-black text-white p-5 flex items-center justify-between border border-black">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] font-bold tracking-widest text-gray-300 uppercase">SMS DATATECH CORP</span>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider">Company-wide MVP Award</h4>
                  <p className="font-sans text-xs text-gray-300">Awarded Q4 FY2025 for platform optimization impact</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center bg-white/10 text-white shrink-0 ml-4">
                  <Award size={20} className="stroke-[2]" />
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Interactive CV / Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowResume(false)}
            id="resume-modal"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden cursor-default"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 gap-2">
                <div className="flex items-center space-x-2">
                  <FileText className="text-black" size={16} />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-black">Aman_Deep_Singh_Resume.pdf</span>
                  {typeof window !== "undefined" && window.self !== window.top && (
                    <span className="hidden md:inline-flex items-center bg-amber-50 text-amber-800 text-[9px] font-mono px-2 py-0.5 border border-amber-200 uppercase font-bold animate-pulse">
                      💡 Tip: Open in a new tab to Print/Export perfectly
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 justify-end flex-wrap gap-y-1.5">
                  {typeof window !== "undefined" && window.self !== window.top && (
                    <span className="inline-block md:hidden text-[8px] font-mono text-amber-800 text-right mr-1">
                      💡 Open in new tab to print
                    </span>
                  )}
                  <a 
                    href={resumePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 border border-gray-300 bg-white text-[10px] uppercase tracking-wider font-bold text-gray-700 hover:text-black hover:border-black transition-colors duration-150 cursor-pointer"
                  >
                    <Eye size={12} className="text-gray-500" />
                    <span>View Original PDF</span>
                  </a>
                  <a 
                    href={resumePdf}
                    download="Aman_Deep_Singh_Resume.pdf"
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 border border-gray-300 bg-white text-[10px] uppercase tracking-wider font-bold text-gray-700 hover:text-black hover:border-black transition-colors duration-150 cursor-pointer"
                  >
                    <Download size={12} className="text-gray-500" />
                    <span>Download PDF</span>
                  </a>
                  <button 
                    onClick={() => {
                      try {
                        window.print();
                      } catch (e) {
                        console.error("Print failed", e);
                      }
                    }}
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 border border-black bg-white text-[10px] uppercase tracking-wider font-bold text-black hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <span>Print / Export</span>
                  </button>
                  <button 
                    onClick={() => setShowResume(false)}
                    className="px-2.5 py-1.5 border border-transparent text-[10px] uppercase tracking-wider font-bold text-gray-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Resume Document Canvas (Scrollable) */}
              <div id="resume-print-area" className="flex-1 overflow-y-auto p-8 sm:p-12 font-sans bg-white text-gray-900 select-text leading-relaxed">
                
                {/* Header */}
                <div className="text-center space-y-2 border-b border-black pb-6 flex flex-col items-center">
                  <Avatar className="w-16 h-16 border border-black shadow-none mx-auto mb-2" />
                  <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-black uppercase">Aman Deep Singh</h1>
                    <p className="font-medium text-gray-600 text-xs uppercase tracking-wider">Tokyo, Japan  |  +81 70-9100-5492  |  {PERSONAL_INFO.email}</p>
                    <div className="flex justify-center space-x-4 text-[10px] font-bold uppercase tracking-wider text-black mt-2">
                      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                      <span>•</span>
                      <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 space-y-2">
                  <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-1">Professional Summary</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{PERSONAL_INFO.summary}</p>
                </div>

                {/* Experience */}
                <div className="mt-6 space-y-6">
                  <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-1">Professional Experience</h3>
                  
                  {/* Full-Time Role */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start text-xs uppercase tracking-wider">
                      <div>
                        <span className="font-bold text-black">SMS DataTech Corporation</span>
                        <span className="ml-2 px-1.5 py-0.2 bg-black text-white text-[9px] font-bold">Software Engineer (Full-Time)</span>
                      </div>
                      <span className="font-semibold text-gray-600 text-[10px]">Oct 2024 – Present  |  Tokyo, Japan</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1.5 leading-relaxed">
                      <li>Designed and architected a distributed, 24/7 web scraping platform from scratch on AWS ECS/Fargate; translated product requirements into system design covering autoscaling, fault tolerance, and event-driven processing for 1,000+ concurrent extraction requests.</li>
                      <li>Owned the end-to-end backend architecture for “TANOMEE” (internal work-sharing platform used by 700+ employees); designed REST APIs, database schemas, and integration interfaces with multiple internal systems. Reduced API response latency by 45%.</li>
                      <li>Operated production infrastructure (RDS/Aurora, EC2, S3, CloudWatch) with CI/CD pipelines via GitHub Actions; managed deployments, monitored system health, and reduced cloud costs through AWS Savings Plans.</li>
                      <li>Built event-driven data pipelines using Celery Beat, RabbitMQ, and Redis for distributed task execution with robust retry logic and dead-letter handling.</li>
                      <li>Mentored junior interns on system design, cloud infrastructure, and production operations best practices.</li>
                    </ul>
                  </div>

                  {/* Intern Role */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start text-xs uppercase tracking-wider">
                      <div>
                        <span className="font-bold text-black">SMS DataTech Corporation</span>
                        <span className="ml-2 px-1.5 py-0.2 bg-gray-500 text-white text-[9px] font-bold">Software Engineer Intern</span>
                      </div>
                      <span className="font-semibold text-gray-600 text-[10px]">July 2023 – Sept 2024  |  Tokyo, Japan</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1.5 leading-relaxed">
                      <li>Designed a self-healing log aggregation and real-time monitoring system for SMS DataTech's core platforms and 'Pogo', reducing Mean Time to Detection (MTTD) by 70% and Mean Time to Resolution (MTTR) by 50% for 24/7 operations.</li>
                      <li>Built custom telemetry collectors and log streams to proactively identify performance anomalies across distributed environment clusters.</li>
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="mt-6 space-y-2">
                    <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-1">Certifications & Courses</h3>
                    <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1.5">
                      {CERTIFICATIONS.map((cert) => (
                        <li key={cert.id}>
                          <span>{cert.title} ({cert.issuer} • {cert.dateRange}) — </span>
                          <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-black font-semibold underline hover:text-gray-600">Verify Link</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Education */}
                  <div className="mt-6 space-y-2">
                    <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-1">Education</h3>
                    <div className="flex justify-between items-start text-xs text-gray-700">
                      <div>
                        <span className="font-bold text-black">Indian Institute of Information Technology, Nagpur</span>
                        <p className="italic">Bachelor of Technology in Computer Science and Engineering</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-600">2020 – 2024</span>
                        <p className="font-bold uppercase tracking-wider text-black">CGPA: 8.41 / 10.0</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="mt-6 space-y-2">
                    <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-1">Skills Inventory</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-700 leading-relaxed">
                      {SKILL_CATEGORIES.map((cat) => (
                        <div key={cat.title}>
                          <p>
                            <strong className="text-gray-900">{cat.title}:</strong>{" "}
                            {cat.skills.join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-700 leading-relaxed border-t border-gray-100 pt-2">
                      <p><strong className="text-gray-900">Soft Skills:</strong> Engineering Mentorship, Technical Leadership, Systems Thinking, Root-Cause Analysis, Cross-functional Collaboration, High-Pressure Operations</p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-6 space-y-2 pb-6">
                  <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200 pb-1">Key Achievements</h3>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                    <li><strong className="text-gray-900">Company-wide MVP Award (Q4 FY2025):</strong> Awarded for outstanding architectural contributions.</li>
                    <li><strong className="text-gray-900">Competitive Programming Specialist:</strong> Peak rating of 1455 on Codeforces. Ranked Global #892 in Round 856 (Div. 2).</li>
                    <li><strong className="text-gray-900">LeetCode Accomplishment:</strong> Solved 1000+ total algorithmic problems with deep practice in C++ and Python.</li>
                    <li><strong className="text-gray-900">State Merit Rank 10:</strong> Awarded in the Senior Secondary exams by BSER, Rajasthan in 2019 out of hundred-thousands of candidates.</li>
                  </ul>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
