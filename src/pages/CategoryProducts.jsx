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

function ColorSwatch({ v, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="relative flex rounded-full bg-white items-center justify-center cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={v.color_hex}
        alt={v.color_name_slug}
        className="w-4.5 h-4.5 relative z-10"
      />
      <div
        className={`absolute bg-white inset-0 rounded-full border transition-all duration-200 ${
          isActive ? "border-gray-800 scale-135" : "border-gray-200 scale-110"
        } ${hovered ? "border-gray-400 scale-135" : "border-gray-200 scale-110"}`}
      />
    </button>
  );
}

  function ProductCard({product}){
    const [activeVariant,setActiveVariant]=useState(product.product_variants?.[0]);
    const linkto=`/${product.category}/${product?.slug}/${activeVariant?.color_name_slug}?w=${product?.frame_width_slug}`;
    return (
      <div className="flex flex-col overflow-hidden">
        <div className="relative h-70 w-full bg-[#FCFBF9] rounded-2xl">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            whileTap={{
              scale: 0.9,
              y: 1,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="group flex absolute cursor-pointer bottom-3 left-3.5 z-20 h-8 w-8 rounded-full bg-white items-center justify-center overflow-hidden  hover:shadow-lg hover:shadow-[#00000015]"
          >
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
              class="lucide lucide-heart-icon lucide-heart"
              className="w-4 h-4 opacity-[80%] group-hover:opacity-[100%]"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
          </motion.button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className=" flex flex-row gap-2 absolute cursor-pointer  z-20 bottom-3 right-3.5 px-3.5 py-1.5 rounded-full bg-white items-center justify-center overflow-hidden transition-all duration-200  hover:shadow-lg hover:shadow-[#00000015]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-bounding-box"
              viewBox="0 0 16 16"
              className=" h-3.5"
            >
              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            </svg>

            <span className="text-[14px] font-bold text-center">Try on</span>
          </button>
          <Link to={linkto} className="block inset-0 absolute">
            <img
              src={activeVariant?.main_image_url || "https://placehold.co/400"}
              alt={product?.name}
              className="  w-full h-full object-contain scale-89"
            />
          </Link>
        </div>
        <div className="flex-col flex px-4">
          <div className="flex flex-row bottom-34 justify-between items-center pt-5 ">
            <Link
              to={linkto}
              className="font-serif text-[23px] font-medium hover:opacity-80"
            >
              {product.name}
            </Link>
            <p className="font-sans text-gray-900 text-[19px] font-semibold">
              ${product.base_price}
            </p>
          </div>

          <div className="flex flex-row items-center gap-3.5 pl-1 py-3">
            {product.product_variants?.map((v)=>(
              <ColorSwatch key={v.id}
              v={v}
              isActive={activeVariant?.id===v.id}
              onClick={()=>setActiveVariant(v)} />
            ))}
          </div>

          <Link
                  to="/"
                  
                  className="flex mt-1  border w-auto h-12 rounded-4xl items-center justify-center border-gray-300 transition-all duration-200  hover:bg-[#1050D0] hover:border-transparent hover:text-white"
                >
                  <p className="text-[16px] font-sans font-semibold ">
                    Select lenses and buy
                  </p>
                </Link>
        </div>
      </div>
    );
  }

export default function CategoryProducts(){
  const {categorySlug,subPath}=useParams();
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();

  const [isSideBarOpen,setIsSidebarOpen]=useState(true);
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
    }else if (totalSelected ===1){
      const singleKey=Object.keys(current).find((k)=>current[k].length===1);
      const singleValue =current[singleKey][0];
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

      const needsSize=frame_width.length>0;
      const  needsColors=colors.length>0;

      let selectQuery="*";
      if(needsSize){
        selectQuery+=`,product_variants!inner(*,product_sizes!inner(*))`;
      }else if(needsColors){
        selectQuery += `, product_variants!inner(*, product_sizes(*))`;
      }else{
        selectQuery+=`,product_variants(*,product_sizes(*))`;
      }

      

      let query = supabase
        .from("products")
        .select(selectQuery)
        .eq("category", categorySlug);

      if(gender.length>0){
        const genderMapped = gender.map((g) =>
          g === "men" ? "Men's" : "Women's",
        );
        query=query.in("gender",genderMapped);
      }


      if(shape.length>0){
        query=query.in("shape",shape);
      }

      if(material.length>0){
        query=query.in("material",material);
      }

      if(colors.length>0){
        query=query.overlaps("product_variants.color_filter_slug",colors);
      }

      if (frame_width.length > 0) {
        query = query.in(
          "product_variants.product_sizes.size_name_slug",
          frame_width
        );
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
    <div className="w-full min-h-screen pt-30 bg-white flex flex-col  px-12 mb-5">
      <div className="flex  flex-1  relative">
        <AnimatePresence initial={false}>
          {isSideBarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 350, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="sticky top-5 h-[calc(100vh-9rem)] overflow-y-auto overflow-hidden  border-r border-gray-200 shrink-0 bg-white"
            >
              <div className="flex flex-row items-center text-[12px] font-medium gap-1 text-gray-600 whitespace-nowrap overflow-x-auto no-scrollbar pt-4">
                <Link to="/" className="underline hover:text-gray-950 shrink-0">
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

              <div className="flex flex-col py-2 pr-2">
                <h2 className="text-[24px] font-medium capitalize">
                  {!subPath ? `${categorySlug}` : `${subPath} ${categorySlug}`}
                </h2>

                <div className="font-medium leading-6 pt-2">
                  <span className={!isExpanded ? "line-clamp-2" : ""}>
                    Starting at $95, including prescription lenses with
                    scratch-resistant, anti-reflective coatings. After choosing
                    your eyeglasses, pick from a variety of prescription types
                    and lens options to meet your vision needs. Each pair of
                    eyeglasses also ships free!
                    {isExpanded && (
                      <>
                        <br />
                        <br />
                        Buy one prescription pair and get 20% off additional
                        pairs—plus get free shipping and free 30-day returns on
                        every order.
                      </>
                    )}
                  </span>

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`${isExpanded ? "ml-1" :"ml-0" } cursor-pointer text-[13px] font-bold underline`}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col  pr-2 pt-2 pb-4">
                {FILTER_SECTIONS.map((section) => (
                  <div key={section.key} className="border-t border-gray-200 ">
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
                                      handleFilterToggle(section.key, opt.value)
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
                                      handleFilterToggle(section.key, opt.value)
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
                                      handleFilterToggle(section.key, opt.value)
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
                                      handleFilterToggle(section.key, opt.value)
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
            </motion.aside>
          )}
        </AnimatePresence>

        <main
          className={`flex-1 flex-col  mb-5 ${isSideBarOpen ? "pl-5" : "pl-0"}`}
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
                    className="flex flex-row items-center gap-2 cursor-pointer"
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

                    <span className="text-[16px] font-medium ">
                      {isSideBarOpen ? "Hide " : "Show "}filters
                    </span>
                  </button>

                  <span className=" text-center h-[14px] w-[2px] bg-gray-200" />
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
                className={`grid grid-cols-1 md:grid-cols-2 mt-5 lg:gap-y-8 2xl:gap-y-12 gap-x-6 ${isSideBarOpen ? "lg:grid-cols-3 " : "lg:grid-cols-4"} `}
              >
                {products.map((prod) => (
                  <ProductCard product={prod} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
    // <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
    //   <header className="shrink-0 bg-white border-b border-gray-200 z-10 pt-20 px-8 pb-3">
    //     <div className="flex gap-1 text-[12px] text-gray-500 mb-1">
    //       <Link to="/" className="hover:underline">
    //         Home
    //       </Link>
    //       <span>/</span>
    //       <span className="text-black capitalize font-medium">
    //         {categorySlug}
    //       </span>
    //     </div>
    //     <h1 className="text-[32px] font-serif font-bold capitalize text-gray-900 leading-tight">
    //       {categorySlug}
    //     </h1>

    //     <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
    //       <button
    //         onClick={() => setIsSidebarOpen(!isSideBarOpen)}
    //         className="flex items-center gap-2 text-[14px] font-semibold text-gray-900 hover:text-gray-600 cursor-pointer"
    //       >
    //         <span>{isSideBarOpen ? "⇤ Hide filters" : "⇥ Show filters"}</span>
    //         <span className="text-gray-400 font-normal">
    //           | {products.length} frames
    //         </span>
    //       </button>

    //       <div className="flex items-center gap-1 text-[14px] font-semibold text-gray-800 cursor-pointer">
    //         Featured <IoChevronDown size={14} />
    //       </div>
    //     </div>
    //   </header>
    // </div>
  );
}
// function ProductCard({ product }) {
//   const [hovered, setHovered] = useState(false);
//   const [activeVariant, setActiveVariant] = useState(
//     product.product_variants?.[0],
//   );

//   return (
//     <div
//       className="flex flex-col"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="relative overflow-hidden rounded-sm bg-[#FCFBF9]">
//         {/* Inima */}
//         <button
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:shadow-md transition-shadow"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="15"
//             height="15"
//             fill="currentColor"
//             viewBox="0 0 16 16"
//             className="opacity-50 hover:opacity-100 transition-opacity"
//           >
//             <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
//           </svg>
//         </button>

//         {/* Try on */}
//         <button
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white rounded-full px-3 h-8 text-[13px] font-semibold hover:shadow-md transition-shadow"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="14"
//             height="14"
//             fill="currentColor"
//             viewBox="0 0 16 16"
//             className="h-3.5"
//           >
//             <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
//             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
//           </svg>
//           Try on
//         </button>

//         {/* Link imagine */}
//         <Link
//           to={`/${product.category}/${product.slug}/${activeVariant?.color_name_slug}?w=${product.frame_width_slug || "medium"}`}
//         >
//           <div className="relative aspect-square overflow-hidden">
//             <img
//               src={activeVariant?.main_image_url || "https://placehold.co/400"}
//               alt={product.name}
//               className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${hovered && activeVariant?.hover_image_url ? "opacity-0" : "opacity-100"}`}
//             />
//             {activeVariant?.hover_image_url && (
//               <img
//                 src={activeVariant.hover_image_url}
//                 alt={product.name}
//                 className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
//               />
//             )}
//           </div>
//         </Link>
//       </div>

//       {/* Info */}
//       <div className="mt-3 flex flex-col gap-2">
//         <div className="flex justify-between items-center">
//           <p className="font-semibold text-[15px]">{product.name}</p>
//           <p className="font-semibold text-[15px]">${product.base_price}</p>
//         </div>

//         {/* Culori */}
//         <div className="flex gap-1.5">
//           {product.product_variants?.map((v) => (
//             <button
//               key={v.id}
//               onClick={() => setActiveVariant(v)}
//               className={`w-4 h-4 rounded-full border transition-all ${
//                 activeVariant?.id === v.id
//                   ? "border-gray-800 scale-110"
//                   : "border-gray-200"
//               }`}
//               style={{ backgroundColor: v.color_hex }}
//             />
//           ))}
//         </div>

//         <button className="w-full border border-gray-300 text-black font-semibold py-2.5 rounded-full text-[13px] hover:border-gray-500 transition-colors">
//           Select lenses and buy
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function CategoryProducts() {
//   const { categorySlug, subPath } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openSections, setOpenSections] = useState({
//     shape: true,
//     gender: true,
//     frame_width: false,
//     material: false,
//   });

//   const handleFilterChange = (key, value) => {
//     const current = new URLSearchParams(searchParams);
//     const values = current.getAll(key);
//     if (values.includes(value)) {
//       const newValues = values.filter((v) => v !== value);
//       current.delete(key);
//       newValues.forEach((v) => current.append(key, v));
//     } else {
//       current.append(key, value);
//     }
//     setSearchParams(current);
//   };

//   const isChecked = (key, value) => searchParams.getAll(key).includes(value);
//   const toggleSection = (section) =>
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);

//       let query = supabase
//         .from("products")
//         .select("*, product_variants(*)")
//         .eq("category", categorySlug);

//       if (subPath === "men") query = query.eq("gender", "Men's");
//       if (subPath === "women") query = query.eq("gender", "Women's");

//       const shapes = searchParams.getAll("shape");
//       if (shapes.length > 0) query = query.in("shape", shapes);

//       const genders = searchParams.getAll("gender");
//       if (genders.length > 0) query = query.in("gender", genders);


//       const colors = searchParams.getAll("color");
//       if (colors.length > 0) {
//         query = query.ov("product_variants.color_filter", selectedColors);
//       }
//       const widths = searchParams.getAll("frame_width");
//       if (widths.length > 0) query = query.in("frame_width", widths);

//       const materials = searchParams.getAll("material");
//       if (materials.length > 0) query = query.in("material", materials);

//       const { data, error } = await query;
//       if (!error && data) setProducts(data);
//       else console.error(error);
//       setLoading(false);
//     };

//     fetchProducts();
//   }, [categorySlug, subPath, searchParams]);

//   return (
//     <div className="w-full min-h-screen bg-white pt-30">
//       {/* Breadcrumb + titlu */}
//       <div className="px-8 pt-4 pb-2">
//         <div className="flex gap-1.5 text-[13px] text-gray-500 mb-1">
//           <Link to="/" className="hover:underline">
//             Home
//           </Link>
//           <span>›</span>
//           <span className="text-black capitalize">{categorySlug}</span>
//         </div>
//         <h1 className="text-[28px] font-semibold capitalize">{categorySlug}</h1>
//       </div>

//       {/* Top bar */}
//       <div className="flex flex-row justify-between items-center px-8 py-3 border-b border-gray-200">
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="flex items-center gap-2 text-[14px] font-semibold hover:opacity-70 transition-opacity cursor-pointer"
//         >
//           <span>{isSidebarOpen ? "⇤" : "⇥"}</span>
//           <span>{isSidebarOpen ? "Hide filters" : "Show filters"}</span>
//           <span className="text-gray-400 font-normal">
//             | {products.length} frames
//           </span>
//         </button>

//         <button className="text-[14px] font-semibold text-gray-700 flex items-center gap-1">
//           Recommended for you <IoChevronDown size={14} />
//         </button>
//       </div>

//       {/* Layout */}
//       <div className="flex flex-row w-full">
//         {/* Sidebar */}
//         <AnimatePresence initial={false}>
//           {isSidebarOpen && (
//             <motion.aside
//               initial={{ width: 0, opacity: 0 }}
//               animate={{ width: 240, opacity: 1 }}
//               exit={{ width: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="overflow-hidden border-r border-gray-200 shrink-0"
//             >
//               <div className="w-[240px] px-6 py-6 flex flex-col gap-1 text-[14px]">
//                 {FILTER_SECTIONS.map((section) => (
//                   <div
//                     key={section.key}
//                     className="border-b border-gray-100 py-4"
//                   >
//                     <button
//                       onClick={() => toggleSection(section.key)}
//                       className="flex justify-between items-center w-full font-semibold text-gray-800 mb-1"
//                     >
//                       <span>{section.label}</span>
//                       {openSections[section.key] ? (
//                         <IoChevronUp size={14} />
//                       ) : (
//                         <IoChevronDown size={14} />
//                       )}
//                     </button>
//                     {openSections[section.key] && (
//                       <div className="flex flex-col gap-2.5 pt-3">
//                         {section.options.map((opt) => (
//                           <label
//                             key={opt}
//                             className="flex items-center gap-3 cursor-pointer"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={isChecked(section.key, opt)}
//                               onChange={() =>
//                                 handleFilterChange(section.key, opt)
//                               }
//                               className="w-4 h-4 rounded border-gray-300 accent-[#1050D0]"
//                             />
//                             <span>{opt}</span>
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Grid produse */}
//         <main className="flex-1 px-8 py-6">
//           {loading ? (
//             <div className="text-center py-20 text-gray-400">Loading...</div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-20 text-gray-400">
//               No frames found.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
