import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

// 1. Terima props searchQuery dan onSearchChange
export default function Navbar({ searchQuery, onSearchChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <a href="#" className="text-xl md:text-2xl font-black tracking-widest text-zinc-900">
              LUMINA<span className="text-zinc-400">.</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Men</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Women</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Accessories</a>
            <a href="#" className="text-red-600 font-semibold hover:text-red-700 transition-colors">Sale</a>
          </nav>

          {/* Search, User, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Search Input */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                value={searchQuery} // 2. Bind value dari state
                onChange={(e) => onSearchChange(e.target.value)} // 3. Update state saat diketik
                placeholder="Search products..."
                className="w-40 lg:w-60 bg-zinc-100 text-xs text-zinc-800 placeholder-zinc-400 rounded-full py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

            <button className="sm:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-colors" aria-label="Search">
              <Search size={20} />
            </button>

            <button className="p-2 text-zinc-700 hover:text-zinc-900 transition-colors" aria-label="Account">
              <User size={20} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="pt-2 pb-3">
            {/* Mobile Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery} // 4. Bind value untuk tampilan mobile
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-zinc-100 text-sm text-zinc-800 placeholder-zinc-400 rounded-lg py-2 pl-9 pr-4 focus:outline-none"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>
          </div>
          <a href="#" className="block py-2 text-base font-medium text-zinc-800 hover:text-zinc-900">New Arrivals</a>
          <a href="#" className="block py-2 text-base font-medium text-zinc-800 hover:text-zinc-900">Men</a>
          <a href="#" className="block py-2 text-base font-medium text-zinc-800 hover:text-zinc-900">Women</a>
          <a href="#" className="block py-2 text-base font-medium text-zinc-800 hover:text-zinc-900">Accessories</a>
          <a href="#" className="block py-2 text-base font-semibold text-red-600">Sale</a>
        </div>
      )}
    </header>
  );
}