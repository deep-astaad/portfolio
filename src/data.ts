/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Project, Experience, Certification, BlogPost } from "./types";

export const PERSONAL_INFO = {
  name: "Aman Deep Singh",
  title: "Backend & Cloud Engineer",
  location: "Tokyo, Japan",
  email: "deepamansinghads@gmail.com",
  phone: "+81 70-9100-5492",
  linkedin: "https://linkedin.com/in/deep-aman-singh",
  github: "https://github.com/deep-astaad",
  summary:
    "Backend & Cloud Engineer with 2+ years of experience designing, operating, and scaling production systems. Proven track record of translating business requirements into system architecture, building 24/7 event-driven platforms, and improving reliability through self-healing monitoring infrastructure. Skilled in Python, Go, Docker, AWS, and IaC workflows.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" // Wait, let's use a nice professional placeholder vector or stylized icon if we prefer, or a clean abstract profile placeholder!
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-sa",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    dateRange: "Oct 2025 – Oct 2028",
    credentialUrl: "https://www.credly.com/badges/3600e50d-6d46-48f3-a572-1589c71d1856/public_url"
  },
  {
    id: "aws-cloudops",
    title: "AWS Certified CloudOps Engineer – Associate",
    issuer: "Amazon Web Services (AWS)",
    dateRange: "May 2026 – May 2029",
    credentialUrl: "https://www.credly.com/badges/7eab8dcc-7cae-49c5-80a9-67ab01026db4/public_url"
  },
  {
    id: "coursera-ml",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera / Stanford University / DeepLearning.AI",
    dateRange: "June 2026",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/3KHETA8P5E5B"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "sms-datatech-ft",
    company: "SMS DataTech Corporation",
    role: "Software Engineer",
    location: "Tokyo, Japan",
    duration: "July 2023 – Present",
    highlights: [
      "Designed and architected a distributed, 24/7 web scraping platform from scratch on AWS ECS/Fargate, managing 1,000+ concurrent extraction requests with dynamic autoscaling policies.",
      "Owned the end-to-end backend architecture for 'TANOMEE' (internal work-sharing platform used by 700+ employees), designing REST APIs and optimizing DB queries to reduce latency by 45%.",
      "Operated production infrastructure (RDS/Aurora, EC2, S3, CloudWatch) with CI/CD pipelines via GitHub Actions; managed deployments and saved ~100 USD annually by implementing AWS Savings Plans.",
      "Built event-driven data pipelines using Celery Beat, RabbitMQ, and Redis for distributed task execution with robust retry logic and dead-letter queue handling.",
      "Mentored junior interns on system design, cloud infrastructure, and production operations best practices."
    ]
  },
  {
    id: "sms-datatech-intern",
    company: "SMS DataTech Corporation",
    role: "Software Engineer Intern",
    location: "Tokyo, Japan",
    duration: "Jan 2023 – June 2023",
    highlights: [
      "Designed a self-healing log aggregation and real-time monitoring system for SMS DataTech's core platforms and 'Pogo', reducing Mean Time to Detection (MTTD) by 70% and Mean Time to Resolution (MTTR) by 50% for 24/7 operations.",
      "Built custom telemetry collectors and log streams to proactively identify performance anomalies across distributed test and staging environments."
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: ["Python", "Go (actively learning)", "C/C++", "SQL", "JavaScript"]
  },
  {
    title: "Frameworks & Tools",
    skills: ["Django", "Django REST", "FastAPI", "Scrapy", "Celery", "Redis", "RabbitMQ", "Docker"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (ECS/Fargate, RDS, S3, EC2)", "CloudWatch", "CloudFormation", "Terraform", "GitHub Actions", "CI/CD"]
  },
  {
    title: "Infrastructure & Reliability",
    skills: ["Container Orchestration", "Autoscaling", "Monitoring & Alerting", "Log Aggregation", "Fault Tolerance", "SLA/SLO Design"]
  },
  {
    title: "Architecture Concepts",
    skills: ["Distributed Systems", "Event-Driven Architecture", "Microservices", "System Design", "Production Operations", "REST APIs"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "RDS/Aurora", "Redis"]
  },
  {
    title: "AI Assisted Development",
    skills: ["Claude Code", "Codex", "Antigravity", "OpenCode"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "scraping-ai",
    title: "Scraping - AI Pipeline",
    role: "Architect & Developer",
    description: "An enterprise-grade, distributed scraping platform infused with LLM post-processing, utilizing rotating residential proxies, dynamic headless browser clusters, and smart rate-limiting to extract high-fidelity structured data from highly protected sources.",
    date: "2025",
    metrics: ["99.8% Extraction Success", "Gemini API integration", "3M+ rows processed monthly"],
    tags: ["Python", "Scrapy", "AWS ECS/Fargate", "Celery", "Redis", "Gemini API", "Docker"],
    category: "work",
    highlights: [
      "Architected a distributed crawling cluster running on AWS ECS/Fargate, coordinating multi-threaded scrapers with Celery and Redis to handle millions of monthly extractions.",
      "Implemented dynamic proxy rotation, custom cookie jar management, and user-behavior simulation to successfully bypass advanced anti-bot protections.",
      "Integrated Google Gemini API to parse and structure messy HTML/text into standard structured JSON payloads, achieving near-perfect schema validation rates."
    ]
  },
  {
    id: "job-hunt-ai",
    title: "Job Hunt AI Pipeline",
    role: "Lead Architect & Developer",
    description: "An end-to-end automated pipeline that scrapes listings, parses them with OpenAI, ranks them against profiles, and tracks applications, complete with a Chrome Extension helper.",
    date: "2025",
    metrics: ["100% automated daily runs", "OpenAI parsing", "Discord notification integration"],
    tags: ["Django", "MySQL", "Celery", "Redis", "Apify", "OpenAI API", "Chrome Extension"],
    github: "https://github.com/deep-astaad/job-hunt",
    category: "personal",
    highlights: [
      "Built a Celery-based async pipeline with daily scheduled triggers, a Django REST API backend, and Redis task reconciliation with automatic failure recovery.",
      "Developed a Chrome Extension to auto-fill job applications using stored profile context, powered by OpenAI API for intelligent field matching.",
      "Integrated Discord webhooks for instant notifications and alerts upon new high-matching job alerts."
    ]
  },
  {
    id: "dist-task",
    title: "DistTask",
    role: "Architect & Developer",
    description: "A lightweight, robust distributed task execution framework built from scratch in Python to process concurrent requests reliably with metrics monitoring.",
    date: "2024",
    metrics: ["Low latency queue", "Heartbeat monitoring", "Prometheus + Grafana integrations"],
    tags: ["Python (asyncio)", "FastAPI", "Redis", "PostgreSQL", "Prometheus", "Grafana", "Docker"],
    github: "https://github.com/deep-astaad/DistTask/",
    category: "personal",
    highlights: [
      "Architected a producer-worker model using Redis (async) as the broker and PostgreSQL for persistent task state management.",
      "Designed a robust UUID-based task lifecycle state machine (PENDING → RUNNING → SUCCESS/FAILED) with SQLAlchemy ORM.",
      "Built features like task prefetching, worker heartbeats, exponential backoff retries, and dead-letter queues.",
      "Tracked queue health and execution latency with Prometheus metrics and visualized them on live Grafana dashboards."
    ]
  },
  {
    id: "tanomee-backend",
    title: "TANOMEE Platform API",
    role: "Owner / Software Engineer",
    description: "Internal company work-sharing and team learning suite supporting 700+ concurrent employee connections.",
    date: "2023 - Present",
    metrics: ["45% Latency Reduction", "700+ Daily Active Users", "MVP Award Winner"],
    tags: ["Django", "PostgreSQL", "Celery", "Redis", "AWS S3", "Docker"],
    category: "work",
    highlights: [
      "Designed complete database schemas, optimized Django ORM query overhead, and resolved critical database lock contentions.",
      "Refactored heavy search and reporting endpoints to leverage Redis indexing, bringing down average response time by 45%.",
      "Awarded company-wide MVP (Q4 FY2025) for monumental contributions to the reliability and performance of this application."
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "autoscaling-ecs",
    title: "Building an Autoscaling Scraper on AWS ECS: Lessons in Resilient Distributed Systems",
    excerpt: "How to architect a reliable, 24/7 web scraping platform on AWS ECS and Fargate that processes thousands of concurrent extraction requests without breaking the bank.",
    date: "June 15, 2026",
    readTime: "6 min read",
    category: "Cloud & Systems",
    tags: ["AWS", "ECS Fargate", "Python", "Celery", "Distributed Systems"],
    author: {
      name: "Aman Deep Singh",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64&auto=format&fit=crop"
    },
    views: 412,
    likes: 89,
    commentsCount: 3,
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    content: React.createElement("div", { className: "space-y-6" },
      React.createElement("p", { className: "text-lg text-gray-700 leading-relaxed font-sans" },
        "In production environments, web scraping is far more than just downloading HTML tags with a simple script. When dealing with over 1,000 concurrent extraction requests, you face complex issues: server-side IP rate limiting, transient memory peaks, varying page sizes, and server downtime. To address these challenges at SMS DataTech, I designed and built a highly distributed, 24/7 web scraping platform on AWS ECS Fargate."
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "The Architectural Challenge"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "When we started, our legacy scraper ran on single EC2 instances. If a target site was slow, the thread pool blocked, leading to cascade failures. If we spun up more threads, we would run out of memory. We needed an architecture that separated request submission from execution, and scaled dynamically based on actual demand."
      ),
      React.createElement("div", { className: "bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-md" },
        React.createElement("p", { className: "text-sm text-blue-900 font-mono" },
          "🔑 Core Solution: A producer-worker model with Redis as our message broker and celery tasks distributed across AWS ECS Fargate tasks."
        )
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "Dynamic Autoscaling and Cost Management"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "With AWS Fargate, we are billed for CPU and memory per second. Running 50 containers continuously is extremely expensive and inefficient. Instead, we designed standard ECS Auto Scaling policies based on custom CloudWatch alarms:"
      ),
      React.createElement("ul", { className: "list-disc pl-6 space-y-2 text-gray-700" },
        React.createElement("li", null, React.createElement("strong", null, "Scale Out:"), " When the active task queue in Redis exceeds 200 items for 2 consecutive minutes, trigger a scale-out alarm to boot up Fargate tasks incrementally up to a maximum of 50 containers."),
        React.createElement("li", null, React.createElement("strong", null, "Scale In:"), " When the queue stays below 10 items for 5 minutes, spin down tasks to a baseline of 1-2 warm standby containers to keep costs minimal.")
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "Handling Failures Gracefully"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "Web scraping always involves high failure rates because external websites change or throw 403 blocks. To handle this, we integrated:"
      ),
      React.createElement("ol", { className: "list-decimal pl-6 space-y-2 text-gray-700" },
        React.createElement("li", null, React.createElement("strong", null, "Exponential Backoff:"), " Failed extraction requests are retried automatically with increasing delays (e.g., 2s, 8s, 32s, 128s) to avoid spamming the target server."),
        React.createElement("li", null, React.createElement("strong", null, "Dead-Letter Queues (DLQ):"), " If a request fails 5 times, it is sent to a DLQ for offline analysis. This keeps the active processing pipelines clean."),
        React.createElement("li", null, React.createElement("strong", null, "Rotating Proxy Integration:"), " Requests are automatically proxied through a pool of changing residential IPs, lowering block rates by 80%.")
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "The Results"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "This platform has run with 99.8% uptime, extracting millions of data points monthly. By relying on ECS Fargate autoscaling and procuring AWS Savings Plans, we kept infrastructure costs highly optimized while maintaining low latency pipelines."
      )
    )
  },
  {
    id: "query-optimization",
    title: "How to Reduce Average API Latency by 45% (A Query Optimization Case Study)",
    excerpt: "A deep dive into indexing strategies, database query tuning, and memory caching that transformed our internal company platform into a responsive, scalable service.",
    date: "April 28, 2026",
    readTime: "5 min read",
    category: "Databases & Performance",
    tags: ["PostgreSQL", "Django", "Redis", "Database Tuning", "Performance"],
    author: {
      name: "Aman Deep Singh",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64&auto=format&fit=crop"
    },
    views: 318,
    likes: 72,
    commentsCount: 2,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    content: React.createElement("div", { className: "space-y-6" },
      React.createElement("p", { className: "text-lg text-gray-700 leading-relaxed font-sans" },
        "When an internal software platform grows from a few dozen users to hundreds of active daily users, hidden bottlenecks in your database schema quickly bubble up. For our work-sharing suite 'TANOMEE', used by over 700 employees, database query overhead and locking contentions were causing average API response times to spike to almost 1.2 seconds during morning rushes. Here is how we achieved a 45% latency reduction."
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "Step 1: Finding the Culprit with EXPLAIN ANALYZE"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "Never guess where database lag is coming from. We used PostgreSQL slow query logging combined with EXPLAIN ANALYZE to dissect our most heavily hit endpoints. We discovered two major problems:"
      ),
      React.createElement("ul", { className: "list-disc pl-6 space-y-2 text-gray-700" },
        React.createElement("li", null, React.createElement("strong", null, "Sequential Scans:"), " The dashboard query was performing a sequential scan on a table with 500,000+ entries because of a missing index on foreign keys."),
        React.createElement("li", null, React.createElement("strong", null, "N+1 Query Problem:"), " Django's ORM was making separate SQL calls to fetch related profiles for each list element, resulting in 101 separate database queries to serve a single feed request!")
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "Step 2: Resolving the N+1 Queries"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "To fix the N+1 problem, we made simple adjustments to our Django QuerySets. By switching from a simple `.all()` to utilizing `.select_related()` and `.prefetch_related()`, PostgreSQL can join and retrieve all the related records in a single query:"
      ),
      React.createElement("pre", { className: "bg-slate-900 text-slate-100 p-4 rounded-md font-mono text-xs overflow-x-auto" },
        `# ❌ BAD: Causes N+1 query loop
tasks = Task.objects.filter(status='active')
for task in tasks:
    print(task.user.profile.nickname)

# ✅ GOOD: Joins tables on the database side in 1 query
tasks = Task.objects.filter(status='active').select_related('user__profile')`
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "Step 3: Strategic Indexing and Cache Aggregations"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "We added compound B-Tree indexes on columns frequently used for sorting and filtering (like status and date). Next, we offloaded heavy, slow-changing aggregation metrics (e.g. 'completed tasks this month') to a Redis cache."
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "Instead of calculating aggregations on every page reload, we wrote a Celery cron job that recalculates these values every 10 minutes and saves them as key-value lookups in Redis. The API now fetches metrics in < 2ms instead of 400ms."
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "Conclusion"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "By optimizing Django QuerySets, indexing critical foreign keys, and setting up memory-based Redis caching, we brought average response latencies from 1,200ms down to ~650ms. The application now runs buttery smooth even under peak loads."
      )
    )
  },
  {
    id: "competitive-programming",
    title: "My Journey to Solving 1,000+ Competitive Programming Problems",
    excerpt: "What competitive coding on Codeforces and LeetCode taught me about systems complexity, algorithmic trade-offs, and writing high-performance, edge-case resilient backend code.",
    date: "February 12, 2026",
    readTime: "4 min read",
    category: "Algorithms & Career",
    tags: ["Algorithms", "Competitive Programming", "Codeforces", "LeetCode", "Problem Solving"],
    author: {
      name: "Aman Deep Singh",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64&auto=format&fit=crop"
    },
    views: 524,
    likes: 120,
    commentsCount: 4,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
    content: React.createElement("div", { className: "space-y-6" },
      React.createElement("p", { className: "text-lg text-gray-700 leading-relaxed font-sans" },
        "Solving over 1,000 algorithmic problems across platforms like Codeforces (where I'm rated a Specialist with a peak of 1455) and LeetCode has been a cornerstone of my growth as an engineer. While some developers dismiss competitive programming as 'interviews preparation', I have found that it builds core instincts that directly elevate system architecture and backend reliability."
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "1. Complexity Intuition is a Production Tool"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "In CP, a program that has a complexity of O(N²) instead of O(N log N) will fail with a 'Time Limit Exceeded' (TLE) error. In production, this same algorithmic mismatch is what causes a service to crash when traffic spikes. Knowing how data structures scale lets me design memory models and caching indexes that stay fast under load."
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "2. Handling Edge Cases Before They Occur"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "CP trains your brain to proactively seek out negative numbers, empty arrays, extreme bounds, and overflows. In backend engineering, this habit translates directly to writing defensive validation code. It means validating input boundaries, planning for network failures, and avoiding null pointer reference exceptions before code hits production."
      ),
      React.createElement("h3", { className: "text-2xl font-display font-bold text-gray-900 mt-8 mb-4" },
        "3. Writing Clean, Elegant Logic"
      ),
      React.createElement("p", { className: "text-gray-700 leading-relaxed" },
        "Competitive programming isn't about writing spaghetti code quickly. On the contrary, the best solutions are short, elegant, and modular. It forces you to express complex state machines in simple data structures. That simplicity keeps production code maintainable, testable, and highly readable."
      )
    )
  }
];
