/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  company?: string;
  role: string;
  date: string;
  metrics: string[];
  tags: string[];
  github?: string;
  liveUrl?: string;
  category: "work" | "personal";
  highlights: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
  isInternPromoted?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  dateRange: string;
  credentialUrl: string;
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: React.ReactNode; // Rich JSX content for premium formatting without heavy library sizes
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  views: number;
  likes: number;
  commentsCount: number;
  featured?: boolean;
  coverImage?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}
