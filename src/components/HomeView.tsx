import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  key?: string;
  products: Product[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToCategory: (categoryId: string) => void;
  translations: any;
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80'
];

export default function HomeView({
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  onNavigateToCategory,
  translations
}: HomeViewProps) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-slide hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-section-gap"
    >
      {/* Hero Reference & Display Carousel */}
      <section className="w-full rounded-3xl overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-64 md:h-96">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentHeroIndex}
            src={HERO_IMAGES[currentHeroIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Safia Bakery Display"
          />
        </AnimatePresence>
        
        {/* Transparent dark gradient for premium contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        
        <div className="absolute bottom-6 left-6 text-surface-white z-10 max-w-lg">
          <h1 className="font-display-lg text-[28px] md:text-display-lg font-bold leading-tight tracking-tight mb-2 drop-shadow-md">
            {translations.title}
          </h1>
          <p className="text-surface-bright/90 font-body-lg text-sm md:text-body-lg drop-shadow">
            {translations.aboutUsText1}
          </p>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 right-6 flex gap-1.5 z-10">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentHeroIndex ? 'bg-surface-white w-6' : 'bg-surface-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Promo Info Card */}
      <section className="w-full bg-primary-container rounded-3xl overflow-hidden relative shadow-lg h-44 md:h-52 flex items-center justify-center p-6 text-center">
        <div className="z-10 relative max-w-2xl px-4">
          <span className="font-label-sm text-label-sm bg-primary/20 text-on-primary-fixed-variant px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block font-semibold">
            {translations.promotions}
          </span>
          <h2 className="font-headline-lg text-lg md:text-headline-lg text-on-primary-container font-semibold leading-snug drop-shadow-sm">
            {translations.skillboxOffer}
          </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
      </section>

      {/* Katalog Categories Carousel */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
            {translations.categories}
          </h2>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar gap-5 pb-4 -mx-1 px-1">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onNavigateToCategory(category.id)}
              className="flex flex-col items-center gap-2.5 min-w-[90px] focus:outline-none cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-full bg-surface-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex-shrink-0 border border-transparent group-hover:border-primary/40 transition-all duration-300 transform group-hover:scale-105">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={category.image} 
                  alt={category.alt} 
                />
              </div>
              <span className="font-label-sm text-label-sm text-center text-on-surface-variant font-medium group-hover:text-primary transition-colors line-clamp-1">
                {translations[category.id] || category.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Yangiliklar (New Arrivals / Products List) */}
      <section className="pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
            {translations.news}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div 
                key={product.id}
                className="bg-surface-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col relative group border border-surface-container-low"
              >
                {/* Product Image & Fav button */}
                <div className="h-36 bg-surface-container-low relative overflow-hidden">
                  <img 
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" 
                    src={product.image} 
                    alt={product.alt} 
                  />
                  
                  <button 
                    onClick={() => onToggleFavorite(product.id)}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-white/90 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer ${
                      isFav ? 'text-error' : 'text-text-muted hover:text-error'
                    }`}
                    aria-label="Add to favorites"
                  >
                    <span 
                      className="material-symbols-outlined text-[18px]" 
                      style={{ fontVariationSettings: `"FILL" ${isFav ? 1 : 0}` }}
                    >
                      favorite
                    </span>
                  </button>

                  {product.weight && (
                    <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-surface-white px-2 py-0.5 rounded-full font-medium">
                      {product.weight}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3.5 flex flex-col flex-1">
                  <span className="text-[10px] text-text-muted uppercase font-semibold mb-1">
                    {translations[product.category] || product.categoryLabel}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-body-md text-body-md line-clamp-2 mb-2 font-medium text-on-background hover:text-primary transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-2 flex justify-between items-center border-t border-surface-container-lowest">
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      {product.price.toLocaleString()} so'm
                    </span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer shadow-sm active:scale-90"
                      aria-label="Add to cart"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
