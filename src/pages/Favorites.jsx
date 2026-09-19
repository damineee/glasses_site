import { useState, useEffect } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import ProductCard from "../components/ProductCard";


export default function Favorites() {
  const { favorites, loading } = useFavorites();



  


  return (
    <div className="w-full mx-auto px-6  pt-22 xl:pt-30">
      <div className="flex flex-col justify-center items-center pt-7 xl:pt-5">
        <h2 className="text-[32px] sm:text-[40px] xl:text-[58px] font-serif text-black font-medium tracking-tight">
          {favorites.length === 0
            ? "You currently have no favorites"
            : "Your favorites"}
        </h2>
        <p className="mt-1 text-[15px] sm:text-[18px] text-gray-700 font-sans text-center font-semibold">
          Buy one prescription pair and get 20% off additional pairs
        </p>

        {favorites.length === 0 && (
          <div className="flex flex-wrap justify-center gap-4 py-7">
            <Link
              to="/eyeglasses"
              className="px-6 py-2.5 bg-[#002855] text-white rounded-full text-sm font-semibold hover:bg-[#001d3d] transition-colors"
            >
              Shop eyeglasses
            </Link>
            <Link
              to="/sunglasses"
              className="px-6 py-2.5 bg-[#1050D0] text-white rounded-full text-sm font-semibold hover:bg-[#0c3fb3] transition-colors"
            >
              Shop sunglasses
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        Loading favorites...
      </div>
      ):(
        <>
         {favorites.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-6 xl:gap-x-8 gap-y-12 sm:gap-y-18 mt-16 mb-15">
          {favorites.map((fav) => {
            const variant=fav.product_variants;
            const product=variant?.products;

            if(!product || !variant) return null;
            return(
              <div key={fav.id} className="w-full max-w-[540px]">
              <ProductCard
                product={product}
                initialVariant={variant}
                selectedWidths={fav.size_slug}
                onlyInitialVariant
              />
            </div>
            );
            
          })}
        </div>
      )} </>
      )}
    
    </div>
  );
}
