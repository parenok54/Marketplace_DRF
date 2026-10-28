import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../api';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.qty,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 transition-colors">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Корзина</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Корзина пуста</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">
                  Добавьте товары из каталога, чтобы сделать заказ
                </p>
              </div>
            ) : (
              items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 items-center"
                >
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.title}
                    className="w-16 h-16 object-contain bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-100 dark:border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {Number(product.price).toLocaleString('ru-RU')} сом
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 rounded-lg">
                        <button
                          onClick={() => onUpdateQty(product.id, qty - 1)}
                          className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 dark:text-slate-100">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(product.id, qty + 1)}
                          className="p-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Итого к оплате:</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {total.toLocaleString('ru-RU')} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">сом</span>
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
