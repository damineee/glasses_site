import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { supabase } from "../utils/supabase";
import {motion} from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import FavoritesButton from "./FavoritesButton";


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

function ProductCardSkeleton(){
  return (
    <div className="flex flex-col animate-pulse">
      <div className="relative rounded-xs bg-[#FCFBF9] aspect-square animate-pulse">
        <div className="absolute top-6 left-6 h-8 w-8 rounded-full bg-gray-200" />
        <div className="absolute top-6 right-6 w-23 h-8 rounded-full bg-gray-200" />

        <div className="absolute left-6  bottom-27 flex gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-gray-200" />
          ))}
        </div>
        <div className="absolute left-6 right-6 bottom-34 flex items-center justify-between">
          <div className="w-20 h-6 rounded bg-gray-200" />
          <div className="w-8 h-5 rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="absolute bottom-6 left-6 right-6 h-12 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}



function ProductCard({ product, initialVariant, selectedWidths }) {
  const [hovered, setHovered] = useState(false);
  const [activeVariant, setActiveVariant] = useState(
    initialVariant || product?.product_variants?.[0]
  );

  return (
    <div
      className="flex flex-col "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xs bg-[#FCFBF9]">
        {/* Pasăm ID-ul variantei curente active */}
        <FavoritesButton
          variantId={activeVariant?.id}
          sizeSlug={selectedWidths || "medium"}
          className="top-6 left-6 absolute"
        />

        <button
          onClick={(e) => e.stopPropagation()}
          className="flex flex-row gap-2 absolute cursor-pointer top-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-white items-center justify-center overflow-hidden hover:shadow-lg hover:shadow-[#00000015]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-bounding-box h-3.5"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          </svg>
          <span className="text-[14px] font-bold">Try on</span>
        </button>

        <div className="flex-row flex absolute left-6 bottom-27 justify-between items-center z-10 gap-3.5">
          {product?.product_variants?.map((v) => (
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
          className={`flex absolute bottom-6 left-6 right-6 z-10 border w-auto h-12 rounded-4xl items-center justify-center transition-color duration-200 hover:bg-[#1050D0] hover:border-transparent hover:text-white ${
            activeVariant?.hover_image_url && hovered
              ? "text-white border-white"
              : "text-black border-gray-700"
          }`}
        >
          <p className="text-[16px] font-sans font-semibold">
            Select lenses and buy
          </p>
        </Link>

        <Link
          to={`/${product?.category}/${product?.slug}/${activeVariant?.color_name_slug}?w=${product?.frame_width_slug}`}
          className="block"
        >
          <div className="relative aspect-square">
            <img
              src={activeVariant?.main_image_url || "https://placehold.co/400"}
              alt={product?.name}
              className={`w-full h-full object-contain absolute transform scale-93 -translate-y-10 inset-0 transition-opacity duration-200 ${
                activeVariant?.hover_image_url && hovered
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />
            {activeVariant?.hover_image_url && (
              <img
                src={activeVariant?.hover_image_url}
                alt={product?.name}
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-200 ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-2 transition-opacity duration-200 ${
                activeVariant?.hover_image_url && hovered
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />

            <div
              className={`absolute z-10 left-6 right-6 flex flex-row bottom-34 justify-between items-center transition-colors duration-200 ${
                activeVariant?.hover_image_url && hovered
                  ? "text-white"
                  : "text-black"
              }`}
            >
              <p className="font-serif text-[24px] font-medium">
                {product?.name}
              </p>
              <p className="font-sans text-[15px] font-bold">
                ${product?.base_price}
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

    if(loading) {
      return (
        <section>
          <div className="flex justify-between items-center pb-5 px-12">
            <div className="p-1.5 w-55 h-8 rounded-lg bg-gray-200 animate-pulse" />
            <div className="flex flex-row gap-2">
              <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-full" />
              <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-12">
            {[...Array(3)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      );
    }


    return (
      <section className="">
        <div className="flex flex-row justify-between items-center pb-5  sm:px-12 px-6">
          <div className="flex sm:flex-row flex-wrap flex-1 text-[23px] font-semibold font-sans">
            <p className=" pr-1.5">Shop by</p>
            <Link to="" className=" text-[#1050D0]">
              new arrivals
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <button
              ref={prevRef}
              className="flex cursor-pointer sm:h-12 sm:w-12 h-11 w-11 rounded-full border border-gray-300 items-center justify-center transition-color  duration-200 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-default [&.swiper-button-disabled]:hover:border-gray-300 hover:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
                className="sm:h-7 sm:w-7 h-5.5 w-5.5"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="flex cursor-pointer sm:h-12 sm:w-12 h-11 w-11 rounded-full border border-gray-300 items-center justify-center transition-color  duration-200 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-default [&.swiper-button-disabled]:hover:border-gray-300 hover:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
                className="sm:h-7 sm:w-7 h-5.5 w-5.5"
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
          slidesOffsetBefore={21}
          slidesOffsetAfter={21}
          breakpoints={{
            640: {
              slidesPerView: 1,
              slidesOffsetBefore: 30,
              slidesOffsetAfter: 30,
            },
            768: {
              slidesPerView: 2,
              slidesOffsetBefore: 46,
              slidesOffsetAfter: 46,
            },
            1124: {
              slidesPerView: 3,
              slidesOffsetBefore: 46,
              slidesOffsetAfter: 46,
            },
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