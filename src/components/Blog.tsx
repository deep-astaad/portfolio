/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Search, Tag, Calendar, Clock, Heart, 
  MessageSquare, Share2, Copy, Check, Send, User, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BLOG_POSTS } from "../data";
import { BlogPost, BlogComment } from "../types";

// Default seed comments to make the blog look highly populated and engaging
const DEFAULT_COMMENTS: Record<string, BlogComment[]> = {
  "autoscaling-ecs": [
    {
      id: "seed-1",
      author: "Takeshi Tanaka",
      date: "June 16, 2026",
      text: "Outstanding writeup! The cost optimizations on Fargate are spot on. Did you run into any issues with task provisioning times during rapid traffic spikes?"
    },
    {
      id: "seed-2",
      author: "Sarah Jenkins",
      date: "June 18, 2026",
      text: "Excellent architecture! Standardizing DLQ handles those pesky dynamic blocking pages so much better."
    }
  ],
  "query-optimization": [
    {
      id: "seed-3",
      author: "Hiroshi Sato",
      date: "April 29, 2026",
      text: "Django's prefetch_related is a life saver. The compound B-Tree indexing part is also super important. Great performance results!"
    }
  ],
  "competitive-programming": [
    {
      id: "seed-4",
      author: "Aravind Nair",
      date: "February 15, 2026",
      text: "This is exactly what people miss about CP. It is not just about clearing interview loops, it develops true complexity intuition."
    }
  ]
};

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  
  // Local persistent states
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [postLikesCount, setPostLikesCount] = useState<Record<string, number>>({});
  const [postComments, setPostComments] = useState<Record<string, BlogComment[]>>({});
  
  // Comment Form States
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  
  // Copied indicator state for sharing
  const [copiedLink, setCopiedLink] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem("aman_portfolio_likes");
      if (storedLikes) setLikedPosts(JSON.parse(storedLikes));
      
      const storedLikesCount = localStorage.getItem("aman_portfolio_likes_count");
      if (storedLikesCount) {
        setPostLikesCount(JSON.parse(storedLikesCount));
      } else {
        // Initialize with default likes from data
        const initialLikes: Record<string, number> = {};
        BLOG_POSTS.forEach(p => {
          initialLikes[p.id] = p.likes;
        });
        setPostLikesCount(initialLikes);
      }

      const storedComments = localStorage.getItem("aman_portfolio_comments");
      if (storedComments) {
        setPostComments(JSON.parse(storedComments));
      } else {
        setPostComments(DEFAULT_COMMENTS);
      }
    } catch (e) {
      console.error("Failed to load local storage state:", e);
    }
  }, []);

  // Filter unique tags across all posts
  const allTags = ["All", ...Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)))];

  // Filter blog posts based on search and tag selection
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const handleLike = (postId: string) => {
    const wasLiked = !!likedPosts[postId];
    const newLikesState = { ...likedPosts, [postId]: !wasLiked };
    setLikedPosts(newLikesState);
    localStorage.setItem("aman_portfolio_likes", JSON.stringify(newLikesState));

    const currentLikesCount = postLikesCount[postId] || BLOG_POSTS.find(p => p.id === postId)?.likes || 0;
    const newLikesCount = wasLiked ? currentLikesCount - 1 : currentLikesCount + 1;
    const newLikesCountState = { ...postLikesCount, [postId]: newLikesCount };
    setPostLikesCount(newLikesCountState);
    localStorage.setItem("aman_portfolio_likes_count", JSON.stringify(newLikesCountState));
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      setCommentError("Please fill in both name and comment fields.");
      return;
    }

    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      author: commentName.trim(),
      date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
      text: commentText.trim()
    };

    const currentPostComments = postComments[postId] || [];
    const updatedCommentsState = {
      ...postComments,
      [postId]: [newComment, ...currentPostComments]
    };

    setPostComments(updatedCommentsState);
    localStorage.setItem("aman_portfolio_comments", JSON.stringify(updatedCommentsState));
    
    // Reset forms
    setCommentName("");
    setCommentText("");
    setCommentError("");
  };

  const handleShare = (platform: "twitter" | "linkedin" | "copy") => {
    const shareUrl = window.location.href;
    const title = activePost ? activePost.title : "Aman Deep Singh's Portfolio & Tech Blog";

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="blog-root-container">
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: FULL BLOG POST READER */}
        {activePost ? (
          <motion.article
            key="blog-post-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-8"
            id={`blog-post-active-${activePost.id}`}
          >
            {/* Back Nav */}
            <button
              onClick={() => setActivePost(null)}
              id="blog-back-button"
              className="group inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Articles</span>
            </button>

            {/* Post Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-black font-mono">
                <span>{activePost.category}</span>
                <span>•</span>
                <span>{activePost.readTime}</span>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-black sm:text-4xl">
                {activePost.title}
              </h1>
              
              {/* Meta row */}
              <div className="flex items-center justify-between border-y border-gray-200 py-3 mt-4">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={activePost.author.avatar} alt={activePost.author.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-black">{activePost.author.name}</p>
                    <p className="font-mono text-[9px] uppercase text-gray-400">{activePost.date}</p>
                  </div>
                </div>

                {/* Interaction & Sharing */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleLike(activePost.id)}
                    id="blog-like-button"
                    className={`flex items-center space-x-1 px-3 py-1.5 border text-xs font-bold uppercase tracking-wider transition-all ${
                      likedPosts[activePost.id]
                        ? "bg-black border-black text-white"
                        : "bg-white border-black text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    <Heart size={12} className={likedPosts[activePost.id] ? "fill-white text-white" : ""} />
                    <span>{postLikesCount[activePost.id] ?? activePost.likes}</span>
                  </button>

                  <div className="h-4 w-[1px] bg-gray-200" />

                  {/* Share widget */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleShare("twitter")}
                      title="Share on X"
                      id="share-twitter"
                      className="p-1.5 border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black text-gray-500 transition-colors"
                    >
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      title="Share on LinkedIn"
                      id="share-linkedin"
                      className="p-1.5 border border-gray-200 bg-white hover:bg-black hover:text-white hover:border-black text-gray-500 transition-colors"
                    >
                      <Share2 size={13} />
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      title="Copy Article Link"
                      id="share-copy"
                      className={`p-1.5 border transition-all ${
                        copiedLink ? "bg-black border-black text-white" : "bg-white border-gray-200 text-gray-500 hover:bg-black hover:text-white hover:border-black"
                      }`}
                    >
                      {copiedLink ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Custom Cover Photo */}
            {activePost.coverImage && (
              <div className="w-full h-64 sm:h-80 overflow-hidden border border-gray-200">
                <img src={activePost.coverImage} alt={activePost.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-neutral max-w-none text-[#111111] leading-relaxed font-sans text-sm" id="blog-article-content">
              {activePost.content}
            </div>

            {/* Comments Divider */}
            <div className="border-t border-gray-200 pt-8" />

            {/* Comments Section */}
            <div className="space-y-6" id="blog-comments-section">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-black flex items-center space-x-2">
                <MessageSquare size={16} className="text-black" />
                <span>Discussion ({(postComments[activePost.id] || []).length})</span>
              </h3>

              {/* Add Comment Form */}
              <form 
                onSubmit={(e) => handleAddComment(e, activePost.id)}
                className="bg-[#f9fafb] p-5 border border-gray-200 space-y-4"
                id="comment-form"
              >
                <h4 className="font-display font-bold text-[10px] uppercase tracking-widest text-black">Leave a Reply</h4>
                
                {commentError && (
                  <p className="text-xs text-black font-semibold uppercase">{commentError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="comment-name" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                    <input
                      type="text"
                      id="comment-name"
                      placeholder="e.g. Satoshi Nakano"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="block w-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-sans text-black focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="comment-message" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Comment</label>
                  <textarea
                    id="comment-message"
                    rows={4}
                    placeholder="Type your message here. Be nice!"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="block w-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-sans text-black focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    id="submit-comment"
                    className="inline-flex items-center space-x-1.5 border border-black bg-black px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-black transition-colors"
                  >
                    <span>Post Comment</span>
                    <Send size={11} />
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {(postComments[activePost.id] || []).length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No comments yet. Be the first to start the discussion!</p>
                ) : (
                  (postComments[activePost.id] || []).map((comm) => (
                    <div key={comm.id} className="flex space-x-3.5 p-4 border border-gray-200 bg-white">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-gray-100 border border-gray-200">
                        <User size={14} className="stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-sans text-xs font-bold text-black">{comm.author}</span>
                          <span className="text-[10px] text-gray-300">•</span>
                          <span className="font-mono text-[9px] uppercase text-gray-400">{comm.date}</span>
                        </div>
                        <p className="font-sans text-xs text-gray-600 leading-relaxed">
                          {comm.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

          </motion.article>
        ) : (
          
          /* VIEW 2: ALL ARTICLES FEED */
          <motion.div
            key="blog-feed-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
            id="blog-feed-container"
          >
            {/* Header Column */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="inline-flex items-center space-x-1.5 border border-black bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-black">
                <Sparkles size={10} />
                <span>Technical Writing</span>
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-black sm:text-4xl" id="blog-feed-header">
                The Cloud Engineer Log
              </h1>
              <div className="h-0.5 w-12 bg-black mx-auto my-3" />
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Deep dives into systems architecture, AWS operations, database tuning, and high-performance coding. Written to be practical and actionable.
              </p>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6" id="blog-filters-row">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      id={`tag-filter-${tag}`}
                      className={`px-3 py-1 font-sans text-xs uppercase tracking-wider font-semibold border transition-all duration-150 ${
                        isSelected
                          ? "bg-black border-black text-white"
                          : "bg-white border-gray-200 text-gray-500 hover:text-black hover:border-black"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:max-w-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  placeholder="SEARCH ARTICLES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="search-input"
                  className="block w-full border border-gray-200 bg-white pl-9 pr-3.5 py-2 text-xs font-sans uppercase text-black placeholder:text-gray-400 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-200 bg-white" id="no-articles-view">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">No articles matched your current query or filters.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}
                  className="mt-3 font-sans text-xs font-bold text-black underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" id="articles-grid">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    id={`blog-card-${post.id}`}
                    className="group flex flex-col justify-between border border-gray-200 bg-[#f9fafb] p-5 cursor-pointer hover:border-black hover:bg-white transition-all duration-200"
                  >
                    <div className="space-y-4">
                      {/* Cover Photo Thumb */}
                      {post.coverImage && (
                        <div className="w-full h-44 overflow-hidden border border-gray-200">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-300" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-[10px] font-bold text-black font-mono uppercase tracking-widest">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-display font-bold text-base text-black group-hover:underline line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-[10px] uppercase font-mono text-gray-400">
                        <Calendar size={11} />
                        <span>{post.date}</span>
                      </div>

                      {/* Interaction Counts */}
                      <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Heart size={11} className={likedPosts[post.id] ? "fill-black text-black" : ""} />
                          <span className={likedPosts[post.id] ? "text-black font-semibold" : ""}>{postLikesCount[post.id] ?? post.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare size={11} />
                          <span>{(postComments[post.id] || DEFAULT_COMMENTS[post.id] || []).length}</span>
                        </span>
                      </div>
                    </div>

                  </article>
                ))}
              </div>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
