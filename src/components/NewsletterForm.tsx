"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Check, Loader2, X } from 'lucide-react';
import { useGoogleAnalytics } from '@/lib/analytics';

interface NewsletterFormProps {
  variant?: 'inline' | 'popup' | 'footer' | 'sidebar';
  incentive?: string;
  source: string;
  sourceType?: 'website_form' | 'popup_modal' | 'landing_page' | 'checkout' | 'contact_form';
  interests?: string[];
  className?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function NewsletterForm({
  variant = 'inline',
  incentive = "Get free software development tips & updates",
  source,
  sourceType = 'website_form',
  interests = [],
  className = '',
  onSuccess,
  onClose
}: NewsletterFormProps) {
  const router = useRouter();
  const { trackEvent } = useGoogleAnalytics();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showNameField, setShowNameField] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source,
          sourceType,
          interests,
          consent: true
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        trackEvent('newsletter_signup', {
          source,
          sourceType,
          interests: interests.join(','),
          incentive
        });

        // Auto-close popup after success
        if (variant === 'popup' && onClose) {
          setTimeout(() => onClose(), 3000);
        }

        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(data.message || 'Subscription failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Newsletter signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Show name field after email is entered
    if (e.target.value && !showNameField) {
      setTimeout(() => setShowNameField(true), 500);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center p-6 ${className}`}>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to our newsletter!</h3>
        <p className="text-gray-600">
          You'll receive our latest updates and tips directly in your inbox.
        </p>
        {variant === 'popup' && onClose && (
          <button
            onClick={onClose}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Continue browsing
          </button>
        )}
      </div>
    );
  }

  const formClasses = {
    inline: 'flex gap-2 max-w-md',
    popup: 'space-y-4',
    footer: 'flex flex-col sm:flex-row gap-2 max-w-md',
    sidebar: 'space-y-4'
  };

  const inputClasses = {
    inline: 'flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    popup: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
    footer: 'flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    sidebar: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
  };

  const buttonClasses = {
    inline: 'px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
    popup: 'w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
    footer: 'px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
    sidebar: 'w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
  };

  return (
    <div className={className}>
      {variant === 'popup' && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {variant !== 'inline' && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">{incentive}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={formClasses[variant]}>
        <div className={variant === 'inline' || variant === 'footer' ? 'flex-1' : 'space-y-3'}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={inputClasses[variant]}
            required
            disabled={isSubmitting}
          />

          {(showNameField || variant === 'popup') && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className={inputClasses[variant]}
              disabled={isSubmitting}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className={`${buttonClasses[variant]} flex items-center justify-center gap-2`}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {isSubmitting ? 'Subscribing...' : variant === 'inline' ? 'Subscribe' : 'Join Newsletter'}
        </button>
      </form>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {variant !== 'inline' && (
        <p className="text-xs text-gray-500 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      )}
    </div>
  );
}

// Popup modal version with auto-trigger
export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds or 50% scroll
    const showTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 30000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <NewsletterForm
          variant="popup"
          source={window.location.pathname}
          sourceType="popup_modal"
          incentive="Get exclusive software development insights & free resources"
          onClose={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
}