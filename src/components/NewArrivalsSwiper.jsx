import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { supabase } from "../utils/supabase";
import {motion} from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

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
          isActive ? "border-gray-700 scale-135" : "border-gray-200 scale-110"
        } ${hovered ? "border-gray-400 scale-135" : "border-gray-200 scale-110"}`}
      />
    </button>
  );
}


function ProductCard({ product}) {
const [hovered,setHovered]=useState(false);
const [activeVariant,setActiveVariant]=useState(product.product_variants?.[0]);
return (
  <div
    className="flex flex-col group"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >
    <div className="relative overflow-hidden rounded-xs bg-[#FCFBF9]">
      <motion.button
        onClick={(e) => e.stopPropagation()}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        whileTap={{
          scale: 0.9,
          y: 1,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="group flex absolute cursor-pointer top-6 left-6 z-10 h-8 w-8 rounded-full bg-white items-center justify-center overflow-hidden  hover:shadow-lg hover:shadow-[#00000015]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
          className=" h-3.5 opacity-80 group-hover:opacity-100 group-hover:stroke:black group-hover:stroke-width:0.4 transition-opacity duration-200"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
        </svg>
      </motion.button>

      <button
        onClick={(e) => e.stopPropagation()}
        className=" flex flex-row gap-2 absolute cursor-pointer top-6 right-6 z-10 h-8 w-23 rounded-full bg-white items-center justify-center overflow-hidden  hover:shadow-lg hover:shadow-[#00000015]"
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

        <span className="text-[14px] font-bold">Try on</span>
      </button>

      {/* <div className="flex-row flex absolute left-6 bottom-27 justify-between items-center z-10 gap-2">
        {product.product_variants?.map((v) => (
          <button
            key={v.id}
            className={`flex rounded-full  bg-white  items-center justify-center cursor-pointer transition-all duration-200 
            ${activeVariant?.id === v.id ? "border border-gray-600 w-6 h-6" : "w-5 h-5 hover:border hover:border-gray-600 hover:w-6 hover:h-6"} `}
            onClick={(e) => {
              e.stopPropagation();
              setActiveVariant(v);
            }}
          >
            <img
              src={v.color_hex}
              alt={v.color_name_slug}
              className="w-4.5 h-4.5"
            />
          </button>
        ))}
      </div> */}

      <div className="flex-row flex absolute left-6 bottom-27 justify-between items-center z-10 gap-2">
        {product.product_variants?.map((v) => (
          <ColorSwatch
            key={v.id}
            v={v}
            isActive={activeVariant?.id === v.id}
            onClick={(e) => {
              e.stopPropagation();
              setActiveVariant(v);
            }}
          />
        ))}
      </div>

      <Link
        to=""
        onClick={(e) => e.stopPropagation()}
        className={` flex absolute bottom-6 left-6 right-6 z-10  border w-auto h-12 rounded-4xl items-center justify-center transition-color duration-200 hover:bg-[#1050D0] hover:border-transparent hover:text-white
           ${hovered ? "text-white border-white" : "text-black  border-gray-700"}`}
      >
        <p className="text-[16px] font-sans font-semibold ">
          Select lenses and buy
        </p>
      </Link>

      <Link
        to={`/${product?.category}/${product?.slug}/${activeVariant?.color_name_slug}?w=${product?.frame_width_slug}`}
        className="block "
      >
        <div className="relative aspect-[6.2/7]">
          <img
            src={activeVariant?.main_image_url || "https://placehold.co/400"}
            alt={product?.name}
            className={`w-full h-full  object-contain absolute transform scale-93 -translate-y-10 inset-0 transition-opacity duration-200 ${hovered ? "opacity-0" : "opacity-100"}`}
          />

          <img
            src={activeVariant?.hover_image_url}
            alt={product?.name}
            className={`w-full h-full  object-cover absolute inset-0 transition-opacity duration-200 ${hovered ? "opacity-100 " : "opacity-0"}`}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-2 transition-opacity duration-200 ${hovered ? "opacity-100 " : "opacity-0"}`}
          />

          <div
            className={`absolute z-10 left-6 right-6 flex flex-row bottom-34 justify-between items-center transition-colors duration-200 ${hovered ? "text-white" : "text-black"}`}
          >
            <p className="font-serif text-[24px] font-medium">{product.name}</p>
            <p className="font-sans text-[15px] font-bold">
              ${product.base_price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  </div>
);
}




export default function NewArrivalsSwiper(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);


    const prevRef =useRef(null);
    const nextRef=useRef(null);
    const swiperRef=useRef(null);

    useEffect(()=>{
        async function fetchNewArrivals() {
            const { data, error } = await supabase
              .from("products")
              .select("*,product_variants(*)")
              .eq("is_new_arrival", true)
              .order("display_order", { ascending: true })
              .order("display_order", {
                foreignTable: "product_variants",
                ascending: true,
              });

        if (!error && data){
            setProducts(data);
        }
        setLoading(false);
        }
        fetchNewArrivals();
    },[]);

    if(loading) return <div className="text-[14px] py-3 px-12">Loading new arrival...</div>


    return (
      <section className="">
        <div className="flex flex-row justify-between items-center pb-5">
          <div className="flex flex-row text-[23px] font-semibold font-sans">
            <p className=" pr-1.5">Shop by</p>
            <Link to="" className=" text-[#1050D0]">
              new arrivals
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <button
              ref={prevRef}
              className="flex cursor-pointer p-6 rounded-full border border-gray-400 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="flex cursor-pointer p-6 rounded-full border border-gray-400 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={12}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => {
           
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    );
}