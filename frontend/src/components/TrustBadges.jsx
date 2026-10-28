import React from 'react';
import { CreditCard, Truck, ShieldCheck, Gift } from 'lucide-react';

const BADGES = [
  {
    icon: CreditCard,
    title: 'Рассрочка 0-0-12',
    subtitle: 'Без переплат и первого взноса',
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
  },
  {
    icon: Truck,
    title: 'Доставка за 2 часа',
    subtitle: 'По Бишкеку и пригородам',
    color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия 1 год',
    subtitle: '100% официальная техника',
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
  },
  {
    icon: Gift,
    title: 'Бонусы до 10%',
    subtitle: 'Кешбэк на следующую покупку',
    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {BADGES.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-800/90 p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-all"
          >
            <div className={`p-2.5 rounded-2xl shrink-0 ${b.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {b.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                {b.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
