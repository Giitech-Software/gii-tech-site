import React from 'react';

export default function LoadingSpinner({
  label = 'Loading',
  fullPage = false,
  className = '',
}) {
  return (
    <div
      className={`flex ${fullPage ? 'min-h-[60vh]' : 'py-12'} items-center justify-center px-6 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-warm animate-spin" />
        <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}
