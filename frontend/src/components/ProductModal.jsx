import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Star, Zap } from 'lucide-react';
import { getImageUrl } from '../api';

export default function ProductModal({ product, onClose, onAddToCart, isInCart, onQuickBuy }) {
  if (!product) return null;

  const [installmentTerm, setInstallmentTerm] = useState(12);

  const priceNum = Number(product.price);
  const formattedPrice = priceNum.toLocaleString('ru-RU');
  const oldPrice = Math.round(priceNum * 1.12).toLocaleString('ru-RU');
  const monthlyPayment = Math.round(priceNum / installmentTerm).toLocaleString('ru-RU');

  const rating = (4.7 + (product.id % 4) * 0.1).toFixed(1);
  const reviewsCount = 12 + (product.id * 7) % 60;

  const descLines = product.description
    ? product.description.split('\n').filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row border border-slate-100 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 p-8 bg-gradient-to-b from-blue-50/30 via-slate-50/50 to-white dark:from-slate-800/40 dark:via-slate-850 dark:to-slate-900 flex items-center justify-center relative">
          <img
            src={getImageUrl(product.image)}
            alt={product.title}
            className="max-h-96 w-full object-contain drop-shadow-sm"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {product.category_detail && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                    {product.category_detail.title}
                  </span>
                )}
                {product.external_code && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    Арт: {product.external_code}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{rating}</span>
                <span className="text-slate-400 dark:text-slate-500 font-medium">({reviewsCount})</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-snug">
              {product.title}
            </h2>

            {/* Price section */}
            <div className="mb-5 p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {formattedPrice} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">сом</span>
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500 line-through font-medium">
                  {oldPrice} сом
                </span>
                <span className="text-xs font-extrabold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 px-2.5 py-0.5 rounded-lg">
                  -12%
                </span>
              </div>

              {/* Installment calculator */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                    Рассрочка 0-0-12:
                  </span>
                  <div className="flex gap-1.5">
                    {[3, 6, 12].map((term) => (
                      <button
                        key={term}
                        onClick={() => setInstallmentTerm(term)}
                        className={`px-3 py-1 rounded-xl text-xs font-extrabold transition ${
                          installmentTerm === term
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-650 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {term} мес
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-200/70 dark:border-emerald-800/50 flex justify-between items-center">
                  <span>Ежемесячный платёж:</span>
                  <span className="text-sm font-black text-emerald-900 dark:text-emerald-200">{monthlyPayment} сом / мес</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Характеристики
              </h4>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3.5 text-xs text-slate-700 dark:text-slate-300 space-y-2 border border-slate-100 dark:border-slate-700/50 max-h-48 overflow-y-auto">
                {descLines.length > 0 ? (
                  descLines.map((line, idx) => (
                    <div key={idx} className="flex justify-between border-b border-slate-200/50 dark:border-slate-700/40 pb-1.5 last:border-0 last:pb-0">
                      <span className="font-medium">{line}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">Характеристики загружаются...</p>
                )}
              </div>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">100% Оригинал</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Экспресс-доставка</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">14 дней обмен</span>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => onQuickBuy(product)}
              className="py-3 px-4 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-950 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/50 rounded-2xl font-bold text-xs sm:text-sm active:scale-95 transition"
            >
              Купить в 1 клик
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isInCart
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>В корзине</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>В корзину</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
