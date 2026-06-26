/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, X, Send, Terminal, User, Bot, ExternalLink, 
  RefreshCw, FileText, Check, HelpCircle, AlertCircle, Trash2
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
  { id: "cover-letter", label: "📄 Draft Cover Letter", prompt: "Draft an elegant, professional cover letter from Aman. (Tip: You can also paste your actual Job Description into the chat to get a highly-tailored custom cover letter & match evaluation!)" },
  { id: "work-projects", label: "💼 Work & Projects", prompt: "What is Aman doing currently, and what are his major backend/cloud engineering projects?" },
  { id: "skills-stack", label: "⚡ Skills & Tech Stack", prompt: "What are Aman's core technical skills, databases, cloud expertise, and architectural concepts?" },
  { id: "education-certs", label: "🎓 Education & Certifications", prompt: "Tell me about Aman's education background, academic focus, and AWS certifications." }
];

// Pre-programmed smart answers for Local/Demo Mode
const getDemoResponse = (userInput: string): string => {
  const query = userInput.toLowerCase();

  // Detect job description submissions or explicit requests for alignment/matching
  if (
    query.includes("job description") || 
    query.includes("jd") || 
    query.includes("responsibilities") || 
    query.includes("requirements") || 
    query.includes("looking for") || 
    query.includes("preferred qualifications") ||
    (query.length > 200 && (query.includes("engineer") || query.includes("developer") || query.includes("cloud") || query.includes("backend")))
  ) {
    return `### ⚡ Custom Profile Alignment & Job Match Analysis

Thank you for providing the job description! Based on the specifications you provided, here is an analysis of how **Aman Deep Singh's** engineering profile matches your role:

#### 📊 Core Alignment & Match Analysis:
* **Backend Systems & REST APIs (100% Match)**: Your requirement for scalable API endpoints fits perfectly with Aman's track record of optimizing **TANOMEE** (reducing latency by **45%** for **700+ daily active users**) and designing robust services in **Python & FastAPI**.
* **Cloud & DevOps Infrastructure (100% Match)**: Your focus on modern, resilient cloud deployments aligns with Aman's active certifications (**AWS Solutions Architect** and **AWS CloudOps Engineer**) and hands-on experience containerizing services on **AWS ECS/Fargate**.
* **Distributed Task & Queue Architectures (100% Match)**: Aman's deep expertise in asynchronous execution patterns (**Celery, Redis, RabbitMQ**) with dead letter handling guarantees high performance under heavy transaction rates.

---

#### 📄 Tailored Cover Letter Draft:

**Subject: Application for Backend / Cloud Reliability Engineering Role - Aman Deep Singh**

Dear Hiring Team,

I am writing to express my strong interest in joining your engineering organization. Having reviewed your job requirements, I am confident that my background building high-throughput, fault-tolerant backend applications and scaling cloud infrastructure on AWS aligns perfectly with your goals.

At **SMS DataTech Corporation** in Tokyo, Japan, I have engineered and maintained high-scale production systems with high availability:
* **High-Throughput Scrapers**: Designed and operated a distributed web crawling platform on AWS ECS/Fargate managing **1,000+ concurrent requests** and processing **3M+ records** monthly.
* **API Latency Slashed**: Redesigned endpoints and optimized PostgreSQL / RDS queries to reduce application latency by **45%** on our core TANOMEE platform.
* **Observability Engineering**: Built self-healing telemetry pipelines and dashboards that reduced Mean Time to Detection (MTTD) by **70%** and Mean Time to Resolution (MTTR) by **50%**.

Holding active **AWS Certified Solutions Architect** and **AWS Certified CloudOps Engineer** credentials, I possess expert-level mastery over Python, Docker, Celery, and SQL databases, while actively expanding my toolkit into high-performance backend development in **Golang**.

I would welcome the opportunity to discuss how my hands-on production engineering experience can support your team.

Sincerely,  
**Aman Deep Singh**  
[Aman's LinkedIn Profile](https://linkedin.com/in/deepamansinghads) | [AWS Solutions Architect Verification](https://www.credly.com/badges/3600e50d-6d46-48f3-a572-1589c71d1856/public_url)

---

**💡 Suggested Follow-up:** *"Can we run a mock technical interview matching this role?"*`;
  }

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
   - Master of Python, FastAPI, Django, Scrapy, Celery, Redis, RabbitMQ, Docker, and IaC tooling (Terraform/CloudFormation).

---

**📝 Want to see if Aman is a match?**
Simply **copy and paste your Job Description** into the chat box! I will analyze the requirements and explain exactly how Aman's skills and backend/cloud engineering experience align with your role.

**💡 Suggested Follow-up:** *"How does Aman's profile align with this job description: [Paste job description here]?"*`;
  }

  if (query.includes("current") || query.includes("role") || query.includes("work") || query.includes("project") || query.includes("sms") || query.includes("datatech") || query.includes("organization")) {
    return `### Aman's Professional Experience & Key Projects

Aman is currently working as a **Software Engineer** at **SMS DataTech Corporation** in Tokyo, Japan (since October 2024, following a successful 1.5-year internship there). He specializes in high-scale backend engines, cloud reliability, and distributed systems.

#### 💼 Work & High-Impact Achievements at SMS DataTech
* **TANOMEE Platform Optimization**: Led backend development of the company's internal work-learning platform used by **700+ daily active employees**. He redesigned REST APIs and optimized database queries, reducing latency by **45%**.
* **Cloud Infrastructure Management**: Provisions and manages production databases (**PostgreSQL, RDS/Aurora, Redis, S3**) using Infrastructure-as-Code (IaC) workflows on AWS.
* **Reliability Engineering**: Implemented real-time log streaming and custom telemetry dashboards, reducing Mean Time to Detection (MTTD) by **70%** and Mean Time to Resolution (MTTR) by **50%**.

#### 🚀 Key Highlighted Projects
1. **Distributed AWS Web Scraping Platform**:
   - Architected a massive 24/7 web crawling cluster on **AWS ECS/Fargate**.
   - Handles **1,000+ concurrent requests** and extracts over **3,000,000 records** monthly.
   - Built with **FastAPI, Scrapy, and Celery** using **Redis/RabbitMQ** as task queues with robust automatic retry strategies.
2. **Asynchronous Queue Tuning & Dead Letter Queueing**:
   - Designed reliable microservice asynchronous communication pathways.
   - Configured custom queue rules, DLQ containment, and prefetch limits to maintain peak performance under highly concurrent workloads.

---

**💡 Suggested Follow-up:** *"What is Aman's educational background and cloud certifications?"*`;
  }

  if (query.includes("education") || query.includes("cert") || query.includes("degree") || query.includes("university") || query.includes("study") || query.includes("academic") || query.includes("aws")) {
    return `### Education & Professional Certifications

Aman pairs a solid foundation in computer science with advanced, industry-recognized cloud credentials and continuous learning:

#### 🎓 Academic Background
* **Bachelor of Engineering (B.E. / B.Tech) in Computer Science & Engineering**
  * **Core Focus**: Distributed computing systems, databases, operating systems, advanced data structures, and algorithmic analysis.
  * **Algorithmic Strength**: Proactive problem solver who has solved **1,000+ competitive programming challenges** across Codeforces, LeetCode, and HackerRank.

#### 🏆 Professional AWS Certifications
* **AWS Certified Solutions Architect – Associate** (Oct 2025 – Oct 2028)
  * *Verification*: [View AWS Credential](https://www.credly.com/badges/3600e50d-6d46-48f3-a572-1589c71d1856/public_url)
  * Validates expertise in designing secure, resilient, high-performing, and cost-optimized cloud architectures.
* **AWS Certified CloudOps Engineer – Associate** (May 2026 – May 2029)
  * *Verification*: [View AWS Credential](https://www.credly.com/badges/7eab8dcc-7cae-49c5-80a9-67ab01026db4/public_url)
  * Validates skills in provisioning, operating, and managing highly available, scalable, and self-healing systems on AWS.

#### 📚 Current Active Studies & Skills Development
* **Golang (Go)**: Aman is actively learning Go to expand his high-performance backend capabilities alongside Python.
* **Advanced System Design**: Currently deep-diving into distributed consensus, cache invalidation strategies, and large-scale partitioning structures.

---

**💡 Suggested Follow-up:** *"What languages or technologies is Aman currently studying?"*`;
  }

  if (query.includes("skills") || query.includes("stack") || query.includes("tech") || query.includes("language") || query.includes("python") || query.includes("go") || query.includes("database") || query.includes("tool")) {
    return `### Aman's Core Technical Skills & Stack

Aman's skill set is focused heavily on backend efficiency, cloud operations, and distributed queue architecture:

* **Programming Languages**: Python (expert), SQL, Go (actively learning), C/C++, and JavaScript.
* **Frameworks & Orchestration**: FastAPI, Django / Django REST Framework, Scrapy, Celery, Redis, RabbitMQ, and Docker.
* **Cloud & DevOps**: AWS (ECS/Fargate, RDS, S3, EC2), CloudWatch, CloudFormation, Terraform, and GitHub Actions (CI/CD).
* **Databases**: PostgreSQL, MySQL, RDS/Aurora, and Redis.
* **Infrastructure & Reliability**: Container Orchestration, Autoscaling, Log Aggregation, Monitoring & Alerting, Fault Tolerance, and SLA/SLO design.
* **Architectural Concepts**: Distributed Systems, Event-Driven Architecture, Microservices, System Design, Production Operations, and REST APIs.

---

**💡 Suggested Follow-up:** *"Can you share details about some of his production engineering projects?"*`;
  }

  if (query.includes("cover") || query.includes("letter") || query.includes("apply")) {
    return `### Custom Draft Cover Letter (Sample)

> 💡 **Tip:** Want a customized cover letter? **Copy & paste your Job Description** directly into the chat! I will automatically analyze it and draft a highly-tailored letter matching Aman's skills to your exact requirements.

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
*Tokyo, Japan*

---

**📝 Customize This Cover Letter:**
Simply **copy and paste your Job Description** into the chat box! I will analyze the specifications against Aman's background to draft a custom-tailored cover letter and provide an alignment overview.

**💡 Suggested Follow-up:** *"Draft a tailored cover letter for this job description: [Paste your job description here]"*`;
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

I can help answer questions about Aman's background, professional experience, projects, skills, and cloud credentials. 

Here's what you can ask me:
* **"Why should we hire Aman?"** to hear about his top contributions and AWS certifications.
* **"Draft a cover letter"** to view a tailored professional cover letter draft (or paste your job description to match).
* **"Tell me about his work & projects."** to learn about SMS DataTech and key architectural systems.
* **"What is his technical stack?"** to view his programming languages, cloud skills, and databases.
* **"Tell me about his education and certifications."** to see his academic background and AWS credentials.`;
}

export default function AICompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("portfolio_ai_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved messages:", e);
      }
    }
    return [];
  });

  const [sessionId, setSessionId] = useState<string | null>(() => {
    return localStorage.getItem("portfolio_ai_session_id");
  });

  const [isLiveConnection, setIsLiveConnection] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-save messages to localStorage when updated
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("portfolio_ai_messages", JSON.stringify(messages));
    } else {
      localStorage.removeItem("portfolio_ai_messages");
    }
  }, [messages]);

  // Determine backend URL
  const backendUrl = (import.meta.env.VITE_AI_BACKEND_URL as string) || "https://portfolio-ai-backend-peach.vercel.app/api/chat";

  // Support opening the chat globally via a custom window event
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => {
      window.removeEventListener("open-ai-chat", handleOpenChat);
    };
  }, []);

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

      const localResponse = getDemoResponse(textToSend);
      const isFallback = localResponse.includes("Aman's Portfolio Companion");

      // Bypasses the serverless AI if it's a Quick Action or a direct local match (avoiding remote LLM overhead)
      if (isQuick || !isFallback) {
        // Resolve instantly/with a small natural delay to simulate active typing
        await new Promise(resolve => setTimeout(resolve, 500));
        botResponseText = localResponse;
      } else {
        // Attempt transmitting to Serverless Backend first
        const controller = new AbortController();
        let timedOut60 = false;

        const timer30 = setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: `delay-30-${Date.now()}`,
              sender: "bot",
              text: "⚡ **Good question!** Hold on, it's taking some extra time to think about the answer...",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 30000);

        const timer45 = setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: `delay-45-${Date.now()}`,
              sender: "bot",
              text: "⏳ **Still processing...** I'm deeply analyzing the archives to synthesize the best response. Almost there!",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 45000);

        const timer60 = setTimeout(() => {
          timedOut60 = true;
          controller.abort();
        }, 60000);

        try {
          const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({ 
              message: textToSend,
              sessionId: sessionId || undefined
            }),
            signal: controller.signal
          });

          clearTimeout(timer30);
          clearTimeout(timer45);
          clearTimeout(timer60);

          if (response.ok) {
            const data = await response.json();
            botResponseText = data.reply || data.message || "I received a blank reply from the AI service.";
            
            // Overwrite stored sessionId if a different one is returned
            if (data.sessionId && data.sessionId !== sessionId) {
              setSessionId(data.sessionId);
              localStorage.setItem("portfolio_ai_session_id", data.sessionId);
            }
          } else {
            throw new Error(`Server returned status: ${response.status}`);
          }
        } catch (backendErr: any) {
          clearTimeout(timer30);
          clearTimeout(timer45);
          clearTimeout(timer60);

          if (timedOut60 || backendErr?.name === "AbortError") {
            botResponseText = `⚠️ **Connection Timeout (60s)**

The live Serverless AI took too long to respond. Please try asking one of the **Suggested Commands** below (like **"🏆 Why hire Aman?"** or **"⚡ Skills & Tech Stack"**), which resolve instantly from our high-speed local pre-loaded answer engine!`;
          } else {
            console.error("=== AI COPILOT BACKEND ERROR DIAGNOSTIC ===");
            console.error("Target URL:", backendUrl);
            console.error("Error Message:", backendErr?.message || backendErr);
            console.error("Possible Causes:");
            console.error("1. CORS Mismatch: Check if 'ALLOWED_ORIGIN' in your Vercel Environment Variables matches your current origin exactly (e.g. 'https://deep-astaad.github.io' without trailing slash).");
            console.error("2. Browser Shield / Adblocker: Brave Shields or extensions like uBlock Origin might block '/api/chat' endpoints by default. Try disabling shields for the site.");
            console.error("3. Vercel Cold Start / Timeout: If the serverless function takes >10 seconds to respond, the browser might show a network error.");
            console.error("==========================================");
            botResponseText = localResponse;
          }
        }
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

  const renderTextWithLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      const linkText = match[1];
      const linkUrl = match[2];

      if (matchIndex > lastIndex) {
        elements.push(text.substring(lastIndex, matchIndex));
      }

      elements.push(
        <a
          key={matchIndex}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="text-indigo-600 hover:text-indigo-800 underline font-medium decoration-indigo-300 transition-colors"
        >
          {linkText}
        </a>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements.length > 0 ? elements : text;
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
        return renderTextWithLinks(sub);
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="ai-companion-launcher"
          className="flex items-center space-x-1.5 sm:space-x-2.5 px-3 py-2.5 sm:px-5 sm:py-3.5 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] sm:active:translate-x-[4px] sm:active:translate-y-[4px] cursor-pointer relative overflow-hidden group select-none"
          aria-label="Toggle AI Companion"
        >
          {/* Subtle neon gradient bar indicating AI features */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-purple-500 via-pink-500 to-amber-400 animate-pulse" />
          
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <X size={12} className="stroke-[2.5] sm:size-[14px]" />
            ) : (
              <Sparkles size={12} className="text-amber-300 animate-pulse fill-amber-300/20 sm:size-[14px]" />
            )}
          </div>
          
          <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] leading-none">
            {isOpen ? "Close AI" : "Ask Aman AI"}
          </span>

          {/* Real-time backend status dot */}
          {isLiveConnection && !isOpen && (
            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 border border-black" />
            </span>
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
            className="fixed bottom-22 left-4 right-4 sm:left-auto sm:right-6 sm:w-[400px] h-[520px] bg-white border border-black flex flex-col shadow-2xl z-50"
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
                {messages.length > 1 && (
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear this conversation history?")) {
                        localStorage.removeItem("portfolio_ai_messages");
                        localStorage.removeItem("portfolio_ai_session_id");
                        setSessionId(null);
                        setMessages([]);
                      }
                    }}
                    title="Clear Conversation"
                    className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
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

