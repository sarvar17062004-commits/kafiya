import React, { useState } from 'react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DetailModalProps {
  product: Product | null;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  translations: any;
}

export default function DetailModal({
  product,
  onClose,
  favorites,
  onToggleFavorite,
  onAddToCart,
  translations
}: DetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFav = favorites.includes(product.id);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // reset
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-surface-white rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl border border-surface-container-high relative z-10 flex flex-col max-h-[90vh]"
        >
          {/* Cover Area with Close and Fav buttons */}
          <div className="h-56 md:h-64 bg-surface-container-low relative overflow-hidden flex-shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Top Bar Actions */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-surface-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                  isFav ? 'text-error' : 'text-text-muted hover:text-error'
                }`}
                aria-label="Favorite"
              >
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: `"FILL" ${isFav ? 1 : 0}` }}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Bottom-left Category Tag inside image */}
            <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider text-[#fae0a5] bg-[#6f5c2e]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#ddc48c]/30">
              {translations[product.category] || product.categoryLabel}
            </span>
          </div>

          {/* Scrollable details info */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            <div className="space-y-1">
              <h3 className="font-headline-lg text-headline-lg font-bold text-on-background tracking-tight">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-text-muted">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>
                      star
                    </span>
                    <span className="font-semibold text-on-background">{product.rating}</span>
                    <span>({translations.rating})</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-center gap-1 border-l border-surface-variant/40 pl-4">
                    <span className="material-symbols-outlined text-[16px]">scale</span>
                    <span className="font-medium text-on-background">{product.weight}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price section */}
            <div className="bg-primary-container/10 border border-primary/10 rounded-2xl p-4 flex justify-between items-center">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Mahsulot narxi</span>
              <span className="text-2xl font-bold text-primary font-headline-lg">
                {(product.price).toLocaleString()} so'm
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tavsif</h4>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients Chips List */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {translations.ingredients}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-on-secondary-container bg-secondary-container/50 px-3 py-1 rounded-full border border-[#cfc5b6]/30"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal bottom actions */}
          <div className="p-6 border-t border-surface-variant/40 flex items-center justify-between gap-4 bg-surface-container-low flex-shrink-0">
            {/* Quantity Controller */}
            <div className="flex items-center bg-surface-white rounded-2xl p-1 border border-surface-variant/50 shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
                aria-label="Decrease"
              >
                <span className="material-symbols-outlined text-lg font-bold">remove</span>
              </button>
              <span className="w-10 text-center font-bold text-on-background text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
                aria-label="Increase"
              >
                <span className="material-symbols-outlined text-lg font-bold">add</span>
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-2xl font-bold hover:opacity-95 transition-opacity shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
              <span>{translations.add} • {(product.price * quantity).toLocaleString()} so'm</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
