import React from 'react';

interface TopAppBarProps {
  title: string;
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function TopAppBar({ title, onMenuClick, onSearchClick }: TopAppBarProps) {
  return (
    <header 
      id="top-app-bar"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-margin h-16 bg-surface transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
    >
      <button 
        id="menu-btn"
        onClick={onMenuClick}
        className="w-10 h-10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity rounded-full cursor-pointer"
        aria-label="Open menu"
      >
        <span className="material-symbols-outlined text-[28px]">menu</span>
      </button>

      <div className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight font-bold">
        {title}
      </div>

      <button 
        onClick={onSearchClick}
        className="w-10 h-10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity rounded-full cursor-pointer"
        aria-label="Search products"
      >
        <span className="material-symbols-outlined text-[28px]">search</span>
      </button>
    </header>
  );
}
