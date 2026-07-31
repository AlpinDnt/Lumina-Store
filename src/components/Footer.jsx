import { useState } from 'react';
import { ArrowRight, Check} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* 1. Brand & Newsletter (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="text-2xl font-black tracking-widest text-zinc-900 inline-block">
              LUMINA<span className="text-zinc-400">.</span>
            </a>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Elevating everyday essentials with timeless minimalist aesthetics and sustainably sourced materials.
            </p>

            {/* Newsletter Subscription Form */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 block mb-2">
                Join our newsletter
              </span>
              <p className="text-xs text-zinc-500 mb-3">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                  <Check size={16} />
                  <span>Thank you for subscribing to Lumina!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex max-w-md gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-zinc-100 text-xs text-zinc-900 placeholder-zinc-400 rounded-full py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-900 hover:bg-zinc-800 text-white p-2.5 rounded-full transition-colors flex items-center justify-center cursor-pointer shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 2. Shop Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Unisex Tees</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Hoodies & Sweaters</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* 3. Customer Care */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* 4. Company & Social Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              About
            </h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-4">
          <p>&copy; {new Date().getFullYear()} LUMINA Fashion Store. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}