/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, X, Send, Terminal, User, Bot, ExternalLink, 
  RefreshCw, FileText, Check, HelpCircle, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "../data";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isQuickAction?: boolean;
}

const QUICK_ACTIONS = [
  { id: "why-hire", label: "🏆 Why hire Aman?", prompt: "Why should a company hire Aman Deep Singh? Highlight his top contributions and certifications." },
  { id: "mock-interview", label: "💬 Mock Interview", prompt: "Conduct a mock technical interview where you are the interviewer asking me backend/cloud engineering questions, or play as Aman being interviewed." },
  { id: "scraping-ai", label: "🕷️ Scraping-AI Project", prompt: "Explain the architecture of Aman's Scraping-AI Pipeline running on AWS ECS/Fargate in detail." },
  { id: "cover-letter", label: "📄 Draft Cover Letter", prompt: "Draft an elegant, professional cover letter from Aman tailored for a Senior Backend or DevOps Engineer role, highlighting his achievements." }
];

// Pre-programmed smart answers for Local/Demo Mode
const getDemoResponse = (userInput: string): string => {
  const query = userInput.toLowerCase();

  if (query.includes("why") && (query.includes("hire") || query.includes("hire aman") || query.includes("special"))) {
    return `### Why Hire Aman Deep Singh?

Aman is a **Backend & Cloud Engineer** with a proven track record of designing, operating, and scaling robust, 24/7 production systems in Tokyo, Japan. Here are the top reasons to hire him:

1. **Proven Production Impact**:
   - At SMS DataTech, he built an enterprise-grade, distributed scraping platform on **AWS ECS/Fargate** capable of executing **1,000+ concurrent requests** and crawling millions of items monthly.
   - He optimized the backend architecture of **'TANOMEE'** (used by 700+ employees), achieving a massive **45% reduction in latency**.

2. **Certified AWS Cloud Expertise**:
   - **AWS Certified Solutions Architect – Associate** (Valid through 2028).
   - **AWS Certified CloudOps Engineer – Associate** (Valid through 2029).
   - Deep expertise in provisioning databases (Aurora, RDS, Redis) and scaling clusters.

3. **Robust System Reliability**:
   - Designed self-healing log aggregation systems that slashed **Mean Time to Detection (MTTD) by 70%** and **Mean Time to Resolution (MTTR) by 50%**.

4. **Modern Tech Stack**:
   - Master of Python, FastAPI, Django, Scrapy, Celery, Redis, RabbitMQ, Docker, and IaC tooling (Terraform/CloudFormation).`;
  }

  if (query.includes("scraping") || query.includes("crawler") || query.includes("proxy")) {
    return `### Aman's Scraping-AI Pipeline

Aman designed and operated an enterprise-grade, distributed extraction platform from scratch. Key features include:

* **High-Performance Cluster**: Built on **AWS ECS/Fargate**, coordinating multi-threaded scrapers.
* **Smart Orchestration**: Used **Celery** with **Redis** as a distributed broker for task dispatching.
* **Anti-Bot Defeat**: Implemented rotating residential proxy pools, cookie-jar synchronization, and human behavior simulator headers.
* **LLM Extraction**: Integrated the **Gemini API** directly inside the pipeline to convert raw, unstructured HTML into structured, validated JSON schemas with a **99.8% success rate**!`;
  }

  if (query.includes("cover") || query.includes("letter") || query.includes("apply")) {
    return `### Custom Draft Cover Letter (Sample)

**Subject: Application for Backend / Cloud Reliability Engineer**

Dear Hiring Team,

I am writing to express my strong interest in joining your engineering team as a Backend and Cloud Engineer. With over two years of experience designing, deploying, and operating highly available distributed platforms at SMS DataTech Corporation in Tokyo, I have developed a strong expertise in building resilient system architectures.

Key highlights of my background include:
* **Scaling Systems**: Architected a 24/7 scraping cluster on **AWS ECS/Fargate** managing 1,000+ concurrent tasks with automated autoscaling.
* **Performance Tuning**: Redesigned API routing and database queries for the 'TANOMEE' internal work platform, **reducing application latency by 45%** for over 700 active users.
* **Automated DevOps & Infrastructure**: Managing live databases (Aurora/RDS) and continuous delivery pipelines via GitHub Actions, combined with holding both **AWS Solutions Architect** and **AWS CloudOps Engineer** Associate certifications.

I would love to bring my experience in high-performance automation, Celery queues, and cloud infrastructure optimization to your team.

Sincerely,  
**Aman Deep Singh**  
*Tokyo, Japan*`;
  }

  if (query.includes("interview") || query.includes("mock") || query.includes("question")) {
    return `### Backend Technical Interview Challenge (Aman AI)

Let's do a quick mock technical challenge! Here is a core system design question that Aman encounters in his daily production work:

**The Scenario:**
*"You need to design a background task pipeline that processes thousands of slow, third-party API reports. The API rate limits us, and sometimes times out. How do you design this queue safely without dropping tasks or locking web servers?"*

**How Aman Solves This:**
1. **Asynchronous Hand-off**: The web server receives the request, writes a pending record to **PostgreSQL**, pushes a job metadata packet to **Redis**, and returns an instant \`202 Accepted\` status back to the client.
2. **Distributed Queue Worker**: A pool of distributed **Celery** workers fetches jobs from Redis.
3. **Fault Tolerance**:
   - Implement **Exponential Backoff Retries** so that transient third-party API timeouts do not fail immediately.
   - Use a **Dead Letter Queue (DLQ)** to isolate permanently failing jobs for administrator review.
   - Apply worker **Prefetch Limits** to avoid overloading the memory of individual instances.

*Would you like to try answering a question, or ask about another aspect of Aman's technical skills?*`;
  }

  // Fallback smart response
  return `### Hello! I am Aman's Portfolio Companion.

I can help answer questions about Aman's background, professional experience, and technical projects. 

Here's what you can ask me:
* **"Why should we hire Aman?"** to hear about his top contributions and AWS certifications.
* **"Tell me about the Scraping-AI project."** to explore his backend scaling experience.
* **"Draft a cover letter"** to see a personalized template.
* **"What is his experience in SMS DataTech?"** to understand his software engineering roles.`;
};

export default function AICompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLiveConnection, setIsLiveConnection] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine backend URL
  const backendUrl = (import.meta.env.VITE_AI_BACKEND_URL as string) || "https://portfolio-ai-backend-peach.vercel.app/api/chat";

  // Check backend health on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const testUrl = backendUrl.endsWith("/api/chat") 
          ? backendUrl.replace("/api/chat", "/api/health")
          : `${backendUrl.replace(/\/$/, "")}/health`;

        // Use standard AbortSignal.timeout for safe, modern browser timeout handling
        const res = await fetch(testUrl, { method: "GET", signal: AbortSignal.timeout(5000) });
        if (res.ok) {
          setIsLiveConnection(true);
        } else {
          console.warn(`Health check returned non-OK status: ${res.status}`);
          setIsLiveConnection(false);
        }
      } catch (err: any) {
        console.warn("No live Vercel AI backend detected, falling back to smart on-page demo mode:", err?.message || err);
        setIsLiveConnection(false);
      }
    };
    checkBackend();
  }, [backendUrl]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: `### Welcome! I am Aman's Interactive Portfolio Co-Pilot.

You can chat with me to learn about Aman's background, system design achievements, AWS credentials, and technical project details. 

${isLiveConnection 
  ? "⚡ **Live Connection Established**: Powered by my serverless Vercel AI assistant." 
  : "🤖 **Local Smart Engine Active**: Ready to answer inquiries directly. Feel free to use the quick commands below!"}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages, isLiveConnection]);

  // Handle auto scrolling
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string, isQuick = false) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isQuickAction: isQuick
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      let botResponseText = "";

      // Attempt transmitting to Serverless Backend first
      try {
        const response = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ message: textToSend })
        });

        if (response.ok) {
          const data = await response.json();
          botResponseText = data.reply || data.message || "I received a blank reply from the AI service.";
        } else {
          throw new Error(`Server returned status: ${response.status}`);
        }
      } catch (backendErr: any) {
        console.error("=== AI COPILOT BACKEND ERROR DIAGNOSTIC ===");
        console.error("Target URL:", backendUrl);
        console.error("Error Message:", backendErr?.message || backendErr);
        console.error("Possible Causes:");
        console.error("1. CORS Mismatch: Check if 'ALLOWED_ORIGIN' in your Vercel Environment Variables matches your current origin exactly (e.g. 'https://deep-astaad.github.io' without trailing slash).");
        console.error("2. Browser Shield / Adblocker: Brave Shields or extensions like uBlock Origin might block '/api/chat' endpoints by default. Try disabling shields for the site.");
        console.error("3. Vercel Cold Start / Timeout: If the serverless function takes >10 seconds to respond, the browser might show a network error.");
        console.error("==========================================");
        botResponseText = getDemoResponse(textToSend);
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("AI execution failure:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const formatMessageMarkdown = (markdown: string) => {
    return markdown.split("\n").map((line, idx) => {
      let trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="font-display text-[13px] font-bold uppercase tracking-wider text-black mt-3 mb-1">
            {trimmed.replace("###", "").trim()}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="font-display text-sm font-bold uppercase tracking-widest text-black mt-4 mb-1.5 border-b border-gray-100 pb-0.5">
            {trimmed.replace("##", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={idx} className="font-display text-base font-bold uppercase tracking-widest text-black mt-4 mb-2">
            {trimmed.replace("#", "").trim()}
          </h2>
        );
      }

      // Bullets
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const content = trimmed.substring(2);
        return (
          <li key={idx} className="list-disc pl-1 ml-4 text-[11px] text-gray-700 leading-relaxed my-0.5">
            {renderBoldText(content)}
          </li>
        );
      }

      // Ordered list
      if (/^\d+\.\s/.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s/, "");
        const match = trimmed.match(/^(\d+)\.\s/);
        const num = match ? match[1] : "1";
        return (
          <div key={idx} className="flex items-start space-x-2 my-1 pl-1 text-[11px] text-gray-700 leading-relaxed">
            <span className="font-mono font-bold text-black text-[10px]">{num}.</span>
            <span className="flex-1">{renderBoldText(content)}</span>
          </div>
        );
      }

      // Empty line
      if (!trimmed) return <div key={idx} className="h-2" />;

      // Normal line
      return (
        <p key={idx} className="text-[11px] text-gray-700 leading-relaxed my-1">
          {renderBoldText(trimmed)}
        </p>
      );
    });
  };

  const renderBoldText = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, i) => {
      const isBold = i % 2 === 1;
      const subParts = part.split("`");
      
      const content = subParts.map((sub, j) => {
        const isInlineCode = j % 2 === 1;
        if (isInlineCode) {
          return (
            <code key={j} className="bg-gray-100 border border-gray-200 text-black px-1 py-0.5 rounded font-mono text-[9px]">
              {sub}
            </code>
          );
        }
        return sub;
      });

      if (isBold) {
        return <strong key={i} className="font-semibold text-black">{content}</strong>;
      }
      return <span key={i}>{content}</span>;
    });
  };

  const [composerText, setComposerText] = useState("");

  return (
    <>
      {/* Floating launcher badge */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-black text-white px-3.5 py-1.5 border border-black font-mono text-[9px] uppercase tracking-widest flex items-center space-x-1.5 shadow-sm select-none"
              id="ai-launcher-tooltip"
            >
              <Sparkles size={10} className="text-white animate-pulse" />
              <span>Ask Aman AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          id="ai-companion-launcher"
          className="flex h-12 w-12 items-center justify-center bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-150 shadow-md cursor-pointer relative"
          aria-label="Toggle AI Companion"
        >
          {isOpen ? <X size={18} /> : <Sparkles size={18} className="animate-pulse" />}
          {isLiveConnection && !isOpen && (
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-green-500 border border-white" />
          )}
        </button>
      </div>

      {/* Slide-out Sidebar Chat Canvas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-22 right-6 z-50 w-[360px] sm:w-[400px] h-[520px] bg-white border border-black flex flex-col shadow-2xl"
            id="ai-companion-panel"
          >
            {/* Header Motif */}
            <div className="bg-black text-white p-3.5 flex items-center justify-between border-b border-black">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-white animate-pulse" />
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider leading-none">Aman Co-Pilot</h3>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-gray-400">
                    {isLiveConnection ? "⚡ Live Serverless AI" : "🤖 Smart Local Engine"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Main Interactive Workspace Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 relative">
              {/* Chat Message Lists */}
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] border p-3 ${
                        msg.sender === "user"
                          ? "bg-black border-black text-white"
                          : "bg-white border-gray-200 text-gray-800"
                      }`}
                    >
                      {/* Sender header details */}
                      <div className="flex items-center space-x-1.5 border-b pb-1 mb-1.5 border-current opacity-60">
                        {msg.sender === "user" ? (
                          <>
                            <User size={10} />
                            <span className="font-mono text-[8px] uppercase tracking-wider">Inquirer</span>
                          </>
                        ) : (
                          <>
                            <Bot size={10} />
                            <span className="font-mono text-[8px] uppercase tracking-wider">Aman AI</span>
                          </>
                        )}
                        <span className="flex-1" />
                        <span className="font-mono text-[7px]">{msg.timestamp}</span>
                      </div>

                      {/* Text content parsed markdown */}
                      <div className="space-y-1.5 break-words">
                        {msg.sender === "user" ? (
                          <p className="text-[11px] leading-relaxed font-sans">{msg.text}</p>
                        ) : (
                          formatMessageMarkdown(msg.text)
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Simulated/Real API Typing loader state */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 max-w-[80%]">
                      <div className="flex items-center space-x-1.5 border-b pb-1 mb-1.5 border-gray-100">
                        <Bot size={10} className="text-gray-400" />
                        <span className="font-mono text-[8px] uppercase tracking-wider text-gray-400">Thinking</span>
                      </div>
                      <div className="flex items-center space-x-1 py-1 px-2">
                        <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="h-1.5 w-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick action triggers footer */}
            <div className="border-t border-gray-100 bg-white p-2">
              <span className="block font-mono text-[7px] uppercase tracking-widest text-gray-400 mb-1 pl-1">
                Suggested Commands
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto pr-1">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleSendMessage(action.prompt, true)}
                    className="border border-gray-200 bg-gray-50 hover:bg-black hover:text-white hover:border-black text-[9px] font-sans px-2 py-1 transition-colors cursor-pointer text-gray-600 truncate max-w-[170px]"
                    title={action.prompt}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message composer input section */}
            <div className="border-t border-black p-2.5 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (composerText.trim()) {
                    handleSendMessage(composerText);
                    setComposerText("");
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a technical question..."
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  className="flex-1 border border-gray-300 px-3 py-1.5 text-xs font-sans focus:border-black focus:outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={!composerText.trim()}
                  className="flex h-8 w-8 items-center justify-center bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-150 disabled:opacity-30 disabled:hover:bg-black disabled:hover:text-white cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

