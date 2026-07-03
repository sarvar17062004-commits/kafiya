import React, { useState, useEffect } from 'react';
import TopAppBar from './components/TopAppBar';
import NavigationDrawer from './components/NavigationDrawer';
import BottomNavBar from './components/BottomNavBar';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import CartView from './components/CartView';
import ProfileView from './components/ProfileView';
import SearchView from './components/SearchView';
import DetailModal from './components/DetailModal';
import DrawerPages from './components/DrawerPages';
import { Product, CartItem, Order } from './types';
import { PRODUCTS, TRANSLATIONS } from './data';
import { AnimatePresence } from 'motion/react';

export default function App() {
  // --- LANGUAGE STATE ---
  const [lang, setLang] = useState<'uz' | 'ru' | 'en'>(() => {
    const saved = localStorage.getItem('safia_lang');
    return (saved === 'uz' || saved === 'ru' || saved === 'en') ? saved : 'uz';
  });

  useEffect(() => {
    localStorage.setItem('safia_lang', lang);
  }, [lang]);

  const dict = TRANSLATIONS[lang];

  // --- NAVIGATION STATE ---
  const [activeView, setActiveView] = useState<string>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // --- CATALOG FILTER STATE ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // --- CART STATE ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('safia_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('safia_cart', JSON.stringify(cart));
  }, [cart]);

  // --- FAVORITES STATE ---
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('safia_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('safia_favs', JSON.stringify(favorites));
  }, [favorites]);

  // --- ORDER HISTORY STATE ---
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('safia_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('safia_orders', JSON.stringify(orders));
  }, [orders]);

  // --- SELECTED PRODUCT DETAIL STATE ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- HELPER FUNCTIONS ---
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddOrder = (
    items: CartItem[], 
    total: number, 
    fullname: string, 
    address: string, 
    phone: string, 
    paymentMethod: string
  ) => {
    const newOrder: Order = {
      id: `SF-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toLocaleDateString('uz-UZ'),
      items,
      total,
      status: 'Tayyorlanmoqda',
      paymentMethod,
      deliveryAddress: address
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleNavigateToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('catalog');
  };

  // Convert favorites IDs back to Product array for the Profile tab
  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  // Determine App Bar Title dynamically
  const getHeaderTitle = () => {
    switch (activeView) {
      case 'home': return dict.title;
      case 'catalog': return dict.categories;
      case 'cart': return dict.cart;
      case 'profile': return dict.profile;
      case 'about': return dict.aboutUs;
      case 'stores': return dict.stores;
      case 'careers': return dict.vacancies;
      case 'contacts': return dict.contacts;
      default: return dict.title;
    }
  };

  // Check if current view is a subpage from the drawer
  const isDrawerSubpage = ['about', 'stores', 'careers', 'contacts'].includes(activeView);

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 font-sans selection:bg-primary/20 antialiased relative">
      
      {/* TopAppBar */}
      <TopAppBar 
        title={getHeaderTitle()}
        onMenuClick={isDrawerSubpage ? () => setActiveView('home') : () => setDrawerOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Dynamic Back-Arrow button override for Drawer pages on Mobile */}
      {isDrawerSubpage && (
        <button 
          onClick={() => setActiveView('home')}
          className="fixed top-3 left-4 z-[51] w-10 h-10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity rounded-full cursor-pointer md:hidden bg-surface-white shadow-sm"
          aria-label="Back to home"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
      )}

      {/* NavigationDrawer */}
      <NavigationDrawer 
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(view) => setActiveView(view)}
        currentLang={lang}
        onLangChange={(newLang) => setLang(newLang)}
        translations={dict}
      />

      {/* Desktop Inline Header Navigation links */}
      <div className="hidden md:flex fixed top-0 right-16 h-16 items-center z-50 gap-6 font-semibold text-xs text-text-muted">
        <button 
          onClick={() => setActiveView('home')} 
          className={`hover:text-primary transition-all cursor-pointer py-1 border-b-2 ${activeView === 'home' ? 'text-primary border-primary font-bold' : 'border-transparent'}`}
        >
          {dict.home}
        </button>
        <button 
          onClick={() => { setSelectedCategory('all'); setActiveView('catalog'); }} 
          className={`hover:text-primary transition-all cursor-pointer py-1 border-b-2 ${activeView === 'catalog' ? 'text-primary border-primary font-bold' : 'border-transparent'}`}
        >
          {dict.categories}
        </button>
        <button 
          onClick={() => setActiveView('cart')} 
          className={`hover:text-primary transition-all cursor-pointer py-1 border-b-2 relative ${activeView === 'cart' ? 'text-primary border-primary font-bold' : 'border-transparent'}`}
        >
          {dict.cart}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-error text-on-error text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-extrabold shadow-sm animate-pulse">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveView('profile')} 
          className={`hover:text-primary transition-all cursor-pointer py-1 border-b-2 ${activeView === 'profile' ? 'text-primary border-primary font-bold' : 'border-transparent'}`}
        >
          {dict.profile}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="pt-24 px-container-margin md:px-8 max-w-7xl mx-auto min-h-[calc(100vh-176px)]">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <HomeView 
              key="home-view"
              products={PRODUCTS}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onSelectProduct={setSelectedProduct}
              onNavigateToCategory={handleNavigateToCategory}
              translations={dict}
            />
          )}

          {activeView === 'catalog' && (
            <CatalogView 
              key="catalog-view"
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onSelectProduct={setSelectedProduct}
              translations={dict}
            />
          )}

          {activeView === 'cart' && (
            <CartView 
              key="cart-view"
              cart={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
              onAddOrder={handleAddOrder}
              translations={dict}
            />
          )}

          {activeView === 'profile' && (
            <ProfileView 
              key="profile-view"
              favorites={favoriteProducts}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onSelectProduct={setSelectedProduct}
              orderHistory={orders}
              currentLang={lang}
              onLangChange={setLang}
              translations={dict}
            />
          )}

          {isDrawerSubpage && (
            <DrawerPages 
              key="drawer-page-view"
              view={activeView as 'about' | 'stores' | 'careers' | 'contacts'}
              translations={dict}
            />
          )}
        </AnimatePresence>
      </main>

      {/* BottomNavBar */}
      <BottomNavBar 
        activeTab={['home', 'catalog', 'cart', 'profile'].includes(activeView) ? activeView : 'home'}
        onTabChange={(tab) => setActiveView(tab)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        translations={dict}
      />

      {/* Global Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <DetailModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            translations={dict}
          />
        )}
      </AnimatePresence>

      {/* Search Overlay overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchView 
            products={PRODUCTS}
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            translations={dict}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
