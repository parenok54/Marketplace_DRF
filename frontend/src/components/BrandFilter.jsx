import React from 'react';

const BRANDS = ['Все', 'Apple', 'Samsung', 'Lenovo', 'Asus', 'Acer', 'ARG'];

export default function BrandFilter({ selectedBrand, onSelectBrand }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1">
        Бренды:
      </span>
      {BRANDS.map((brand) => {
        const isAll = brand === 'Все';
        const isSelected = isAll ? !selectedBrand : selectedBrand.toLowerCase() === brand.toLowerCase();
        return (
          <button
            key={brand}
            onClick={() => onSelectBrand(isAll ? '' : brand)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-102'
                : 'bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700/60'
            }`}
          >
            {brand}
          </button>
        );
      })}
    </div>
  );
}
