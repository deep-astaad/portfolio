/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Github, Linkedin, Mail, Heart, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface FooterProps {
  setActiveTab: (tab: "home" | "blog" | "contact") => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-12" id="footer-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Copyright / Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center bg-black text-white font-mono text-xs font-bold">
              <Terminal size={12} />
            </div>
            <div className="flex flex-col">
              <p className="font-display text-sm font-bold text-black">
                {PERSONAL_INFO.name}
              </p>
              <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-wider font-bold text-gray-500">
            <button 
              onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              id="footer-nav-home"
              className="hover:text-black transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              id="footer-nav-contact"
              className="hover:text-black transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Social Icons row */}
          <div className="flex items-center space-x-4 text-gray-400">
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noreferrer"
              id="footer-github"
              className="hover:text-black transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noreferrer"
              id="footer-linkedin"
              className="hover:text-black transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              id="footer-email"
              className="hover:text-black transition-colors"
              aria-label="Email Address"
            >
              <Mail size={16} />
            </a>
          </div>

        </div>

        {/* Bottom meta notes */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-8 border-t border-gray-200 text-[10px] uppercase tracking-wider text-gray-400 font-mono font-bold">
          <p>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Designed & Engineered in Tokyo, Japan</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
