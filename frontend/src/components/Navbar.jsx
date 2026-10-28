import React from 'react';
import { ShoppingBag, Search, PlusCircle, LogIn, LogOut, Heart, MapPin, Phone, Sun, Moon } from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  onOpenAuth,
  user,
  onLogout,
  onOpenCreatePost,
  theme,
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      
      {/* Top micro-bar */}
      <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-purple-50/90 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border-b border-indigo-100/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs py-2 px-4 hidden md:block transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Город: <strong className="text-slate-900 dark:text-white font-bold">Бишкек</strong></span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Горячая линия: <strong className="text-slate-900 dark:text-white font-bold">+996 (555) 123-456</strong> (09:00 - 21:00)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
            <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">Доставка и оплата</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">Гарантия качества</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">О маркетплейсе</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Marketplace<span className="text-blue-600 dark:text-blue-400">DRF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  0-0-12
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                  Электроника и гаджеты
                </span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по 25+ товарам, брендам (iPhone, Lenovo, Samsung)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 hover:bg-slate-100 dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
              title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Create listing button */}
            <button
              onClick={onOpenCreatePost}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 rounded-2xl shadow-sm shadow-blue-500/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Подать объявление</span>
            </button>

            {/* Favorites button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 sm:p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 active:scale-95 transition"
              title="Избранное"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 active:scale-95 transition"
              title="Корзина"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {user.username}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">В сети</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Выйти"
                  className="p-2 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 active:scale-95 rounded-2xl transition border border-blue-200/60 dark:border-blue-800/60"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Войти</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
