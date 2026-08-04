import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const FILTER_SECTIONS = [
  {
    key: "shape",
    label: "Shape",
    options: [
      "Round",
      "Square",
      "Rectangle",
      "Cat-Eye",
      "Aviator",
      "Oval",
      "Geometric",
    ],
  },
  { key: "gender", label: "Gender", options: ["Men's", "Women's", "Kids"] },
  {
    key: "frame_width",
    label: "Frame width",
    options: ["Narrow", "Medium", "Wide", "Extra wide"],
  },
  {
    key: "material",
    label: "Material",
    options: ["Acetate", "Metal", "Mixed"],
  },
];

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [activeVariant, setActiveVariant] = useState(
    product.product_variants?.[0],
  );

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm bg-[#FCFBF9]">
        {/* Inima */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:shadow-md transition-shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
        </button>

        {/* Try on */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white rounded-full px-3 h-8 text-[13px] font-semibold hover:shadow-md transition-shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="h-3.5"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          </svg>
          Try on
        </button>

        {/* Link imagine */}
        <Link
          to={`/${product.category}/${product.slug}/${activeVariant?.color_name_slug}?w=${product.frame_width_slug || "medium"}`}
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={activeVariant?.main_image_url || "https://placehold.co/400"}
              alt={product.name}
              className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${hovered && activeVariant?.hover_image_url ? "opacity-0" : "opacity-100"}`}
            />
            {activeVariant?.hover_image_url && (
              <img
                src={activeVariant.hover_image_url}
                alt={product.name}
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[15px]">{product.name}</p>
          <p className="font-semibold text-[15px]">${product.base_price}</p>
        </div>

        {/* Culori */}
        <div className="flex gap-1.5">
          {product.product_variants?.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVariant(v)}
              className={`w-4 h-4 rounded-full border transition-all ${
                activeVariant?.id === v.id
                  ? "border-gray-800 scale-110"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: v.color_hex }}
            />
          ))}
        </div>

        <button className="w-full border border-gray-300 text-black font-semibold py-2.5 rounded-full text-[13px] hover:border-gray-500 transition-colors">
          Select lenses and buy
        </button>
      </div>
    </div>
  );
}

export default function CategoryProducts() {
  const { categorySlug, subPath } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({
    shape: true,
    gender: true,
    frame_width: false,
    material: false,
  });

  const handleFilterChange = (key, value) => {
    const current = new URLSearchParams(searchParams);
    const values = current.getAll(key);
    if (values.includes(value)) {
      const newValues = values.filter((v) => v !== value);
      current.delete(key);
      newValues.forEach((v) => current.append(key, v));
    } else {
      current.append(key, value);
    }
    setSearchParams(current);
  };

  const isChecked = (key, value) => searchParams.getAll(key).includes(value);
  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = supabase
        .from("products")
        .select("*, product_variants(*)")
        .eq("category", categorySlug);

      if (subPath === "men") query = query.eq("gender", "Men's");
      if (subPath === "women") query = query.eq("gender", "Women's");

      const shapes = searchParams.getAll("shape");
      if (shapes.length > 0) query = query.in("shape", shapes);

      const genders = searchParams.getAll("gender");
      if (genders.length > 0) query = query.in("gender", genders);

      const widths = searchParams.getAll("frame_width");
      if (widths.length > 0) query = query.in("frame_width", widths);

      const materials = searchParams.getAll("material");
      if (materials.length > 0) query = query.in("material", materials);

      const { data, error } = await query;
      if (!error && data) setProducts(data);
      else console.error(error);
      setLoading(false);
    };

    fetchProducts();
  }, [categorySlug, subPath, searchParams]);

  return (
    <div className="w-full min-h-screen bg-white pt-30">
      {/* Breadcrumb + titlu */}
      <div className="px-8 pt-4 pb-2">
        <div className="flex gap-1.5 text-[13px] text-gray-500 mb-1">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>›</span>
          <span className="text-black capitalize">{categorySlug}</span>
        </div>
        <h1 className="text-[28px] font-semibold capitalize">{categorySlug}</h1>
      </div>

      {/* Top bar */}
      <div className="flex flex-row justify-between items-center px-8 py-3 border-b border-gray-200">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-2 text-[14px] font-semibold hover:opacity-70 transition-opacity cursor-pointer"
        >
          <span>{isSidebarOpen ? "⇤" : "⇥"}</span>
          <span>{isSidebarOpen ? "Hide filters" : "Show filters"}</span>
          <span className="text-gray-400 font-normal">
            | {products.length} frames
          </span>
        </button>

        <button className="text-[14px] font-semibold text-gray-700 flex items-center gap-1">
          Recommended for you <IoChevronDown size={14} />
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-row w-full">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-r border-gray-200 shrink-0"
            >
              <div className="w-[240px] px-6 py-6 flex flex-col gap-1 text-[14px]">
                {FILTER_SECTIONS.map((section) => (
                  <div
                    key={section.key}
                    className="border-b border-gray-100 py-4"
                  >
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="flex justify-between items-center w-full font-semibold text-gray-800 mb-1"
                    >
                      <span>{section.label}</span>
                      {openSections[section.key] ? (
                        <IoChevronUp size={14} />
                      ) : (
                        <IoChevronDown size={14} />
                      )}
                    </button>
                    {openSections[section.key] && (
                      <div className="flex flex-col gap-2.5 pt-3">
                        {section.options.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked(section.key, opt)}
                              onChange={() =>
                                handleFilterChange(section.key, opt)
                              }
                              className="w-4 h-4 rounded border-gray-300 accent-[#1050D0]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Grid produse */}
        <main className="flex-1 px-8 py-6">
          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No frames found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
