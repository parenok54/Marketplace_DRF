import React, { useState } from 'react';
import { X, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import { getImageUrl } from '../api';

export default function QuickBuyModal({ product, isOpen, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        onSuccess(`Заказ на «${product.title}» оформлен! Менеджер свяжется с вами по номеру ${phone}`);
        setDone(false);
        onClose();
      }, 1500);
    }, 800);
  };

  const monthlyPrice = Math.round(Number(product.price) / 12).toLocaleString('ru-RU');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 dark:border-slate-800">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Заказ принят!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Мы свяжемся с вами в течение 10 минут для подтверждения адреса доставки.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <span className="px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                Экспресс-заказ
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">Купить в 1 клик</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                Без регистрации — укажите телефон, и мы всё оформим
              </p>
            </div>

            {/* Product preview */}
            <div className="flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 items-center mb-5">
              <img
                src={getImageUrl(product.image)}
                alt={product.title}
                className="w-14 h-14 object-contain rounded-xl bg-white dark:bg-slate-900 p-1 border border-slate-100 dark:border-slate-800"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</h4>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                  {Number(product.price).toLocaleString('ru-RU')} сом
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  в рассрочку от {monthlyPrice} сом/мес
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Номер телефона
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+996 (___) __-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-98 transition disabled:opacity-50"
                >
                  {loading ? 'Оформление...' : 'Подтвердить заказ'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ваши данные защищены и не передаются третьим лицам</span>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
