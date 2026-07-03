import React from 'react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  currentLang: 'uz' | 'ru' | 'en';
  onLangChange: (lang: 'uz' | 'ru' | 'en') => void;
  translations: any;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  onNavigate,
  currentLang,
  onLangChange,
  translations
}: NavigationDrawerProps) {
  // Toggle language cycle on click
  const cycleLanguage = () => {
    if (currentLang === 'uz') onLangChange('ru');
    else if (currentLang === 'ru') onLangChange('en');
    else onLangChange('uz');
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div 
        id="drawer-overlay"
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 block' : 'opacity-0 pointer-events-none hidden'
        }`}
      />

      {/* Drawer Container */}
      <nav 
        id="nav-drawer"
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col py-6 h-full w-80 rounded-r-lg bg-surface shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 pb-6 border-b border-surface-variant flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container text-xl font-bold">
              S
            </div>
            <div>
              <div className="text-primary font-headline-lg text-headline-lg font-semibold">
                {translations.title}
              </div>
              <div className="text-text-muted font-body-md text-body-md">
                {translations.subtitle}
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-text-muted"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
          <button 
            onClick={() => { onNavigate('stores'); onClose(); }}
            className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors mx-2 rounded-lg text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="font-label-lg text-label-lg font-medium">{translations.subtitle}</span>
          </button>

          <button 
            onClick={() => { onNavigate('about'); onClose(); }}
            className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors mx-2 rounded-lg text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">info</span>
            <span className="font-label-lg text-label-lg font-medium">{translations.aboutUs}</span>
          </button>

          <button 
            onClick={() => { onNavigate('stores'); onClose(); }}
            className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors mx-2 rounded-lg text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">store</span>
            <span className="font-label-lg text-label-lg font-medium">{translations.stores}</span>
          </button>

          <button 
            onClick={() => { onNavigate('home'); onClose(); }}
            className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors mx-2 rounded-lg text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">campaign</span>
            <span className="font-label-lg text-label-lg font-medium">{translations.promotions}</span>
          </button>

          <button 
            onClick={() => { onNavigate('careers'); onClose(); }}
            className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors mx-2 rounded-lg text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">work</span>
            <span className="font-label-lg text-label-lg font-medium">{translations.vacancies}</span>
          </button>

          <button 
            onClick={() => { onNavigate('contacts'); onClose(); }}
            className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors mx-2 rounded-lg text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">call</span>
            <span className="font-label-lg text-label-lg font-medium">{translations.contacts}</span>
          </button>
        </div>

        {/* Drawer Footer - Language Picker */}
        <div className="p-6 border-t border-surface-variant">
          <div className="flex items-center justify-between">
            <span className="text-text-muted font-body-md text-body-md">
              Til / Язык / Language
            </span>
            <button 
              onClick={cycleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-container text-on-primary-container rounded-full font-label-lg text-label-lg hover:opacity-90 transition-opacity cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              {translations.lang}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
