import { motion } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoritesButton({
  variantId,
  sizeSlug = "medium",
  size = "w-4 h-4",
  btnSize = "w-8 h-8",
  className = "",
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(variantId, sizeSlug);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId) {
      toggleFavorite(variantId, sizeSlug);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
      whileTap={{
        scale: 0.9,
        y: 1,
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
      className={`group flex items-center justify-center rounded-full bg-white z-10 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-[#00000015] ${btnSize} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFav ? "#0a53fc" : "none"}
        stroke={isFav ? "#0a53fc" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${size} transition-colors duration-200 ${
          isFav ? "opacity-100" : "opacity-[80%] group-hover:opacity-[100%]"
        }`}
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </motion.button>
  );
}
