import React,{useEffect,useState} from "react";
import { useParams,useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { div } from "framer-motion/client";



export default function ProductDetail(){
    const {category,productSlug,colorSlug}=useParams();

    const [SearchParams,setSearchParams]=useSearchParams();
    const frameWidth=SearchParams.get("w") ||"medium";
    
    const [product,setProduct] =useState(null);
    const [selectedVariant,setSelectedVariant]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        async function fetchProductDetail() {
            setLoading(true);


            const {data,error}=await supabase
            .from("products")
            .select(`*,product_variants(*,
                product_sizes(*),
            variant_images(*))`)
            .eq("slug",productSlug)
            .single();

            if(!error && data){
                setProduct(data);

                const variant =data.product_variants.find(
                    (v)=>v.color_name_slug===colorSlug
                );

                setSelectedVariant(variant || data.product_variants[0]);
            }else{
                console.error("Eroare la incarcarea produsului:",error);
            }
            setLoading(false);
            }
            fetchProductDetail();
        
    },[productSlug,colorSlug]);


    const activeSizeDetails=selectedVariant?.product_sizes?.find(
        (size)=>size.size_name_slug ===frameWidth
    );

    const handleWidthChange =(newWidth)=>{
        setSearchParams({w:newWidth});
    };


    if(loading) return <div className="py-25 px-10">Se incarca detaliile produsului...</div>
    if(!product) return <div className="py-25 px-10">Produsul nu a fost gasit.</div>;


    return (
      <div className="py-40 px-12">
        <div className="overflow-hidden w-50 ">
          <img
            src={selectedVariant?.main_image_url}
            alt={selectedVariant?.color_name}
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-[18px]">Color:{selectedVariant?.color_name}</p>
        <div className="flex items-center justify-center bg-white rounded-full border border-gray-700 w-6 h-6">
          <img
            src={selectedVariant?.color_hex}
            alt={selectedVariant?.color_name}
            className="w-4.5 h-4.5"
          />
        </div>

        <div className="flex gap-2">
          {selectedVariant?.product_sizes?.map((size) => (
            <button
              key={size.id}
              onClick={() => handleWidthChange(size.size_name_slug)}
              className={`px-4 py-2 text-xs font-semibold border rounded-md uppercase tracking-wider transition-all ${
                frameWidth === size.size_name_slug
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}
            >
              {size.size_name}
            </button>
          ))}
        </div>
      </div>
    );
}