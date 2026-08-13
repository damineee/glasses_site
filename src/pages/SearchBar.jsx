import { useState,useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import Fuse from "fuse.js";


function VariantCard({variant}){
    return (
      <Link
        to={`/${variant?.productCategory}/${variant?.productNameSlug}/${variant?.color_name_slug}?w=${variant?.productFrameWidthSlug}`}
      >
        <div className="flex flex-row md:flex-col items-center  gap-x-7  gap-y-4 ">
          <div className="w-[30%]  h-16 md:w-full md:h-25  xl:h-35 2xl:h-45  overflow-hidden ">
            <img
              src={variant?.main_image_url}
              alt={variant?.color_name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-0.5 text-start md:text-center">
            <h4 className="text-[20px] lg:text-[23px] font-medium font-serif">
              {variant?.productName}
            </h4>
            <p className="text-[17px] italic font-medium font-serif text-gray-800">
              {variant?.color_name}
            </p>
          </div>
        </div>
      </Link>
    );
}
export default function SearchBar(){
   const navigate=useNavigate();
    const [searchTerm,setSearchTerm]=useState("");
    const [allVariants,setAllVariants]=useState([]);
    const [filteredVaraints,setFilteredVariants]=useState([]);
    const [isloading, setIsLoading] = useState(true);


    useEffect(()=>{
        const fetchPorductsAndVariants=async()=>{
            setIsLoading(true);
            const { data, error } = await supabase
              .from("products")
              .select(
                `id,name,category,shape,slug,frame_width_slug,gender,
                product_variants(id,color_name,main_image_url,color_name_slug,color_filter,
                product_sizes(id,size_name))`,
              );
            
              if(!error && data){
                const flattenedVariants=data.flatMap((product)=>(product.product_variants || []).map((variant)=>({
                    ...variant,
                    productId:product.id,
                    productName:product.name,
                    productCategory:product.category,
                    productShape:product.shape,
                    productNameSlug:product.slug,
                    productFrameWidthSlug:product.frame_width_slug,
                    productGender:product.gender,
                    sizeNames:(variant.product_sizes || []).map((s)=>s.size_name).join(" "),

                })));
                setAllVariants(flattenedVariants);
              }else{
                console.error("Eroare Supabase:",error);
              }
              setIsLoading(false);
            
        };
        fetchPorductsAndVariants();
    },[]);

    const fuse=useMemo(()=>{
      return new Fuse(allVariants, {
        keys: [
          { name: "productName", weight: 3 },
          { name: "color_name", weight: 2 },
          { name: "color_filter", weight: 1.5 },
          { name: "productShape", weight: 1 }, 
          { name: "sizeNames", weight: 0.8 },
        ],
        threshold:0.3,
        minMatchCharLength:2,
        ignoreLocation:true,
      });
    },[allVariants]);


    useEffect(()=>{
      const term=searchTerm.trim();

      if(!term){
        setFilteredVariants([]);
      }

      const result =fuse.search(term);
      setFilteredVariants(result.map((r)=>r.item));
    },[searchTerm,fuse]);

 

    return (
      <div className="min-h-screen w-full ">
        <div className="relative pt-7  md:pt-15 ">
          <h3 className="text-[16px]  xl:text-[18px] font-sans text-gray-600 font-medium px-7 xl:px-12">
            Search Warby Parker
          </h3>

          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full outline-none pt-2 pb-3  text-[32px] md:text-[44px] xl:text-[54px] px-7 xl:px-12 placeholder:text-gray-700 bg-transparent placeholder:font-serif placeholder:font-medium placeholder:tracking-[1px]   border-b border-gray-300
             focus:border-black "
          />

          <div className="absolute top-6 right-6 xl:right-10">
            <button onClick={() => navigate(-1)} className="cursor-pointer">
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
                class="lucide lucide-x-icon lucide-x"
                className="text-gray-500 w-7 h-7 hover:text-gray-700"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-7 xl:px-12 pt-4 mb-5 xl:mb-14 ">
          {!searchTerm.trim() ? (
            <div className="text-[19px] lg:text-[20px] text-gray-600">
              Start typing above to search our collection.
            </div>
          ) : filteredVaraints.length === 0 ? (
            <div className="text-[19px] lg:text-[20px]">
              <p className="text-gray-600">
                No frames found matching: <strong>{searchTerm}</strong>
              </p>
            </div>
          ) : (
            <div className=" mx-auto ">
              <p className=" text-[17px] md:text-[18px] xl:text-[20px] text-gray-600 ">
                {filteredVaraints.length === 1 ? "Result: " : "Results: "}
                <span className="text-blue-600 font-medium">
                  {filteredVaraints.length}
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5  lg:grid-cols-3 gap-y-9 lg:gap-y-18 xl:gap-y-25  mt-5 md:mt-10 ">
                {filteredVaraints.map((variant) => (
                  <VariantCard key={variant.id} variant={variant} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

