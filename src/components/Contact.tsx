/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Mail, Send, CheckCircle, Clock, Trash2, User, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ContactMessage } from "../types";
import { PERSONAL_INFO } from "../data";

export default function Contact() {
  // Contact Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastMailtoUrl, setLastMailtoUrl] = useState("");

  // Local persistent messages storage (Developer Inbox)
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aman_portfolio_messages");
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local inbox messages:", e);
    }
  }, []);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!subject.trim()) {
      setErrorMsg("Please provide a subject.");
      return;
    }
    if (!message.trim() || message.length < 10) {
      setErrorMsg("Message must be at least 10 characters long.");
      return;
    }

    // Trigger loading spinner
    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString("en-US", { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        isRead: false
      };

      try {
        const updatedMessages = [newMessage, ...messages];
        setMessages(updatedMessages);
        localStorage.setItem("aman_portfolio_messages", JSON.stringify(updatedMessages));
      } catch (e) {
        console.error("Failed to save contact message:", e);
      }

      // Generate mailto link
      const recipient = PERSONAL_INFO.email;
      const emailSubject = `Inquiry from ${name.trim()}: ${subject.trim()}`;
      const emailBody = `Hello Aman,\n\nYou have received a new inquiry from your portfolio website.\n\nSender Name: ${name.trim()}\nSender Email: ${email.trim()}\n\nMessage:\n${message.trim()}\n\nBest regards,\n${name.trim()}`;
      
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      setLastMailtoUrl(mailtoUrl);

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Attempt automatic redirect to system email client
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.warn("Auto redirect to mailto blocked or failed", err);
      }

      // Clear fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1200); // Realistic network/API round-trip delay
  };

  const handleDeleteMessage = (msgId: string) => {
    const updated = messages.filter(m => m.id !== msgId);
    setMessages(updated);
    localStorage.setItem("aman_portfolio_messages", JSON.stringify(updated));
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="contact-root">
      
      {/* Container Layout */}
      <div className="grid gap-12 lg:grid-cols-12 max-w-5xl mx-auto">
        
        {/* Left column: Quick details */}
        <div className="lg:col-span-5 space-y-6" id="contact-info-panel">
          <div className="space-y-3">
            <span className="inline-flex items-center space-x-1.5 border border-black bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-black">
              <Mail size={10} className="text-black" />
              <span>Get in Touch</span>
            </span>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-black sm:text-3xl" id="contact-info-header">
              Let's build something scalable
            </h2>
            <div className="h-0.5 w-12 bg-black my-2" />
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              Have an open platform position, a robust backend challenge, or an infrastructure pipeline that needs optimization? Get in touch, and let's coordinate!
            </p>
          </div>

          <div className="space-y-4">
            {/* Cards for Info */}
            <div className="bg-[#f9fafb] border border-gray-200 p-4 flex items-center space-x-3 hover:border-black transition-colors duration-150">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white border border-gray-200 text-black">
                <Mail size={14} />
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-gray-400 font-bold">Direct Email</p>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="font-sans text-xs font-bold text-black hover:underline transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <div className="bg-[#f9fafb] border border-gray-200 p-4 flex items-center space-x-3 hover:border-black transition-colors duration-150">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white border border-gray-200 text-black">
                <ShieldCheck size={14} />
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-gray-400 font-bold">Response Time</p>
                <p className="font-sans text-xs font-bold text-black uppercase tracking-wider">
                  Within 24 Hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div className="lg:col-span-7" id="contact-form-panel">
          <AnimatePresence mode="wait">
            
            {isSuccess ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-black p-8 text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]"
                id="contact-success-card"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                  <CheckCircle size={24} className="stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-black">Inquiry Logged & Mail Drafted</h3>
                  <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Thank you! We've captured your submission securely in the local log below, and triggered a draft composer with your native email client to send to <strong>{PERSONAL_INFO.email}</strong>.
                  </p>
                  <p className="font-sans text-[10px] text-gray-400 max-w-xs mx-auto leading-normal">
                    If your email client didn't open automatically, please click the button below to complete transmission:
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <a
                    href={lastMailtoUrl}
                    className="inline-flex items-center justify-center space-x-2 border border-black bg-black px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-black transition-colors duration-150 cursor-pointer"
                  >
                    <Mail size={12} />
                    <span>Send via Direct Email</span>
                  </a>
                  <button
                    onClick={handleResetSuccess}
                    id="success-send-another"
                    className="border border-gray-300 bg-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-black hover:border-black transition-colors duration-150 cursor-pointer"
                  >
                    Send Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 p-6 sm:p-8 space-y-5"
                id="contact-form"
              >
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-black">Send an inquiry</h3>

                {errorMsg && (
                  <p className="text-xs text-black font-bold uppercase border border-black bg-white p-2.5" id="form-error-text">
                    {errorMsg}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-sans text-black focus:border-black focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="e.g. jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-sans text-black focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="e.g. Scalable Scraping Platform Opportunity"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block w-full border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-sans text-black focus:border-black focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message Details</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Provide specific details about your project or scope of work..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-sans text-black focus:border-black focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="form-submit-button"
                  className="w-full flex items-center justify-center space-x-2 border border-black bg-black py-3 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-black transition-colors duration-150 disabled:bg-gray-400 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3 w-3 animate-spin border-2 border-white border-t-transparent" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* DEVELOPER INBOX VIEW (Demonstrating complete client-side data persistence) */}
      <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-gray-200" id="dev-portal-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-1.5 w-1.5 bg-black animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Local persistence logger</span>
          </div>
          
          <button
            onClick={() => setShowInbox(!showInbox)}
            id="toggle-inbox"
            className="inline-flex items-center space-x-1.5 border border-gray-200 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-black hover:border-black transition-colors"
          >
            {showInbox ? (
              <>
                <EyeOff size={12} />
                <span>Hide Submissions ({messages.length})</span>
              </>
            ) : (
              <>
                <Eye size={12} />
                <span>Inspect Local Inbox ({messages.length})</span>
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showInbox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-4 overflow-hidden"
              id="dev-inbox-list"
            >
              {messages.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-gray-200 bg-[#f9fafb]">
                  <p className="text-xs text-gray-400 italic">No submissions captured yet. Try submitting the contact form above to see real-time persistence!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white border border-gray-200 p-4 flex flex-col justify-between md:flex-row gap-4 hover:border-black transition-colors duration-150">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-sans text-xs font-bold text-black">{msg.name}</span>
                        <span className="font-mono text-[10px] text-gray-400">({msg.email})</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="font-mono text-[10px] text-gray-400 flex items-center space-x-1">
                          <Clock size={10} />
                          <span>{msg.date}</span>
                        </span>
                      </div>
                      <p className="font-sans text-xs font-semibold text-gray-700">Subject: {msg.subject}</p>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed bg-[#f9fafb] p-2.5 border border-gray-200">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex md:items-start shrink-0">
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        id={`delete-msg-${msg.id}`}
                        className="p-1.5 text-gray-400 hover:text-black border border-transparent hover:border-gray-200 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
