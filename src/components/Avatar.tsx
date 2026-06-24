/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import profileUrl from "../profile.png";

interface AvatarProps {
  className?: string;
}

export default function Avatar({ className = "w-32 h-32" }: AvatarProps) {
  return (
    <div className={`relative inline-block select-none overflow-hidden rounded-full bg-white p-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-[1.02] ${className}`}>
      <img
        src={profileUrl}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
