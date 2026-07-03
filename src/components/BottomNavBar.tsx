import React from 'react';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  translations: any;
}

export default function BottomNavBar({ activeTab, onTabChange, cartCount, translations }: BottomNavBarProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-4 bg-surface-white shadow-[0_-4px_20px_rgba(0,0,0,0.04)] rounded-t-lg md:hidden"
    >
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-150 cursor-pointer ${
          activeTab === 'home' 
            ? 'text-primary font-semibold scale-95' 
            : 'text-text-muted hover:bg-surface-container-low'
        }`}
      >
        <span 
          className="material-symbols-outlined" 
          style={{ fontVariationSettings: `"FILL" ${activeTab === 'home' ? 1 : 0}` }}
        >
          home
        </span>
        <span className="font-label-sm text-label-sm mt-1">
          {translations.home}
        </span>
      </button>

      <button 
        onClick={() => onTabChange('catalog')}
        className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-150 cursor-pointer ${
          activeTab === 'catalog' 
            ? 'text-primary font-semibold scale-95' 
            : 'text-text-muted hover:bg-surface-container-low'
        }`}
      >
        <span 
          className="material-symbols-outlined"
          style={{ fontVariationSettings: `"FILL" ${activeTab === 'catalog' ? 1 : 0}` }}
        >
          grid_view
        </span>
        <span className="font-label-sm text-label-sm mt-1">
          {translations.categories}
        </span>
      </button>

      <button 
        onClick={() => onTabChange('cart')}
        className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-150 cursor-pointer relative ${
          activeTab === 'cart' 
            ? 'text-primary font-semibold scale-95' 
            : 'text-text-muted hover:bg-surface-container-low'
        }`}
      >
        <span 
          className="material-symbols-outlined"
          style={{ fontVariationSettings: `"FILL" ${activeTab === 'cart' ? 1 : 0}` }}
        >
          shopping_bag
        </span>
        {cartCount > 0 && (
          <span className="absolute top-2 right-2 min-w-5 h-5 px-1 bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
        <span className="font-label-sm text-label-sm mt-1">
          {translations.cart}
        </span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-150 cursor-pointer ${
          activeTab === 'profile' 
            ? 'text-primary font-semibold scale-95' 
            : 'text-text-muted hover:bg-surface-container-low'
        }`}
      >
        <span 
          className="material-symbols-outlined"
          style={{ fontVariationSettings: `"FILL" ${activeTab === 'profile' ? 1 : 0}` }}
        >
          person
        </span>
        <span className="font-label-sm text-label-sm mt-1">
          {translations.profile}
        </span>
      </button>
    </nav>
  );
}
