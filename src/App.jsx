import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CategoryFilter from './components/CategoryFilter';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { products } from './data/Product';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Safely fallback if products array is undefined
  const productList = products || [];

  const categories = ['All', ...new Set(productList.map((p) => p.category))];

  const filteredProducts = productList.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-between">
      <div>
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
              Essential Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 mt-3 tracking-tight">
              MINIMALIST EVERYDAY WEAR
            </h1>
            <p className="text-zinc-600 mt-4 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Crafted with premium fabrics and timeless designs tailored for modern aesthetic lifestyles.
            </p>
          </div>

          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-200 pb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-950">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Products'}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <ProductGrid
              products={filteredProducts}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />
          </section>
        </main>
      </div>

      <Footer />

      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}