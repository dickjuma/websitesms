interface TypingIndicatorProps {
  label: string;
}

export function TypingIndicator({ label }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-3 px-3 text-xs font-medium text-slate-500">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500 [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-sky-500 [animation-delay:240ms]" />
      </div>
      <span>{label}</span>
    </div>
  );
}
