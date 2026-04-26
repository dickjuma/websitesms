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
    if (!onTypingChange) return;
    const isTyping = value.trim().length > 0;
    onTypingChange(isTyping);
  }, [value, onTypingChange]);

  const submit = async () => {
    const message = value.trim();
    if (!message || disabled) return;
    setValue("");
    onTypingChange?.(false);
    await onSubmit(message);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <label htmlFor="chat-message" className="sr-only">
        Chat message
      </label>
      <textarea
        id="chat-message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-10 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 disabled:cursor-not-allowed disabled:text-slate-400"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
