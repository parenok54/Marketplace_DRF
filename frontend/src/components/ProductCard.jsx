import React from 'react';
import { ShoppingCart, Check, Heart, Star, Zap, Flame } from 'lucide-react';
import { getImageUrl } from '../api';

export default function ProductCard({
  product,
  onOpenDetails,
  onAddToCart,
  isInCart,
  isFavorite,
  onToggleFavorite,
  onQuickBuy,
}) {
  const priceNum = Number(product.price);
  const formattedPrice = priceNum.toLocaleString('ru-RU');
  const oldPrice = Math.round(priceNum * 1.12).toLocaleString('ru-RU');
  const installmentMonthly = Math.round(priceNum / 12).toLocaleString('ru-RU');

  const rating = (4.7 + (product.id % 4) * 0.1).toFixed(1);
  const reviewsCount = 12 + (product.id * 7) % 60;

  return (
    <div className="group bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.category_detail && (
          <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-blue-700 dark:text-blue-400 rounded-lg shadow-xs border border-blue-100 dark:border-slate-700">
            {product.category_detail.title}
          </span>
        )}
        {priceNum > 50000 && (
          <span className="px-2.5 py-0.5 text-[10px] font-black bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-lg shadow-xs flex items-center gap-1">
            <Flame className="w-3 h-3 fill-white" />
            ХИТ
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
          isFavorite
            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 shadow-sm border border-rose-100 dark:border-rose-900/50'
            : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 dark:text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-700 shadow-xs'
        }`}
        title="В избранное"
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative pt-[78%] bg-gradient-to-b from-slate-50/60 to-white dark:from-slate-800/40 dark:to-slate-900/60 cursor-pointer overflow-hidden"
      >
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-5 group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://placehold.co/400x300?text=No+Photo';
          }}
        />
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">{rating}</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">({reviewsCount} отзывов)</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Installment Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>в рассрочку от {installmentMonthly} сом × 12</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
          
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {formattedPrice} <span className="text-xs font-bold text-slate-500 dark:text-slate-400">сом</span>
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-medium">
              {oldPrice} сом
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            
            {/* Quick Buy in 1 click */}
            <button
              onClick={() => onQuickBuy(product)}
              className="px-2.5 py-2.5 text-xs font-bold text-amber-950 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/90 dark:hover:bg-amber-900/50 active:scale-95 rounded-2xl transition text-center border border-amber-200/70 dark:border-amber-800/50"
            >
              В 1 клик
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                isInCart
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>В корзине</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Купить</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
