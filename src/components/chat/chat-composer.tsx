"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";

interface ChatComposerProps {
  placeholder: string;
  disabled?: boolean;
  onSubmit: (message: string) => Promise<void> | void;
  onTypingChange?: (isTyping: boolean) => void;
}

export function ChatComposer({
  placeholder,
  disabled = false,
  onSubmit,
  onTypingChange,
}: ChatComposerProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!onTypingChange) {
      return;
    }

    if (!value.trim()) {
      onTypingChange(false);
      return;
    }

    onTypingChange(true);

    const timeout = window.setTimeout(() => {
      onTypingChange(false);
    }, 800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [onTypingChange, value]);

  const submit = async () => {
    const message = value.trim();

    if (!message || disabled) {
      return;
    }

    setValue("");
    onTypingChange?.(false);
    await onSubmit(message);
  };

  return (
    <div className="flex items-end gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void submit();
          }
        }}
        rows={1}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-12 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
      />
      <button
        type="button"
        onClick={() => void submit()}
        disabled={disabled || !value.trim()}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}
