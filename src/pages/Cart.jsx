import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, itemsTotal, loading } =
    useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium pt-24">
        Loading your cart...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] pt-24 gap-4">
        <h2 className="text-[28px] font-serif">Your cart is empty</h2>
        <Link
          to="/eyeglasses"
          className="px-6 py-2.5 bg-[#1050D0] text-white rounded-full text-sm font-semibold hover:bg-[#0c3fb3] transition-colors"
        >
          Shop eyeglasses
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 pt-25 xl:pt-29 pb-32 md:pb-16">
      <h2 className="text-[26px] sm:text-[32px] font-sans mb-2">
        Your cart: ${itemsTotal.toFixed(2)}
      </h2>

      <div className="bg-[#e8f2fb] border border-blue-100 rounded-lg px-4 py-3 mb-6">
        <p className="text-[14px] font-medium">
          Add one or more Rx pairs and save 20% on them.{" "}
          <Link
            to="/eyeglasses"
            className="text-blue-700 font-semibold hover:underline"
          >
            Keep shopping ›
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8">
        {/* Coloana stânga — itemii din coș */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
              onQuantityChange={(q) => updateQuantity(item.id, q)}
            />
          ))}
        </div>

        {/* Coloana dreapta — sumar, doar pe desktop */}
        <div className="hidden md:flex flex-col gap-4 h-fit sticky  top-23 xl:top-30">
          <SummaryBox
            itemsTotal={itemsTotal}
            onCheckout={() => navigate("/checkout")}
          />
        </div>
      </div>

      {/* Bară fixă jos, doar pe mobil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 border-gray-200 p-4 flex flex-col gap-2">
        <div className="flex justify-between text-[15px] font-semibold">
          <span>Subtotal</span>
          <span>${itemsTotal.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-[#1050D0] text-white font-semibold cursor-pointer py-3 rounded-full hover:bg-[#0c3fb3] transition-colors"
        >
          Next step
        </button>
      </div>
    </div>
  );
}

function CartItemCard({ item, onRemove, onQuantityChange }) {
   
    const variant = item.product_variants;
  const product = variant?.products;


  const getItemsPreview=()=>{
    const previews = item.lens_colors?.variant_lens_previews;;
    if(Array.isArray(previews)){
        const matchedPrev=previews.find((p)=>p.variant_id===item.variant_id);
        if(matchedPrev?.image_url) return matchedPrev.image_url;
    }
    return variant?.main_image_url || "https://placehold.co/200";
  };
  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
      <div className="flex flex-row gap-4">
        <Link
          className="w-24 h-24 sm:w-28 sm:h-28 bg-[#FCFBF9] rounded-lg overflow-hidden shrink-0"
          to={`/${product?.category}/${product?.slug}/${variant?.color_name_slug}?w=${item.size_slug}`}
        >
          <img
            src={getItemsPreview()}
            alt={product?.name}
            className="w-full h-full object-contain scale-91"
          />
        </Link>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <Link
              to={`/${product?.category}/${product?.slug}/${variant?.color_name_slug}`}
              className="font-serif text-[19px] text-blue-800 "
            >
              {product?.name}
            </Link>
            <span className="font-semibold">${item.unit_price.toFixed(2)}</span>
          </div>
          <p className="text-[14px] text-gray-600 mt-1">
            {variant?.color_name}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={onRemove}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-600 cursor-pointer"
              aria-label="Remove"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
            <div className="relative inline-flex items-center group">
              <select
                value={item.quantity}
                onChange={(e) => {
                  onQuantityChange(Number(e.target.value));
                  e.target.blur();
                }}
                className="border appearance-none border-gray-300 rounded-full pl-3 pr-7 py-1 text-[14px] font-semibold cursor-pointer outline-none focus:border-black transition-all duration-200"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute right-2.5 pointer-events-none text-gray-600 transition-transform duration-150 group-focus-within:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Detalii configurație */}
      <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
        <DetailRow label="Frame width" value={item.size_slug} />
        {item.prescription_types && (
          <DetailRow
            label="Prescription type"
            value={item.prescription_types.name}
            price={item.prescription_types.base_price}
          />
        )}
        {item.lens_types && (
          <DetailRow
            label="Lens type"
            value={
              item.lens_colors
                ? `${item.lens_types.name} (${item.lens_colors.name})`
                : item.lens_types.name
            }
            price={
              item.lens_types.extra_price > 0
                ? item.lens_types.extra_price
                : null
            }
            free={item.lens_types.extra_price === 0}
          />
        )}
        {item.lens_materials && (
          <DetailRow
            label="Lens material"
            value={item.lens_materials.name}
            price={
              item.lens_materials.extra_price > 0
                ? item.lens_materials.extra_price
                : null
            }
            free={item.lens_materials.extra_price === 0}
          />
        )}
        {item.reader_strengths && (
          <DetailRow
            label="Readers strength"
            value={item.reader_strengths.label}
          />
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, price, free }) {
  return (
    <div className="flex justify-between items-start text-[14px]">
      <div>
        <p className="font-semibold capitalize">{label}</p>
        <p className="text-gray-700 capitalize">{value}</p>
      </div>
      {price != null && <span className="font-semibold">+${price}</span>}
      {free && <span className="text-gray-500">Free</span>}
    </div>
  );
}

function SummaryBox({ itemsTotal, onCheckout }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex justify-between text-[15px]">
        <span>Item(s) total</span>
        <span>${itemsTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[15px] text-gray-600">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="h-[1px] bg-gray-200 my-1" />
      <div className="flex justify-between text-[17px] font-bold">
        <span>Subtotal</span>
        <span>${itemsTotal.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        className="mt-2 bg-[#1050D0] text-white font-semibold py-3 rounded-full hover:bg-[#0c3fb3] transition-colors cursor-pointer"
      >
        Next step
      </button>

      <div className="flex justify-around pt-3 font-medium text-gray-800 text-[12px]">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-truck-icon lucide-truck"
            className="text-gray-500 w-5 h-5"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
          <span>Free shipping</span>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-package-icon lucide-package"
            className="text-gray-500 w-5 h-5"
          >
            <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
            <path d="M12 22V12" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <path d="m7.5 4.27 9 5.15" />
          </svg>
          <span>Free returns</span>
        </div>
      </div>
    </div>
  );
}
