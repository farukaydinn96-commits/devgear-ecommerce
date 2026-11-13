import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, toggleCartDrawer } from "../slices/cartSlice";

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, isDrawerOpen, itemsPrice } = useSelector((state) => state.cart);

  if (!isDrawerOpen) return null;

  const subtotal = Number(itemsPrice || 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const updateQty = (item, newQty) => {
    if (newQty < 1) {
      dispatch(removeFromCart(item._id));
      return;
    }
    const maxStock = item.countInStock || 10;
    if (newQty > maxStock) return;
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Karartılmış Arka Plan */}
      <div
        onClick={() => dispatch(toggleCartDrawer(false))}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Üst Başlık */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Your Gear Bag
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
              </span>
            </h2>
            <button
              onClick={() => dispatch(toggleCartDrawer(false))}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Ücretsiz Kargo Barı */}
          <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              {remainingForFreeShipping > 0 ? (
                <>
                  Ücretsiz kargo için{" "}
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">
                    ${remainingForFreeShipping.toFixed(2)}
                  </span>{" "}
                  daha ekleyin! 🚚
                </>
              ) : (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  🎉 Tebrikler! Ücretsiz Ekspres Kargo kazandınız!
                </span>
              )}
            </p>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sepet Ürün Listesi */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl mb-4">
                  ⌨️
                </div>
                <p className="text-base font-semibold text-slate-900 dark:text-white">
                  Sepetin şu an boş
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Setup'ını güçlendirecek ekipmanları keşfetmeye başla.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white dark:bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                      ${(Number(item.price) * Number(item.qty)).toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <button
                          onClick={() => updateQty(item, Number(item.qty) - 1)}
                          className="px-2.5 py-1 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-500 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900 dark:text-white">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item, Number(item.qty) + 1)}
                          className="px-2.5 py-1 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-500 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-xs text-rose-500 hover:underline cursor-pointer"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Alt Özet & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Ara Toplam</span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  dispatch(toggleCartDrawer(false));
                  navigate("/cart");
                }}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 hover:opacity-90 transition-opacity cursor-pointer"
              >
                Sepete Git & Tamamla →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
