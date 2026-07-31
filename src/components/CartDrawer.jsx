import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export default function CartDrawer({ onOpenCheckout }) {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 1. Backdrop Overlay */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* 2. Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-zinc-900" />
              <h2 className="text-lg font-bold text-zinc-900">Your Cart</h2>
              <span className="text-xs bg-zinc-100 font-semibold px-2.5 py-0.5 rounded-full text-zinc-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag size={32} />
                </div>
                <p className="text-zinc-800 font-semibold text-base">Your cart is empty</p>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 bg-zinc-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-zinc-100 last:border-b-0"
                >
                  {/* Product Thumbnail */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-center rounded-md bg-zinc-100"
                  />

                  {/* Info & Quantity Controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-full px-2 py-1 gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-zinc-500 hover:text-zinc-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-bold text-zinc-900 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-zinc-500 hover:text-zinc-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Subtotal Item */}
                      <p className="text-sm font-bold text-zinc-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50/50 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500 text-xs">
                  <span>Shipping & Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onOpenCheckout();
                }}
                className="w-full bg-zinc-900 text-white font-bold py-3.5 px-4 rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                Proceed to Checkout • {formatCurrency(totalPrice)}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}