import React from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white/95 dark:bg-slate-850/95 backdrop-blur-md text-slate-900 dark:text-white px-4 py-3.5 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 flex items-center gap-3.5 border border-slate-200 dark:border-slate-700 max-w-md">
        <div className={`p-2.5 rounded-xl shrink-0 ${
          toast.type === 'favorite' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-500' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
        }`}>
          {toast.type === 'favorite' ? (
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          ) : (
            <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{toast.title}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
