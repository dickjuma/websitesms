"use client";

import { useState } from 'react';

interface ObfuscatedEmailProps {
  email: string;
  subject?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ObfuscatedEmail({ email, subject, className, children }: ObfuscatedEmailProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    setIsRevealed(true);
  };

  const mailtoLink = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

  if (isRevealed) {
    return (
      <a
        href={mailtoLink}
        className={className}
        onMouseLeave={() => setIsRevealed(false)}
      >
        {children || email}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label={`Click to reveal email address`}
    >
      {children || `${email.split('@')[0]}@...`}
    </button>
  );
}