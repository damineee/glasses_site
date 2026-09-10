import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FavoritesButton from "./FavoritesButton";

export function ColorSwatch({ v, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      className="relative flex rounded-full bg-white items-center justify-center cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={v.color_hex}
        alt={v.color_name_slug || "Variant color"}
        className="w-4.5 h-4.5 relative z-10 rounded-full object-cover"
      />
      <div
        className={`absolute bg-white inset-0 rounded-full border transition-all duration-200 ${
          isActive ? "border-gray-800 scale-135" : "border-gray-200 scale-110"
        } ${hovered ? "border-gray-400 scale-135" : "border-gray-200 scale-110"}`}
      />
    </button>
  );
}

export default function ProductCard({
  product,
  selectedWidths = "medium",
  initialVariant,
  showSwatches = true,
  showTryOn = true,
  showFavorite = true,
  onTryOnClick,
  onlyInitialVariant = false,
}) {
    const variants =
      onlyInitialVariant && initialVariant
        ? [initialVariant]
        : product?.product_variants || (initialVariant ? [initialVariant] : []);

  const [activeVariant, setActiveVariant] = useState(
    initialVariant || variants[0],
  );

  const getActiveWidth = () => {
    const availableSizes = activeVariant?.product_sizes || [];

    const targetWidth = Array.isArray(selectedWidths)
      ? selectedWidths[0]
      : selectedWidths;

    const matchedSize = availableSizes.find(
      (s) => s.size_name_slug === targetWidth,
    );

    if (matchedSize) {
      return matchedSize.size_name_slug;
    }

    if (availableSizes.length > 0) {
      return availableSizes[0].size_name_slug;
    }

    return targetWidth || "medium";
  };

  const activeWidth = getActiveWidth();
  const linkto = `/${product?.category}/${product?.slug}/${activeVariant?.color_name_slug}?w=${activeWidth}`;

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] w-full bg-[#FCFBF9] rounded-2xl">
        {showFavorite && (
          <FavoritesButton
            variantId={activeVariant?.id}
            sizeSlug={activeWidth}
            className="absolute bottom-3 left-3.5"
          />
        )}

        {showTryOn && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onTryOnClick) onTryOnClick(product);
            }}
            className="flex flex-row gap-2 absolute cursor-pointer z-20 bottom-3 right-3.5 px-3.5 py-1.5 rounded-full bg-white items-center justify-center overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-[#00000015]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="h-3.5"
            >
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>
            <span className="text-[14px] font-bold text-center">Try on</span>
          </button>
        )}
        
        <Link
          to={linkto}
          className="inset-0 absolute flex items-center justify-center p-7"
        >
          <img
            src={activeVariant?.main_image_url || "https://placehold.co/400"}
            alt={product?.name || "Product image"}
            className="w-full h-full object-contain pointer-events-none"
          />
        </Link>
      </div>

    
      <div className="flex-col flex px-4">
        <div className="flex flex-row bottom-34 justify-between items-center pt-5">
          <Link
            to={linkto}
            className="font-serif text-[23px] font-medium hover:opacity-80"
          >
            {product?.name}
          </Link>
          <p className="font-sans text-gray-900 text-[19px] font-semibold">
            ${product?.base_price}
          </p>
        </div>

        
        {showSwatches && (
          <div className="flex flex-row items-center gap-3.5 pl-1 py-3">
            {variants.map((v) => (
              <ColorSwatch
                key={v.id}
                v={v}
                isActive={activeVariant?.id === v.id}
                onClick={() => setActiveVariant(v)}
              />
            ))}
          </div>
        )}

        
        <Link
          to={linkto}
          className="flex mt-1 border w-auto h-12 rounded-4xl items-center justify-center border-gray-300 transition-all duration-200 hover:bg-[#1050D0] hover:border-transparent hover:text-white"
        >
          <p className="text-[16px] font-sans font-semibold">
            Select lenses and buy
          </p>
        </Link>
      </div>
    </div>
  );
}
