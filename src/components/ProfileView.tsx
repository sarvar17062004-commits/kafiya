import React, { useState } from 'react';
import { Product, Order } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileViewProps {
  key?: string;
  favorites: Product[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  orderHistory: Order[];
  currentLang: 'uz' | 'ru' | 'en';
  onLangChange: (lang: 'uz' | 'ru' | 'en') => void;
  translations: any;
}

export default function ProfileView({
  favorites,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  orderHistory,
  currentLang,
  onLangChange,
  translations
}: ProfileViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'loyalty' | 'orders' | 'favorites'>('loyalty');

  // User Profile details
  const [profileName, setProfileName] = useState('Sarvarbek Olimov');
  const [profilePhone, setProfilePhone] = useState('+998 90 123-45-67');
  const [profileAddress, setProfileAddress] = useState('Yunusobod 12-kvartal, 5-uy');
  const [isEditing, setIsEditing] = useState(false);

  // Loyalty rewards calculations
  const loyaltyPoints = orderHistory.reduce((sum, order) => sum + Math.floor(order.total * 0.05), 450); // Base points + 5% cashback on orders

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto space-y-8 pb-12"
    >
      {/* Profile Info Row */}
      <div className="bg-surface-white rounded-3xl p-6 border border-surface-container-low shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col md:flex-row gap-6 items-center">
        <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container text-2xl font-bold border-2 border-primary/20">
          {profileName.substring(0, 1)}
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          {!isEditing ? (
            <>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
                {profileName}
              </h2>
              <p className="text-text-muted font-body-md text-sm">{profilePhone}</p>
              <p className="text-text-muted font-body-md text-xs">{profileAddress}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-primary hover:underline font-semibold text-xs flex items-center justify-center md:justify-start gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Tahrirlash
              </button>
            </>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3 w-full">
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full max-w-md px-3 py-1.5 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-sm focus:outline-none focus:border-primary"
                placeholder="Ismingiz"
                required
              />
              <input
                type="text"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full max-w-md px-3 py-1.5 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-sm focus:outline-none focus:border-primary"
                placeholder="Telefon"
                required
              />
              <input
                type="text"
                value={profileAddress}
                onChange={(e) => setProfileAddress(e.target.value)}
                className="w-full max-w-md px-3 py-1.5 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-sm focus:outline-none focus:border-primary"
                placeholder="Manzilingiz"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-on-primary rounded-xl font-bold text-xs cursor-pointer hover:opacity-90"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-xl font-bold text-xs cursor-pointer hover:bg-surface-container-high"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Desktop Quick Language Selector */}
        <div className="hidden md:flex flex-col gap-2 p-3 bg-surface-container-low rounded-2xl border border-surface-variant/30">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider text-center">Tilni tanlang</span>
          <div className="flex gap-1.5">
            {(['uz', 'ru', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLangChange(lang)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  currentLang === lang
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-white text-text-muted hover:bg-surface-container border border-surface-container-high'
                }`}
              >
                {lang === 'uz' ? 'O\'zb' : lang === 'ru' ? 'Рус' : 'Eng'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-surface-variant/40 pb-0.5 gap-2">
        <button
          onClick={() => setActiveSubTab('loyalty')}
          className={`flex-1 py-3 font-semibold text-sm border-b-2 text-center transition-all cursor-pointer ${
            activeSubTab === 'loyalty'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-text-muted hover:text-on-background'
          }`}
        >
          {translations.cashback.split(' — ')[1] || 'Sodiqlik kartasi'}
        </button>
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex-1 py-3 font-semibold text-sm border-b-2 text-center transition-all cursor-pointer ${
            activeSubTab === 'orders'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-text-muted hover:text-on-background'
          }`}
        >
          {translations.orderHistory} ({orderHistory.length})
        </button>
        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`flex-1 py-3 font-semibold text-sm border-b-2 text-center transition-all cursor-pointer ${
            activeSubTab === 'favorites'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-text-muted hover:text-on-background'
          }`}
        >
          Sevimlilar ({favorites.length})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[250px]">
        <AnimatePresence mode="wait">
          {activeSubTab === 'loyalty' && (
            <motion.div
              key="loyalty-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Golden Reward Loyalty Card */}
              <div className="w-full max-w-md mx-auto aspect-[1.586/1] bg-gradient-to-tr from-primary via-[#968352] to-[#b39e6a] text-surface-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between border border-surface-white/10">
                {/* Visual decorative ring backgrounds */}
                <div className="absolute -top-12 -right-12 w-48 h-48 border-[20px] border-surface-white/5 rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 border-[12px] border-surface-white/5 rounded-full" />

                <div className="flex justify-between items-start z-10">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold opacity-80">
                      Safia Club Card
                    </h4>
                    <p className="text-xl font-bold font-display-lg mt-1 tracking-tight">
                      {translations.cashback.split(' — ')[0]}
                    </p>
                  </div>
                  {/* Card Microchip representation */}
                  <div className="w-10 h-7 bg-amber-200/90 rounded-md shadow-inner flex items-center justify-center border border-amber-300">
                    <span className="material-symbols-outlined text-amber-900 text-sm">nest_detector_co_monoxide</span>
                  </div>
                </div>

                {/* QR Code and Points summary */}
                <div className="flex justify-between items-end z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] text-surface-bright/80 font-semibold uppercase tracking-wider">
                      {translations.points}
                    </span>
                    <p className="text-3xl font-bold tracking-tight">
                      {loyaltyPoints.toLocaleString()}{' '}
                      <span className="text-base font-medium text-amber-200">ball</span>
                    </p>
                    <p className="text-xs text-surface-bright/70 font-mono tracking-widest mt-2">
                      4589 1234 5678 9012
                    </p>
                  </div>

                  {/* Dynamic QR Code representation */}
                  <div className="bg-surface-white p-2.5 rounded-2xl shadow-md border border-[#968352]/20 flex flex-col items-center">
                    <div className="w-20 h-20 bg-surface-white flex flex-wrap items-center justify-center relative">
                      {/* Grid representation of QR */}
                      <div className="grid grid-cols-4 gap-1.5 w-full h-full opacity-90 p-0.5">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-sm ${
                              (i % 3 === 0 || i % 5 === 0 || i === 0 || i === 15) && i !== 6
                                ? 'bg-primary'
                                : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="material-symbols-outlined text-[12px] text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-white p-0.5 rounded-full font-bold">
                        qr_code_2
                      </span>
                    </div>
                    <span className="text-[8px] text-primary uppercase tracking-widest font-extrabold mt-1.5">
                      PAY CODES
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions on cashback usage */}
              <div className="bg-primary-container/20 border border-primary/20 rounded-2xl p-4 flex gap-3 max-w-md mx-auto items-start">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">volunteer_activism</span>
                <div className="text-xs text-on-primary-fixed-variant space-y-1">
                  <p className="font-bold">Qanday foydalaniladi?</p>
                  <p className="text-text-muted leading-relaxed">
                    Kassada shirinlik sotib olayotganda QR kodni kassa xodimiga ko'rsating. Har bir xaridingizdan 5% ball ko'rinishida qaytib keladi (1 ball = 1 so'm). To'plangan ballar bilan shirinliklar uchun to'lov qilsangiz bo'ladi!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'orders' && (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="bg-surface-white border border-surface-container rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-surface-variant/40 pb-2 text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">receipt_long</span>
                        <span className="text-on-background font-bold">ID: {order.id}</span>
                      </div>
                      <span className="text-text-muted font-normal text-xs">{order.date}</span>
                    </div>

                    {/* Order items */}
                    <div className="space-y-1 text-xs text-text-muted">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span>
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>{(item.product.price * item.quantity).toLocaleString()} so'm</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-surface-variant/30 text-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-xs text-emerald-600 uppercase tracking-wide">
                          {order.status}
                        </span>
                      </div>
                      <span className="font-bold text-primary">
                        {order.total.toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-surface-white border border-dashed border-surface-variant/30 rounded-2xl">
                  <span className="material-symbols-outlined text-4xl text-text-muted/60 mb-2">
                    assignment_late
                  </span>
                  <p className="text-text-muted text-xs font-semibold">Sizda hali buyurtmalar mavjud emas</p>
                </div>
              )}
            </motion.div>
          )}

          {activeSubTab === 'favorites' && (
            <motion.div
              key="favorites-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {favorites.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {favorites.map((product) => (
                    <div
                      key={product.id}
                      className="bg-surface-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden flex flex-col relative group border border-surface-container-low"
                    >
                      <div className="h-32 bg-surface-container-low relative">
                        <img
                          onClick={() => onSelectProduct(product)}
                          className="w-full h-full object-cover cursor-pointer"
                          src={product.image}
                          alt={product.name}
                        />
                        <button
                          onClick={() => onToggleFavorite(product.id)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-white/90 backdrop-blur-sm flex items-center justify-center text-error cursor-pointer shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </button>
                      </div>

                      <div className="p-3 flex flex-col flex-1">
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="font-body-md text-body-md font-medium line-clamp-1 mb-2 hover:text-primary transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h3>
                        <div className="mt-auto flex justify-between items-center pt-2 border-t border-surface-container-lowest">
                          <span className="font-label-lg text-label-lg text-primary font-bold">
                            {product.price.toLocaleString()} so'm
                          </span>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm font-bold">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-surface-white border border-dashed border-surface-variant/30 rounded-2xl">
                  <span className="material-symbols-outlined text-4xl text-text-muted/60 mb-2">
                    heart_broken
                  </span>
                  <p className="text-text-muted text-xs font-semibold">Sizga yoqqan mahsulotlar hali yo'q</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
