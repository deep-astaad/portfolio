/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface AvatarProps {
  className?: string;
}

export default function Avatar({ className = "w-32 h-32" }: AvatarProps) {
  return (
    <div className={`relative inline-block select-none overflow-hidden rounded-full bg-white p-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-[1.02] ${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Base */}
        <circle cx="200" cy="200" r="185" fill="#FFFFFF" />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M 115 230 C 95 230 95 270 115 270"
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          fill="#FFFFFF"
        />
        {/* Right Ear */}
        <path
          d="M 285 230 C 305 230 305 270 285 270"
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          fill="#FFFFFF"
        />

        {/* Head/Face Skin Area Base */}
        <path
          d="M 120 200 C 120 150 280 150 280 200 C 280 280 120 280 120 200 Z"
          fill="#FFFFFF"
        />

        {/* Turban (Solid Black Silhouette with elegant folds) */}
        {/* Main Crown and Folds */}
        <path
          d="M 115 180 
             C 100 130, 140 70, 200 65 
             C 260 70, 300 130, 285 180 
             C 275 190, 260 195, 250 185
             C 230 165, 170 165, 150 185
             C 140 195, 125 190, 115 180 Z"
          fill="#000000"
        />
        
        {/* Left Turban Wrap Overlap */}
        <path
          d="M 115 180
             C 115 130, 160 110, 200 135
             C 210 145, 180 175, 150 185
             C 135 190, 120 190, 115 180 Z"
          fill="#111111"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Right Turban Wrap Overlap */}
        <path
          d="M 285 180
             C 285 130, 240 110, 200 135
             C 190 145, 220 175, 250 185
             C 265 190, 280 190, 285 180 Z"
          fill="#111111"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Center triangle fold (Patka base) with half-tone dot texture */}
        <g>
          <path
            d="M 180 148 L 220 148 L 200 175 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="4"
          />
          {/* Half-tone dots inside patka */}
          <circle cx="200" cy="154" r="2.5" fill="#000000" />
          <circle cx="193" cy="158" r="2" fill="#000000" />
          <circle cx="200" cy="160" r="2.5" fill="#000000" />
          <circle cx="207" cy="158" r="2" fill="#000000" />
          <circle cx="196" cy="165" r="2" fill="#000000" />
          <circle cx="204" cy="165" r="2" fill="#000000" />
          <circle cx="200" cy="170" r="1.5" fill="#000000" />
        </g>

        {/* Glasses (Thick-rimmed oval-rectangular frames) */}
        <g id="glasses">
          {/* Left Frame */}
          <rect
            x="132"
            y="205"
            width="56"
            height="40"
            rx="18"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="11"
          />
          {/* Right Frame */}
          <rect
            x="212"
            y="205"
            width="56"
            height="40"
            rx="18"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="11"
          />
          {/* Bridge */}
          <path
            d="M 188 223 C 195 218, 205 218, 212 223"
            stroke="#000000"
            strokeWidth="11"
            strokeLinecap="round"
          />
          {/* Left Temple */}
          <path
            d="M 132 223 L 115 228"
            stroke="#000000"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Right Temple */}
          <path
            d="M 268 223 L 285 228"
            stroke="#000000"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>

        {/* Nose Line (Minimalist hand-drawn style) */}
        <path
          d="M 197 228 C 197 228, 201 253, 199 257 C 196 261, 187 257, 193 263 C 197 267, 203 265, 206 260"
          stroke="#000000"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Mustache (Solid Black stylized) */}
        <path
          d="M 155 272 
             C 175 264, 195 272, 200 276 
             C 205 272, 225 264, 245 272 
             C 255 276, 252 284, 242 284
             C 225 284, 210 276, 200 282 
             C 190 276, 175 284, 158 284
             C 148 284, 145 276, 155 272 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Full Beard (Solid Black covering lower jaw, connecting to sideburns) */}
        <path
          d="M 118 215
             C 110 260, 115 310, 145 332
             C 165 348, 185 352, 200 352
             C 215 352, 235 348, 255 332
             C 285 310, 290 260, 282 215
             C 280 235, 270 265, 260 280
             C 255 282, 245 284, 240 282
             C 230 285, 215 288, 200 288
             C 185 288, 170 285, 160 282
             C 155 284, 145 282, 140 280
             C 130 265, 120 235, 118 215 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lower lip gap indicator line */}
        <path
          d="M 188 296 C 193 299, 207 299, 212 296"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
