import React, { useState } from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartViewProps {
  key?: string;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddOrder: (items: CartItem[], total: number, fullname: string, address: string, phone: string, paymentMethod: string) => void;
  translations: any;
}

export default function CartView({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddOrder,
  translations
}: CartViewProps) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form Fields
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Naqd pul'); // or Plastic karta
  const [formError, setFormError] = useState('');

  // Cart Subtotal Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 50000 ? 0 : 15000;
  const total = subtotal + deliveryFee;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('+998 ')) {
      setPhone(value);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || phone.length < 13 || !address.trim()) {
      setFormError('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring!');
      return;
    }
    setFormError('');
    onAddOrder(cart, total, fullname, address, phone, paymentMethod);
    setOrderPlaced(true);
  };

  const resetCartFlow = () => {
    onClearCart();
    setOrderPlaced(false);
    setIsCheckout(false);
    setFullname('');
    setPhone('+998 ');
    setAddress('');
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-12 px-6 bg-surface-white rounded-3xl shadow-lg border border-surface-container-low"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-6 animate-pulse">
          <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background font-bold mb-3">
          {translations.orderSuccess}
        </h2>
        <p className="text-text-muted font-body-lg text-sm md:text-body-lg mb-8">
          {translations.orderSub}
        </p>

        {/* Mock receipt details */}
        <div className="bg-surface-container-low rounded-2xl p-4 text-left mb-8 text-sm">
          <div className="flex justify-between border-b border-surface-variant/40 pb-2 mb-2 font-semibold">
            <span>Buyurtma tafsilotlari</span>
            <span className="text-primary">#SF-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <div className="space-y-1 text-text-muted">
            <p><strong>Mijoz:</strong> {fullname}</p>
            <p><strong>Telefon:</strong> {phone}</p>
            <p><strong>Manzil:</strong> {address}</p>
            <p><strong>To'lov turi:</strong> {paymentMethod}</p>
            <p className="border-t border-surface-variant/40 pt-2 mt-2 font-bold text-on-background flex justify-between text-base">
              <span>Jami summa:</span>
              <span className="text-primary">{total.toLocaleString()} so\'m</span>
            </p>
          </div>
        </div>

        <button
          onClick={resetCartFlow}
          className="w-full py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-2xl font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-sm active:scale-95"
        >
          {translations.close}
        </button>
      </motion.div>
    );
  }

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 max-w-md mx-auto bg-surface-white rounded-3xl p-8 border border-dashed border-surface-variant/40"
      >
        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-text-muted mb-4">
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
        </div>
        <p className="text-text-muted font-body-lg mb-6 leading-relaxed">
          {translations.emptyCart}
        </p>
        <button
          onClick={() => {}}
          className="hidden w-full py-3 bg-primary text-on-primary font-semibold rounded-2xl"
        >
          Do'konga o'tish
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12"
    >
      {/* Cart Items list */}
      <div className={`md:col-span-7 space-y-4 ${isCheckout ? 'hidden md:block' : 'block'}`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
            {translations.cart}
          </h2>
          <button
            onClick={onClearCart}
            className="text-error font-label-lg text-label-lg font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">delete_sweep</span>
            Tozalash
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 p-3.5 bg-surface-white rounded-2xl border border-surface-container-low shadow-[0_4px_15px_rgba(0,0,0,0.01)]"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-body-md text-body-md font-semibold text-on-background line-clamp-1">
                      {item.product.name}
                    </h3>
                    <span className="text-xs text-text-muted">
                      {item.product.weight} • {(item.product.price).toLocaleString()} so'm
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      {(item.product.price * item.quantity).toLocaleString()} so'm
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-surface-container rounded-full p-0.5 border border-surface-variant/30">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-white hover:text-primary transition-colors cursor-pointer"
                        aria-label="Decrease"
                      >
                        <span className="material-symbols-outlined text-sm font-semibold">remove</span>
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-on-background">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-white hover:text-primary transition-colors cursor-pointer"
                        aria-label="Increase"
                      >
                        <span className="material-symbols-outlined text-sm font-semibold">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-text-muted hover:text-error self-start pt-1 cursor-pointer"
                  aria-label="Remove item"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Checkout and Receipt summary */}
      <div className="md:col-span-5">
        <div className="bg-surface-white rounded-3xl p-6 border border-surface-container-low shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-6">
          <h3 className="font-headline-md text-headline-md font-bold text-on-background border-b border-surface-variant/30 pb-3">
            {isCheckout ? translations.checkout : translations.total}
          </h3>

          {/* Subtotal Receipt */}
          <div className="space-y-3 font-body-md text-body-md text-text-muted">
            <div className="flex justify-between">
              <span>Mahsulotlar summasi</span>
              <span className="text-on-background font-medium">{subtotal.toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between">
              <span>Yetkazib berish</span>
              {deliveryFee === 0 ? (
                <span className="text-emerald-600 font-bold uppercase text-xs tracking-wider">Bepul</span>
              ) : (
                <span className="text-on-background font-medium">{deliveryFee.toLocaleString()} so'm</span>
              )}
            </div>
            {deliveryFee > 0 && (
              <p className="text-[10px] bg-primary-container/30 text-on-primary-fixed-variant p-2.5 rounded-xl">
                💡 <strong>Eslatma:</strong> 50 000 so'mdan ko'p xarid qilsangiz yetkazib berish bepul!
              </p>
            )}
            <div className="border-t border-surface-variant/30 pt-3 flex justify-between font-bold text-on-background text-lg">
              <span>{translations.total}</span>
              <span className="text-primary">{total.toLocaleString()} so'm</span>
            </div>
          </div>

          {/* Checkout form conditional flow */}
          {!isCheckout ? (
            <button
              onClick={() => setIsCheckout(true)}
              className="w-full py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-2xl font-bold hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{translations.checkout}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.fullname}</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sarvarbek Olimov"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-body-md focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.phone}</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-body-md focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.address}</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ko'cha, uy, kvartala va mo'ljal..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-body-md focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.payment}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Naqd pul')}
                    className={`p-3 rounded-xl border font-semibold text-xs flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'Naqd pul'
                        ? 'bg-primary-container/30 border-primary text-primary'
                        : 'bg-surface-container-low border-surface-variant/40 text-text-muted hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">payments</span>
                    Naqd pul (so'm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Karta')}
                    className={`p-3 rounded-xl border font-semibold text-xs flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'Karta'
                        ? 'bg-primary-container/30 border-primary text-primary'
                        : 'bg-surface-container-low border-surface-variant/40 text-text-muted hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">credit_card</span>
                    Sber/Humo/Uzcard
                  </button>
                </div>
              </div>

              {formError && (
                <p className="text-xs text-error font-medium bg-error/10 p-2.5 rounded-lg">
                  ⚠️ {formError}
                </p>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="w-1/3 py-3.5 bg-surface-container text-on-surface-variant font-label-lg text-label-lg rounded-2xl font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Orqaga
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-2xl font-bold hover:opacity-95 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  <span>{translations.submitOrder}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
