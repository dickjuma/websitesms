interface TypingIndicatorProps {
  label: string;
}

export function TypingIndicator({ label }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 text-xs text-slate-500">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
