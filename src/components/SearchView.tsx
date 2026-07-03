import React, { useState } from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface SearchViewProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  translations: any;
}

export default function SearchView({
  products,
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  translations
}: SearchViewProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() === '' 
    ? [] 
    : products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.categoryLabel.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-md z-[100] overflow-y-auto px-container-margin py-6"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Search Input Area */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              autoFocus
              placeholder={translations.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-surface-white border border-surface-variant rounded-2xl font-body-lg text-body-lg focus:outline-none focus:border-primary transition-all shadow-md"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-2xl">
              search
            </span>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-background cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant font-label-lg text-label-lg rounded-2xl font-bold cursor-pointer"
          >
            {translations.close}
          </button>
        </div>

        {/* Results list */}
        <div className="space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-20 text-text-muted">
              <span className="material-symbols-outlined text-5xl mb-3 text-text-muted/40">
                manage_search
              </span>
              <p className="font-body-lg text-sm">
                Xohlagan shirinligingizni (shokolad, napoleon, meva va b.) qidirib ko'ring...
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-label-lg text-label-lg text-text-muted uppercase tracking-wider pl-1">
                Qidiruv natijalari ({results.length})
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 bg-surface-white border border-surface-container rounded-2xl hover:shadow-sm transition-all items-center cursor-pointer"
                    onClick={() => { onSelectProduct(product); onClose(); }}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-text-muted uppercase font-semibold">
                        {product.categoryLabel}
                      </span>
                      <h4 className="font-body-md text-body-md font-semibold text-on-background truncate">
                        {product.name}
                      </h4>
                      <p className="font-label-lg text-label-lg text-primary font-bold">
                        {product.price.toLocaleString()} so'm
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer shadow-sm active:scale-90"
                      aria-label="Add to cart"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-text-muted bg-surface-white border border-dashed border-surface-variant/40 rounded-3xl p-6">
              <span className="material-symbols-outlined text-5xl mb-3 text-text-muted/40">
                sentiment_dissatisfied
              </span>
              <p className="font-body-lg text-sm">
                Afsuski, qidiruvingiz bo'yicha hech qanday shirinlik topilmadi.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
