import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import black_color from "../assets/color_filter/black.png";
import blue_color from "../assets/color_filter/blue.avif";
import brown_color from "../assets/color_filter/brown.png";
import clear_color from "../assets/color_filter/clear.avif";
import crystal_color from "../assets/color_filter/crystal.png";
import gold_color from "../assets/color_filter/gold.avif";
import green_color from "../assets/color_filter/green.avif";
import grey_color from "../assets/color_filter/grey.avif";
import multi_color from "../assets/color_filter/multi-color.avif";
import pink_color from "../assets/color_filter/pink.png";
import purple_color from "../assets/color_filter/purple.avif";
import red_color from "../assets/color_filter/red.avif";
import silver_color from "../assets/color_filter/silver.png";
import tortoise_color from "../assets/color_filter/tortoise.avif";
import yellow_color from "../assets/color_filter/yellow.png";
import two_tone_color from "../assets/color_filter/two-tone.avif";
import square_shape from "../assets/shape_filter/square.avif";
import rectangle_shape from "../assets/shape_filter/rectangle.avif";
import round_shape from "../assets/shape_filter/round.avif";
import oval_shape  from "../assets/shape_filter/oval.avif";
import cat_eye_shape from "../assets/shape_filter/cateye.avif";
import geometric_shape from "../assets/shape_filter/Geometric.avif";
import aviator_shape from "../assets/shape_filter/aviator.avif";
import metal_mater from "../assets/material_filter/metal.avif";
import acetate_mater from "../assets/material_filter/acetate.avif";
import mixed_mater from "../assets/material_filter/mixed.avif";
import nylon_mater from "../assets/material_filter/nylon.avif";
import { button, div, span } from "framer-motion/client";
import ProductCard from "../components/ProductCard";
const FILTER_SECTIONS = [
  {
    key: "gender",
    label: "Gender",
    type: "buttons",
    options: [      
      { label: "Men's", value: "men" },
      { label: "Women's", value: "women" },
    ],
  },
  {
    key: "shape",
    label: "Shape",
    type: "shape_cards",
    options: [
      { label: "Square", value: "square",img:square_shape },
      { label: "Rectangle", value: "rectangle",img: rectangle_shape },
      { label: "Round", value: "round",img: round_shape },
      { label: "Oval", value: "oval",img: oval_shape },
      { label: "Cat-eye", value: "cat-eye", img: cat_eye_shape },
      { label: "Geometric", value: "geometric",img: geometric_shape },
      { label: "Aviator", value: "aviator",img: aviator_shape },
    ],
  },

  {
    key: "frame_width",
    label: "Frame width",
    type: "buttons",
    options: [
      { label: "Extra narrow", value: "extra-narrow" },
      { label: "Narrow", value: "narrow" },
      { label: "Medium", value: "medium" },
      { label: "Wide", value: "wide" },
      { label: "Extra wide", value: "extra-wide" },
    ],
  },
  {
    key: "colors",
    label: "Color",
    type: "color_swatch",
    options: [
      { label: "Black", value: "black", color: black_color },
      { label: "Brown", value: "brown", color: brown_color },
      { label: "Tortoise", value: "tortoise", color: tortoise_color },
      { label: "Crystal", value: "crystal", color: crystal_color },
      { label: "Multicolor", value: "multicolor", color: multi_color },
      { label: "Two-tone", value: "two-tone", color: two_tone_color },
      { label: "Gold", value: "gold", color: gold_color },
      { label: "Silver", value: "silver", color: silver_color },
      { label: "Red", value: "red", color: red_color },
      { label: "Yellow", value: "yellow", color: yellow_color },
      { label: "Green", value: "green", color: green_color },
      { label: "Blue", value: "blue", color: blue_color },
      { label: "Pink", value: "pink", color: pink_color },
      { label: "Purple", value: "purple", color: purple_color },
      { label: "Grey", value: "grey", color: grey_color },
      { label: "Clear", value: "clear", color: clear_color },
    ],
  },
  {
    key: "material",
    label: "Material",
    type: "material_cards",
    options: [
      { label: "Metal", value: "metal" ,img: metal_mater},
      { label: "Acetate", value: "acetate",img: acetate_mater },
      { label: "Mixed", value: "mixed",img: mixed_mater },
      { label: "Nylon", value: "nylon",img: nylon_mater },
    ],
  },
];



 

export default function CategoryProducts(){
  const {categorySlug,subPath}=useParams();
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();

  const [isSideBarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 640;
    }
    return true;
  });

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [products,setProducts]=useState([]);
  const [loading,setLaoding]=useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  const [openSection, setOpenSections] = useState({
    gender: false,
    shape: false,
    frame_width: false,
    colors: false,
    material: false,
  });

  const toggleSection=(key)=>setOpenSections((prev)=>({...prev,[key]:!prev[key]}));

  const getActiveFilters=()=>{
    const filters = {
      gender: searchParams.getAll("gender"),
      shape: searchParams.getAll("shape"),
      frame_width: searchParams.getAll("frame_width"),
      colors: searchParams.getAll("colors"),
      material: searchParams.getAll("material"),
    };
    if(subPath){
      const lower=subPath.toLowerCase();
      if(["men","women"].includes(lower)){
        if(!filters.gender.includes(lower)) filters.gender.push(lower);
       }else{
        if(!filters.shape.includes(lower)) filters.shape.push(lower);
       }
    }
    return filters;
  };

  const activeFilters=getActiveFilters();

  const isOptionActive=(key,value)=>{
    return activeFilters[key]?.includes(value);
  };

  const handleFilterToggle=(key,value)=>{
    const current={...activeFilters};

    if(current[key].includes(value)){
      current[key]=current[key].filter((v)=>v!==value);
    }else{
      current[key]=[...current[key],value];
    }
    const totalSelected=Object.values(current).reduce((acc,arr)=>acc+arr.length,0);

    if(totalSelected===0){
      navigate(`/${categorySlug}`);
    }else if (totalSelected ===1 && (current.gender.length===1 || current.shape.length===1)){
      const singleKey = current.gender.length === 1 ? "gender" : "shape";
      const singleValue = current[singleKey][0];
      navigate(`/${categorySlug}/${singleValue}`);
    }else{
      const params=new URLSearchParams();
      Object.keys(current).forEach((k)=>{
        current[k].forEach((val)=>params.append(k,val));
      });
     navigate(`/${categorySlug}?${params.toString()}`);
    }
  };

  useEffect(()=>{
    const fetchProducts=async()=>{
      setLaoding(true);

      const {gender,shape,frame_width,colors,material}=activeFilters;

    let query = supabase
      .from("products")
      .select(
        `
    *,
    product_variants!inner(
      *,
      product_sizes!inner(*)
    )
  `,
      )
      .eq("category", categorySlug);

   
     if (gender.length > 0) {
      
       query = query.overlaps("gender", gender);
     }

    
     if (shape.length > 0) {
       query = query.in("shape", shape);
     }

     if (material.length > 0) {
       query = query.in("material", material);
     }

   
  if (frame_width.length > 0) {
    query = query.in(
      "product_variants.product_sizes.size_name_slug",
      frame_width,
    );
  }

    
     if (colors.length > 0) {
      
       query = query.overlaps("product_variants.color_filter_slug", colors);
       
     }

      const {data,error}=await query;

      if(!error && data){
        setProducts(data);
      }else{
        console.error("Error fetching products:", error);
      }
      setLaoding(false);
    };
    fetchProducts();
  },[categorySlug,subPath,searchParams]);

  return (
    <div className="w-full min-h-screen pt-30 bg-white flex flex-col  lg:px-12 px-5 mb-5">
      <div className="flex  flex-1  relative">
        <AnimatePresence initial={false}>
          {isSideBarOpen && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: 350 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="sticky hidden lg:block top-5 h-[calc(100vh-9rem)] overflow-y-auto overflow-hidden  border-r border-gray-200 shrink-0 bg-white "
            >
              <div className="w-[350px] min-w-[350px]">
                <div className="flex flex-row items-center text-[12px] font-medium gap-1 text-gray-600 whitespace-nowrap overflow-x-auto no-scrollbar pt-4">
                  <Link
                    to="/"
                    className="underline hover:text-gray-950 shrink-0"
                  >
                    Home
                  </Link>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right-icon lucide-chevron-right"
                    className="w-3 h-3 shrink-0 text-gray-600"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>

                  {subPath ? (
                    <Link
                      to={`/${categorySlug}`}
                      className=" capitalize shrink-0 hover:text-gray-950 underline"
                    >
                      {categorySlug}
                    </Link>
                  ) : (
                    <span className=" capitalize shrink-0 text-black ">
                      {categorySlug}
                    </span>
                  )}

                  {subPath && (
                    <>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-chevron-right-icon lucide-chevron-right"
                        className="w-3 h-3 shrink-0"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                      <span className="text-black shrink-0 capitalize font-semibold">
                        {subPath} {categorySlug}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-col py-2 pr-6">
                  <h2 className="text-[24px] font-medium capitalize">
                    {!subPath
                      ? `${categorySlug}`
                      : `${subPath} ${categorySlug}`}
                  </h2>

                  <div className="font-medium leading-6 pt-2">
                    <span className={!isExpanded ? "line-clamp-2" : ""}>
                      Starting at $95, including prescription lenses with
                      scratch-resistant, anti-reflective coatings. After
                      choosing your eyeglasses, pick from a variety of
                      prescription types and lens options to meet your vision
                      needs. Each pair of eyeglasses also ships free!
                      {isExpanded && (
                        <>
                          <br />
                          <br />
                          Buy one prescription pair and get 20% off additional
                          pairs—plus get free shipping and free 30-day returns
                          on every order.
                        </>
                      )}
                    </span>

                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className={`${isExpanded ? "ml-1" : "ml-0"} cursor-pointer text-[13px] font-bold underline`}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col  pr-6 pt-2 pb-4">
                  {FILTER_SECTIONS.map((section) => (
                    <div
                      key={section.key}
                      className="border-t border-gray-200 "
                    >
                      <button
                        onClick={() => toggleSection(section.key)}
                        className="flex  justify-between items-center py-4 w-full text-[16px] font-semibold text-gray-900"
                      >
                        <span>{section.label}</span>
                        <div className="flex items-center justify-center rounded-full border border-gray-200 h-9 w-9">
                          <motion.svg
                            animate={{
                              rotate: openSection[section.key] ? 180 : 0,
                            }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevron-down-icon lucide-chevron-down"
                            className="w-6 h-6 text-gray-900"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </motion.svg>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSection[section.key] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className=" overflow-hidden"
                          >
                            {section.type === "buttons" && (
                              <div className="grid grid-cols-2 gap-3.5 pb-4">
                                {section.options.map((opt) => {
                                  const active = isOptionActive(
                                    section.key,
                                    opt.value,
                                  );
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        handleFilterToggle(
                                          section.key,
                                          opt.value,
                                        )
                                      }
                                      className={`py-3   text-[16px] rounded-lg border font-semibold transition-all cursor-pointer ${
                                        active
                                          ? "border-black text-black"
                                          : "border-gray-200 text-gray-800 hover:text-gray-900 hover:border-gray-600 "
                                      }`}
                                    >
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {section.type === "shape_cards" && (
                              <div className="grid grid-cols-2 gap-3.5 pb-4">
                                {section.options.map((opt) => {
                                  const active = isOptionActive(
                                    section.key,
                                    opt.value,
                                  );
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        handleFilterToggle(
                                          section.key,
                                          opt.value,
                                        )
                                      }
                                      className={`flex flex-col py-3 gap-2.5 shrink-0  text-[16px] rounded-lg border font-semibold transition-all cursor-pointer ${
                                        active
                                          ? "border-black text-black"
                                          : "border-gray-200 text-gray-800 hover:text-gray-900 hover:border-gray-600 "
                                      }`}
                                    >
                                      <img
                                        src={opt.img}
                                        alt={opt.label}
                                        className="object-contain px-9 shrink-0"
                                      />
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {section.type === "color_swatch" && (
                              <div className="grid grid-cols-2 gap-3.5 pb-4">
                                {section.options.map((opt) => {
                                  const active = isOptionActive(
                                    section.key,
                                    opt.value,
                                  );
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        handleFilterToggle(
                                          section.key,
                                          opt.value,
                                        )
                                      }
                                      className={`flex flex-row items-center px-3 py-3 gap-2  text-[16px] rounded-lg border font-semibold transition-all cursor-pointer ${
                                        active
                                          ? "border-black text-black"
                                          : "border-gray-200 text-gray-800 hover:text-gray-900 hover:border-gray-600 "
                                      }`}
                                    >
                                      <img
                                        src={opt.color}
                                        alt={opt.label}
                                        className="object-contain w-6"
                                      />
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {section.type === "material_cards" && (
                              <div className="grid grid-cols-2 gap-3.5 pb-4">
                                {section.options.map((opt) => {
                                  const active = isOptionActive(
                                    section.key,
                                    opt.value,
                                  );
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        handleFilterToggle(
                                          section.key,
                                          opt.value,
                                        )
                                      }
                                      className={`flex flex-col py-3 gap-2.5  text-[16px] rounded-lg border font-semibold transition-all cursor-pointer ${
                                        active
                                          ? "border-black text-black"
                                          : "border-gray-200 text-gray-800 hover:text-gray-900 hover:border-gray-600 "
                                      }`}
                                    >
                                      <img
                                        src={opt.img}
                                        alt={opt.label}
                                        className="object-contain "
                                      />
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main
          className={`flex-1 flex-col   mb-5 ${isSideBarOpen ? "lg:pl-5 pl-0" : "pl-0"}`}
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-700 animate-pulse ">
              Loading frames...
            </div>
          ) : products.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-gray-700 ">
              No frames found matching your filters.
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center   mt-5">
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={() => setIsSidebarOpen(!isSideBarOpen)}
                    className="lg:flex hidden flex-row items-center gap-2 cursor-pointer"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-arrow-left-from-line-icon lucide-arrow-left-from-line"
                      className="w-4 h-4 text-black"
                      animate={{ rotateY: isSideBarOpen ? 0 : 180 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <path d="m9 6-6 6 6 6" />
                      <path d="M3 12h14" />
                      <path d="M21 19V5" />
                    </motion.svg>

                    <span className="hidden lg:block text-[16px] font-medium ">
                      {isSideBarOpen ? "Hide " : "Show "}filters
                    </span>
                  </button>

                  <span className="lg:block  hidden  text-center h-[14px] w-[2px] bg-gray-200" />
                  <span className="text-[16px] text-gray-600 font-medium">
                    {products.length} frames
                  </span>
                </div>

                <button className="flex flex-row items-center gap-1.5 cursor-pointer">
                  <span className="text-[16px] text-gray-900 font-medium">
                    Featured
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-up-icon lucide-chevron-up"
                    className="text-black w-4 h-4"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 mt-5 gap-y-6   lg:gap-y-8 2xl:gap-y-12 gap-x-6 ${isSideBarOpen ? "xl:grid-cols-3 " : "xl:grid-cols-4"} `}
              >
                {products.map((prod) => (
                  <ProductCard
                    key={prod.id || prod.slug}
                    product={prod}
                    selectedWidths={activeFilters.frame_width}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
