import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TrustBadges from './components/TrustBadges';
import CategoryChips from './components/CategoryChips';
import BrandFilter from './components/BrandFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import QuickBuyModal from './components/QuickBuyModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import CreatePostModal from './components/CreatePostModal';
import Toast from './components/Toast';
import { getPosts, getCategories } from './api';
import { ArrowUpDown, SlidersHorizontal, ChevronLeft, ChevronRight, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Theme state ('light' or 'dark')
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('marketplace_theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Apply dark class to <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('marketplace_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [ordering, setOrdering] = useState('-created');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Modals & Drawers state
  const [activeProduct, setActiveProduct] = useState(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Cart & Favorites state (persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marketplace_cart') || '[]');
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marketplace_favs') || '[]');
    } catch {
      return [];
    }
  });

  // User auth state
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });

  // Sync cart and favs to localStorage
  useEffect(() => {
    localStorage.setItem('marketplace_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('marketplace_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Load categories once
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : data.results || []))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Fetch posts whenever filters or page change
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        ordering: ordering,
      };
      
      let finalSearch = searchQuery.trim();
      if (selectedBrand) {
        finalSearch = finalSearch ? `${finalSearch} ${selectedBrand}` : selectedBrand;
      }
      if (finalSearch) params.search = finalSearch;

      if (selectedCategory) params.category_slug = selectedCategory;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;

      const data = await getPosts(params);
      setProducts(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedBrand, ordering, minPrice, maxPrice, currentPage]);

  const showToast = (title, message, type = 'cart') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    showToast(product.title, 'Добавлен в корзину', 'cart');
  };

  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    alert('Заказ успешно сформирован! В реальном проекте здесь будет интеграция с платежной системой.');
    setCart([]);
    setIsCartOpen(false);
  };

  // Favorites toggle
  const handleToggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(product.title, 'Удален из избранного', 'favorite');
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(product.title, 'Добавлен в избранное', 'favorite');
      return [...prev, product];
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setOrdering('-created');
    setMinPrice('');
    setMaxPrice('');
    setShowOnlyFavorites(false);
    setCurrentPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    showToast('Выход', 'Вы вышли из аккаунта', 'favorite');
  };

  const displayedProducts = showOnlyFavorites ? favorites : products;
  const totalPages = Math.ceil((showOnlyFavorites ? favorites.length : totalCount) / 12) || 1;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        cartCount={cart.reduce((sum, i) => sum + i.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenCreatePost={() => {
          if (!user) {
            setIsAuthOpen(true);
          } else {
            setIsCreateOpen(true);
          }
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Promotional Banner */}
        {!showOnlyFavorites && (
          <HeroBanner
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              setCurrentPage(1);
            }}
          />
        )}

        {/* Trust & Guarantees Badges */}
        <TrustBadges />

        {/* Category Carousel */}
        <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <CategoryChips
            categories={categories}
            selectedSlug={selectedCategory}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              setShowOnlyFavorites(false);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Brand quick selection */}
        <div className="bg-white dark:bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
          <BrandFilter
            selectedBrand={selectedBrand}
            onSelectBrand={(brand) => {
              setSelectedBrand(brand);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
          
          {/* Price Range */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
              Цена (сом):
            </span>
            <input
              type="number"
              placeholder="от"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="w-24 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 outline-none font-bold"
            />
            <span className="text-slate-400 dark:text-slate-600">—</span>
            <input
              type="number"
              placeholder="до"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
              className="w-24 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 outline-none font-bold"
            />

            {(minPrice || maxPrice || selectedCategory || selectedBrand || searchQuery || showOnlyFavorites) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-bold px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition ml-2 border border-rose-100 dark:border-rose-900/40"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Сброс</span>
              </button>
            )}
          </div>

          {/* Results Count & Ordering */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {showOnlyFavorites ? 'В избранном' : 'Найдено'}: <strong className="text-slate-900 dark:text-white font-black">{showOnlyFavorites ? favorites.length : totalCount}</strong>
            </span>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-500" />
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="-created">Сначала новинки</option>
                <option value="price">Сначала дешевые</option>
                <option value="-price">Сначала дорогие</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {loading && !showOnlyFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-88 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/60 animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="bg-slate-100 dark:bg-slate-700/60 h-48 rounded-2xl" />
                <div className="space-y-2 mt-4">
                  <div className="bg-slate-100 dark:bg-slate-700/60 h-4 rounded w-3/4" />
                  <div className="bg-slate-100 dark:bg-slate-700/60 h-4 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Товары не найдены</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
              {showOnlyFavorites
                ? 'Вы пока не добавили ни одного товара в избранное.'
                : 'Попробуйте изменить поисковый запрос, категорию или очистить фильтр цен.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20"
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayedProducts.map((product) => {
              const inCart = cart.some((item) => item.product.id === product.id);
              const isFav = favorites.some((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setActiveProduct(p)}
                  onAddToCart={handleAddToCart}
                  isInCart={inCart}
                  isFavorite={isFav}
                  onToggleFavorite={handleToggleFavorite}
                  onQuickBuy={(p) => setQuickBuyProduct(p)}
                />
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !showOnlyFavorites && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
              Страница {currentPage} из {totalPages}
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h5 className="font-black text-slate-900 dark:text-white text-sm">Marketplace DRF</h5>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Удобный онлайн-маркетплейс электроники и цифровой техники с реальным каталогом и ценами в сомах.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Покупателям</h5>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Как оформить заказ</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Условия рассрочки 0-0-12</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Доставка по Кыргызстану</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Гарантия и возврат</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Категории</h5>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Смартфоны Apple & Samsung</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Ноутбуки для работы и игр</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Беспроводные наушники</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Планшеты и смарт-часы</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Служба заботы</h5>
              <p className="text-blue-600 dark:text-blue-400 font-black text-base mb-1">+996 (555) 123-456</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">Кыргызстан, г. Бишкек</p>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800/60">
                Ежедневно с 09:00 до 21:00
              </span>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-medium gap-2">
            <div>
              © 2026 Marketplace DRF. Сделано с душой на Django REST Framework + React.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">Политика конфиденциальности</span>
              <span>•</span>
              <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">Публичная оферта</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Popups */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={activeProduct ? cart.some((i) => i.product.id === activeProduct.id) : false}
        onQuickBuy={(p) => {
          setActiveProduct(null);
          setQuickBuyProduct(p);
        }}
      />

      <QuickBuyModal
        product={quickBuyProduct}
        isOpen={Boolean(quickBuyProduct)}
        onClose={() => setQuickBuyProduct(null)}
        onSuccess={(msg) => showToast('Экспресс-заказ', msg, 'cart')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => {
          setUser(userData);
          showToast('Успешный вход', `Добро пожаловать, ${userData.username}!`, 'cart');
        }}
      />

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        categories={categories}
        onPostCreated={(newPost) => {
          setProducts((prev) => [newPost, ...prev]);
          setTotalCount((c) => c + 1);
          showToast('Объявление опубликовано', newPost.title, 'cart');
        }}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
