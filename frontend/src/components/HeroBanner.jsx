import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Sparkles, Flame } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    tag: 'Хит сезона 2026',
    badge: 'Новинки Apple',
    title: 'Apple iPhone 18 Pro & 17 Pro Max',
    subtitle: 'Титан, новые сенсоры камер и рекордная автономность. В наличии в Бишкеке.',
    highlight: 'Рассрочка 0-0-12 от 11 000 сом/мес',
    cta: 'Смотреть смартфоны',
    filterCategory: 'smartfoniy',
    bgGradient: 'from-blue-600 via-indigo-600 to-violet-700',
    badgeBg: 'bg-amber-400 text-amber-950',
    img: 'https://object.pscloud.io/cms/cms/Photo/img_0_77_13114_0_1_5ST9U2_320.webp',
  },
  {
    id: 2,
    tag: 'Специальное предложение',
    badge: 'Скидки до -25%',
    title: 'Ноутбуки Lenovo, Asus и MacBook',
    subtitle: 'Для учёбы, работы с графикой и требовательных игр. Официальная гарантия 1 год.',
    highlight: 'Бесплатная мышь и сумка в комплекте',
    cta: 'Выбрать ноутбук',
    filterCategory: 'noutbuki',
    bgGradient: 'from-rose-500 via-orange-500 to-amber-500',
    badgeBg: 'bg-white text-rose-700',
    img: 'https://object.pscloud.io/cms/cms/Photo/img_0_77_7228_0_1_1HRhd0_320.webp',
  },
  {
    id: 3,
    tag: 'Музыка и комфорт',
    badge: 'Бестселлеры',
    title: 'AirPods 4 & Galaxy Buds Pro',
    subtitle: 'Кристально чистый звук, активное шумоподавление и комфорт на весь день.',
    highlight: 'Экспресс-доставка за 2 часа по городу',
    cta: 'Выбрать наушники',
    filterCategory: 'naushniki',
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badgeBg: 'bg-amber-300 text-emerald-950',
    img: 'https://object.pscloud.io/cms/cms/Photo/img_0_77_7218_0_1_T4e5Rv_320.webp',
  },
];

export default function HeroBanner({ onSelectCategory }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[current];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg shadow-indigo-500/10 mb-6">
      
      {/* Background with vibrant warm gradient */}
      <div className={`w-full bg-gradient-to-r ${slide.bgGradient} p-6 sm:p-10 text-white min-h-[300px] sm:min-h-[340px] flex items-center transition-all duration-700 relative`}>
        
        {/* Soft decorative light circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="max-w-2xl z-10 space-y-4">
          
          {/* Tag & Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white">
              {slide.tag}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black shadow-sm ${slide.badgeBg}`}>
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-xs">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-white/90 max-w-lg leading-relaxed font-medium">
            {slide.subtitle}
          </p>

          {/* Highlight pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold shadow-xs">
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>{slide.highlight}</span>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={() => onSelectCategory(slide.filterCategory)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl active:scale-95 transition-all"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>

        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-6 sm:left-10 z-20 flex items-center gap-2">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                current === i ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-5 right-6 sm:right-10 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
            className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % BANNERS.length)}
            className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
