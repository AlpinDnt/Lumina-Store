import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, Import } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/FormatCurrency';
import { products } from '../data/Product';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  // State Form Data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit_card',
  });

  if (!isOpen) return null;

  const shippingFee = cart.length > 0 ? 10.0 : 0.0;
  const grandTotal = totalPrice + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi proses transaksi berhasil
    setIsSuccess(true);
    clearCart();
  };

  const handleCloseAll = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={isSuccess ? handleCloseAll : onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all my-8 p-6 sm:p-8">
          
          {/* Close Button */}
          <button
            onClick={isSuccess ? handleCloseAll : onClose}
            className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-900 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* 1. Tampilan saat Order Berhasil */}
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                Order Confirmed!
              </h2>
              <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                Thank you for your purchase, <strong className="text-zinc-900">{formData.fullName}</strong>. We've sent a confirmation email to <span className="underline">{formData.email}</span>.
              </p>
              
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-600 max-w-sm mx-auto text-left space-y-1">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono font-bold text-zinc-900">#LUM-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="font-medium text-zinc-900 line-clamp-1">{formData.address}, {formData.city}</span>
                </div>
              </div>

              <button
                onClick={handleCloseAll}
                className="mt-6 bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* 2. Form Checkout & Order Summary */
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
                <Lock size={20} className="text-zinc-900" />
                <h2 className="text-xl font-bold text-zinc-900">Secure Checkout</h2>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Shipping Form */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Shipping Details
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs rounded-lg p-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs rounded-lg p-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Fashion Street"
                      className="w-full bg-zinc-50 border border-zinc-200 text-xs rounded-lg p-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Jakarta"
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs rounded-lg p-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="12190"
                        className="w-full bg-zinc-50 border border-zinc-200 text-xs rounded-lg p-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary & Payment */}
                <div className="flex flex-col justify-between bg-zinc-50 p-5 rounded-xl border border-zinc-200/80">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Order Summary
                    </h3>

                    {/* Item Mini List */}
                    <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <span className="text-zinc-700 line-clamp-1 flex-1 pr-2">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-bold text-zinc-900">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <hr className="border-zinc-200" />

                    {/* Calculation breakdown */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-zinc-600">
                        <span>Subtotal</span>
                        <span>{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Flat Shipping</span>
                        <span>{formatCurrency(shippingFee)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
                        <span>Total Pay</span>
                        <span>{formatCurrency(grandTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6 space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                    >
                      <CreditCard size={16} /> Pay {formatCurrency(grandTotal)}
                    </button>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-400">
                      <ShieldCheck size={12} />
                      <span>256-bit Encrypted Payment</span>
                    </div>
                  </div>

                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}