import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data';
import { motion } from 'motion/react';

interface CatalogViewProps {
  key?: string;
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  translations: any;
}

export default function CatalogView({
  products,
  selectedCategory,
  onSelectCategory,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  translations
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on selected category & search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
          {translations.categories}
        </h2>

        {/* Local Search inside Catalog */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder={translations.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-11 bg-surface-white border border-surface-variant/60 rounded-xl font-body-md text-body-md focus:outline-none focus:border-primary transition-all shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-background"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Category Chips scrollable list */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-1 px-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full font-label-lg text-label-lg font-semibold transition-all duration-150 cursor-pointer flex-shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-white text-text-muted hover:bg-surface-container border border-surface-container-high'
            }`}
          >
            {translations.all}
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-4 py-2 rounded-full font-label-lg text-label-lg font-semibold transition-all duration-150 cursor-pointer flex-shrink-0 ${
                selectedCategory === category.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-white text-text-muted hover:bg-surface-container border border-surface-container-high'
              }`}
            >
              {translations[category.id] || category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid view of products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <motion.div
                layout
                key={product.id}
                className="bg-surface-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col relative group border border-surface-container-low hover:shadow-md transition-all duration-300"
              >
                {/* Image and actions */}
                <div className="h-40 bg-surface-container-low relative overflow-hidden">
                  <img
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    src={product.image}
                    alt={product.alt}
                  />

                  {/* Favorite button */}
                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-white/95 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer shadow-sm ${
                      isFav ? 'text-error' : 'text-text-muted hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: `"FILL" ${isFav ? 1 : 0}` }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Weight tag */}
                  {product.weight && (
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] bg-black/60 text-surface-white px-2.5 py-0.5 rounded-full font-medium">
                      {product.weight}
                    </span>
                  )}
                </div>

                {/* Info and price */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] text-text-muted uppercase font-semibold mb-1">
                    {translations[product.category] || product.categoryLabel}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-body-md text-body-md font-medium text-on-background hover:text-primary transition-colors cursor-pointer line-clamp-2 mb-2"
                  >
                    {product.name}
                  </h3>

                  {/* Star Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>
                        star
                      </span>
                      <span className="text-xs font-semibold text-on-background">
                        {product.rating}
                      </span>
                    </div>
                  )}

                  <div className="mt-auto pt-2 flex justify-between items-center border-t border-surface-container-lowest">
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      {product.price.toLocaleString()} so'm
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer shadow-sm active:scale-90"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface-white rounded-2xl border border-dashed border-surface-variant/40 p-6">
          <span className="material-symbols-outlined text-5xl text-text-muted/60 mb-3">
            search_off
          </span>
          <p className="text-text-muted font-body-lg">
            Mahsulotlar topilmadi
          </p>
        </div>
      )}
    </motion.div>
  );
}
