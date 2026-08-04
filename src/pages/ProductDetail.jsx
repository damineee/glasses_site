import React,{useEffect,useState} from "react";
import { useParams,useSearchParams ,Link} from "react-router-dom";
import { supabase } from "../utils/supabase";
import { div, object } from "framer-motion/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import RatingStars from "../components/RatingStars";
import file_singlevision from "../assets/file_singlevision.svg";
import glassesProd from "../assets/glassesProd.svg";
import antireflective from "../assets/anti-reflective.svg";
import insurance from "../assets/insurance.svg";
import replacement from "../assets/replacement.svg";
import WidthGuideModal from "../components/WidthGuideModal";
export default function ProductDetail(){
    const {category,productSlug,colorSlug}=useParams();

    const [SearchParams,setSearchParams]=useSearchParams();
    const frameWidth=SearchParams.get("w") ||"medium";
    
    const [product,setProduct] =useState(null);
    const [selectedVariant,setSelectedVariant]=useState(null);
    const [loading,setLoading]=useState(true);
    const [activeImage,setActiveImage]=useState(null);
      const [activeImageType,setActiveImageType]=useState(null);
   const [isOpenWidthMenu,setisOpenWidthMenu]=useState(false);

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

                const images = (variant?.variant_images || []).sort(
                  (a, b) => (a.display_order || 0) - (b.display_order || 0)
                );

                if (images.length>0){
                  setActiveImage(images[0].image_url);
                  setActiveImageType(images[0].image_type)
                }else{
                  setActiveImage(variant?.main_image_url);
                  setActiveImageType(images[0].image_type);
                }



                const availableSizes=variant?.product_sizes || [];
                const hasCurrentSize = availableSizes.some(
                  (s)=>s.size_name_slug===frameWidth
                );

                if(!hasCurrentSize && availableSizes.length>0){
                  setSearchParams({w:availableSizes[0].size_name_slug},{replace:true});
                }


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

  const galleryImages = (selectedVariant?.variant_images || []).sort(
  (a, b) => (a.display_order || 0) - (b.display_order || 0),
);
  const galletyColor = (product?.product_variants || []).sort(
    (a,b)=>  (a.display_order || 0) - (b.display_order || 0),
  );

const isModel = activeImageType === "model_women" || activeImageType === "model_men";

    useEffect(()=>{
      if(isOpenWidthMenu){
        document.body.style.overflow="hidden";
      }else{
        document.body.style.overflow="unset";
      }
      return ()=>{document.body.style.overflow="unset";}
    },[isOpenWidthMenu]);


    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      );
    }

    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Produsul nu a fost găsit.
        </div>
      );
    }


    return (
      <div className="mt-30 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          <div className="flex lg:col-span-8 bg-[#faf7f3] h-[calc(100vh-200px)] md:h-[calc(100vh-280px)] lg:h-[calc(100vh-80px)] w-full   relative ">
            <div className=" absolute inset-0 h-full w-full items-center justify-center ">
              <button className=" w-full h-full cursor-pointer bg-transparent">
                <img
                  src={
                    activeImage || selectedVariant?.variant_images[0].image_url
                  }
                  alt={selectedVariant?.color_name}
                  className={`w-full h-full ${
                    isModel
                      ? "object-cover object-center"
                      : "object-contain object-center pt-10 pr-10 pl-40 lg:pt-20 lg:pl-50 lg:pr-15 xl:pt-20 xl:pl-60 xl:pr-30 "
                  }`}
                />
              </button>
            </div>

            {galleryImages.length > 0 && (
              <div className="sticky top-0 h-full z-20 w-20 pl-13 pt-20 flex items-center pointer-events-none self-start">
                <div className="w-full pointer-events-auto">
                  <Swiper
                    direction={"vertical"}
                    slidesPerView={4}
                    spaceBetween={10}
                    mousewheel={true}
                    modules={[Mousewheel]}
                    className="w-20 h-[350px]"
                  >
                    {galleryImages.map((imgObj) => {
                      const isSelected = activeImage === imgObj.image_url;
                      const imageType =
                        imgObj.image_type === "model_women" ||
                        imgObj.image_type === "model_men";
                      return (
                        <SwiperSlide key={imgObj.id} className="">
                          <button
                            onClick={() => {
                              setActiveImage(imgObj.image_url);
                              setActiveImageType(imgObj.image_type);
                            }}
                            className={`w-full h-full rounded-xl  border overflow-hidden bg-white  cursor-pointer transition-color duration-100 ${
                              isSelected
                                ? "border-blue-900"
                                : "border-gray-300 hover:border-gray-600"
                            }`}
                          >
                            <img
                              src={imgObj.image_url}
                              alt={imgObj.image_type}
                              className={`w-full h-full  ${imageType ? "object-contain  scale-135 blur-[0.2px]" : "object-contain  scale-90 "}`}
                            />
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:col-span-4 px-6 pt-7">
            {/* {loading ? (
          <div className="w-50 h-20 animate-pulse " />
        ) : (
          <div className="overflow-hidden w-50 h-20">
            <img
              src={selectedVariant?.main_image_url}
              alt={selectedVariant?.color_name}
              className="w-full h-full object-contain"
            />
          </div>
        )} */}
            <div className="flex flex-row items-center text-[12px] gap-1 text-gray-700 whitespace-nowrap overflow-x-auto no-scrollbar">
              <Link to="/" className="hover:underline hover:text-gray-950">
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
                className="w-2 h-3"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>

              <Link
                to={`/${category}`}
                className="hover:underline capitalize hover:text-gray-950"
              >
                {category}
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
                className="w-2 h-3"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>

              <span className="text-black font-semibold">{product.name}</span>
            </div>
            <div className="flex flex-col pt-2 relative">
              <h2 className="pl-[1px] text-[31px] font-medium font-serif">
                {product.name}
              </h2>

              <p className="text-gray-700 text-[17px] font-semibold">
                Starting at ${product.base_price}
              </p>

              <p className="text-[#096258] font-semibold text-[17px] pt-[2px]">
                20% off extra Rx pairs
              </p>
              <div className="absolute  right-2 bottom-8">
                <RatingStars
                  rating={product.rating}
                  totalReviews={product.rating_count}
                />
              </div>
              <div className="h-[1px] rounded-2xl w-full bg-gray-200 my-2" />
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row items-center gap-3">
                <p className="text-[16px] text-black font-semibold">Color </p>
                <p className="text-[16px] font-medium text-gray-700">
                  {selectedVariant?.color_name}
                </p>
              </div>
              <div className="flex  items-center gap-4 pt-3 px-1">
                {galletyColor.map((variant) => (
                  <Link
                    key={variant.id}
                    to={`/${category}/${productSlug}/${variant.color_name_slug}?w=${frameWidth}`}
                    className="flex items-center justify-center bg-white rounded-full   transition-all relative group"
                  >
                    <img
                      src={variant.color_hex}
                      alt={variant.color_name}
                      className="w-6 h-6 z-10"
                    />
                    <div
                      className={`bg-white absolute inset-0 rounded-full border transition-all duration-200 ${
                        selectedVariant?.id === variant.id
                          ? "border-gray-700 scale-128"
                          : "border-white  group-hover:border-gray-400 group-hover:scale-128 "
                      }`}
                    />
                  </Link>
                ))}
              </div>
              <div className="flex  flex-row items-center justify-between pt-6">
                <p className="text-[16px] font-semibold">Width</p>

                <div className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-ruler-icon lucide-ruler"
                    className="text-blue-700 w-4 h-4"
                  >
                    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
                    <path d="m14.5 12.5 2-2" />
                    <path d="m11.5 9.5 2-2" />
                    <path d="m8.5 6.5 2-2" />
                    <path d="m17.5 15.5 2-2" />
                  </svg>

                  <button
                    onClick={() => setisOpenWidthMenu(!isOpenWidthMenu)}
                    className="text-[13px] text-blue-700 font-bold cursor-pointer hover:text-blue-800"
                  >
                    Width guide
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5 py-2">
                {selectedVariant?.product_sizes?.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleWidthChange(size.size_name_slug)}
                    className={`md:w-35 lg:w-23 h-11 text-[14px] font-bold text-black border rounded-lg transition-all cursor-pointer items-center justify-center ${
                      frameWidth === size.size_name_slug
                        ? "  border-black"
                        : "  border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {size.size_name}
                  </button>
                ))}
              </div>
              <div className="h-[1px] rounded-2xl w-full bg-gray-200 mt-5" />
            </div>
            <div className="flex flex-col mt-6 gap-2">
              <Link
                to=""
                
                className=" flex bg-[#1050D0] rounded-4xl text-white w-full h-12 items-center justify-center transition-color duration-200 hover:bg-blue-800 
                     "
              >
                <p className="text-[16px] font-sans font-semibold ">
                  Select lenses and buy
                </p>
              </Link>

              <div className="flex flex-row items-center justify-center gap-3.5 pt-2">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-truck-icon lucide-truck"
                    className="text-gray-500 w-4 h-4"
                  >
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                    <path d="M15 18H9" />
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                    <circle cx="17" cy="18" r="2" />
                    <circle cx="7" cy="18" r="2" />
                  </svg>

                  <p className="text-black text-[12px] font-semibold">
                    Free shipping
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-package-icon lucide-package"
                    className="text-gray-500 w-4 h-4"
                  >
                    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                    <path d="M12 22V12" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <path d="m7.5 4.27 9 5.15" />
                  </svg>
                  <p className="text-black text-[12px] font-semibold">
                    Free returns
                  </p>
                </div>
              </div>

              <div className="flex flex-col mt-5 bg-[#F6F7F5] w-full py-5 rounded-lg px-5 gap-4">
                <p className="font-sans text-[22px] font-medium">
                  Everything included for ${product?.base_price}
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <img
                      src={file_singlevision}
                      alt="file_singlevision_img"
                      className=""
                    />
                    <p className="text-black text-[15px] font-medium  ">
                      Single-vision prescriptions
                    </p>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <img src={glassesProd} alt="glasses_img" className="" />
                    <p className="text-black text-[15px] font-medium  ">
                      Polycarbonate lenses
                    </p>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <img
                      src={antireflective}
                      alt="antireflective_img"
                      className=""
                    />
                    <p className="text-black text-[15px] font-medium  ">
                      Anti-reflective and scratch-resistant lens coatings
                    </p>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <img src={replacement} alt="replacement_img" className="" />
                    <p className="text-black text-[15px] font-medium  ">
                      Free scratched lens replacement
                    </p>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <img src={insurance} alt="insurance_img" className="" />
                    <p className="text-black text-[15px] font-medium  ">
                      FSA, HSA, and insurance accepted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                <WidthGuideModal 
                isOpen={isOpenWidthMenu} 
                onClose={()=>setisOpenWidthMenu(false)}
                  product={product}
                  selectedVariant={selectedVariant}
                  frameWidth={frameWidth}/>
      </div>
    );
}