export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        <div className="max-w-3xl animate-pulse">
          <div className="h-6 w-24 rounded-full bg-slate-200" />
          <div className="mt-6 h-16 w-3/4 rounded bg-slate-200" />
          <div className="mt-5 h-8 w-2/3 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}