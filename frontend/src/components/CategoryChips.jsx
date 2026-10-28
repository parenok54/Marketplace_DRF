import React from 'react';
import { Smartphone, Laptop, Headphones, Tablet, Watch, LayoutGrid } from 'lucide-react';

const ICONS_MAP = {
  smartfoniy: Smartphone,
  noutbuki: Laptop,
  naushniki: Headphones,
  planshetiy: Tablet,
  smart_chasiy: Watch,
};

export default function CategoryChips({ categories, selectedSlug, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        onClick={() => onSelectCategory('')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
          selectedSlug === ''
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-102'
            : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/60'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Все товары</span>
      </button>

      {categories.map((cat) => {
        const Icon = ICONS_MAP[cat.slug] || LayoutGrid;
        const isActive = selectedSlug === cat.slug;
        return (
          <button
            key={cat.id || cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-102'
                : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/60'
            }`}
          >
            <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>{cat.title}</span>
          </button>
        );
      })}
    </div>
  );
}
