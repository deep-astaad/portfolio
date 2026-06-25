/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, FileText, Mail, Home, BookOpen, Share2, Code, Briefcase, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "../data";
import Avatar from "./Avatar";

interface HeaderProps {
  activeTab: "home" | "blog" | "contact";
  setActiveTab: (tab: "home" | "blog" | "contact") => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navItems = [
    { id: "home", label: "Home", type: "tab", icon: Home },
    { id: "skills", label: "Skills", type: "scroll", targetId: "skills-section", icon: Code },
    { id: "projects", label: "Projects", type: "scroll", targetId: "projects-section", icon: Briefcase },
    { id: "experience", label: "Experience", type: "scroll", targetId: "experience-section", icon: Award },
    { id: "blog", label: "Tech Blog", type: "tab", icon: BookOpen },
    { id: "contact", label: "Contact", type: "tab", icon: Mail },
  ];

  // Section observer to track the active section within the Home tab
  useEffect(() => {
    if (activeTab !== "home") return;

    const sections = ["hero-section", "skills-section", "projects-section", "experience-section"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (id === "hero-section") {
              setActiveSection("home");
            } else if (id === "skills-section") {
              setActiveSection("skills");
            } else if (id === "projects-section") {
              setActiveSection("projects");
            } else if (id === "experience-section") {
              setActiveSection("experience");
            }
          }
        },
        { threshold: 0.15, rootMargin: "-80px 0px -50% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [activeTab]);

  const handleNavClick = (target: string | { id: string; label: string; type: string; targetId?: string }) => {
    if (typeof target === "string") {
      setActiveTab(target as "home" | "blog" | "contact");
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target.type === "scroll" && target.targetId) {
      if (activeTab !== "home") {
        setActiveTab("home");
        // Wait for Home tab to render
        setTimeout(() => {
          const el = document.getElementById(target.targetId!);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      } else {
        const el = document.getElementById(target.targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setIsOpen(false);
    } else {
      setActiveTab(target.id as "home" | "blog" | "contact");
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          className="flex cursor-pointer items-center space-x-2 group"
          onClick={() => handleNavClick("home")}
          id="logo-container"
        >
          <Avatar className="w-10 h-10 border border-black shadow-none hover:scale-105 p-0.5" />
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-black transition-colors duration-200">
              {PERSONAL_INFO.name}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
              {PERSONAL_INFO.title}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.type === "scroll"
              ? (activeTab === "home" && activeSection === item.id)
              : (activeTab === item.id);
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item)}
                className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  isActive 
                    ? "text-black" 
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <Icon size={14} className={isActive ? "text-black" : "text-gray-400"} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 bg-gray-100 border border-gray-200/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          <div className="h-4 w-[1px] bg-gray-200 mx-3" />

          {/* Quick Info / CTA */}
          <button
            onClick={() => handleNavClick("contact")}
            id="nav-cta"
            className="flex items-center space-x-1.5 border border-black bg-white px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-black transition-all duration-200 hover:bg-black hover:text-white"
          >
            <span>Let's Talk</span>
            <Mail size={11} />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden" id="mobile-menu-trigger">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 text-black hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-gray-200 bg-white"
            id="mobile-drawer"
          >
            <div className="space-y-1 px-4 pt-2 pb-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.type === "scroll"
                  ? (activeTab === "home" && activeSection === item.id)
                  : (activeTab === item.id);
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item)}
                    className={`flex w-full items-center space-x-3 px-4 py-3 font-sans text-sm uppercase tracking-wider font-semibold transition-colors duration-200 ${
                      isActive
                        ? "bg-gray-100 text-black border-l-2 border-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-black" : "text-gray-400"} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className="pt-3 border-t border-gray-200 mt-2">
                <button
                  onClick={() => handleNavClick("contact")}
                  className="flex w-full items-center justify-center space-x-2 border border-black py-2.5 font-sans text-sm font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white"
                >
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
