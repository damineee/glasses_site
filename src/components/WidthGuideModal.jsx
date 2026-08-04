import { useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import FrameWidth_1 from "../assets/FrameWidth_1.webp";
import { div } from "framer-motion/client";
export default function WidthGuideModal({isOpen,onClose,product,selectedVariant,frameWidth}){
    const [showOtherMeasurements,setShowOtherMeasurements]=useState(false);
    const [showMeasurementsMeaning,setShowMeasurementsMeaning]=useState(false);
    
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 z-50"
            />

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed right-6 top-6 bottom-6 w-full max-w-[37rem] bg-white z-50  shadow-2xl border border-gray-200 rounded-3xl"
            >
              <div className="flex justify-between items-start pl-7 pr-5.5 py-6 border-b border-gray-200">
                <div className="">
                  <h2 className="text-[23px] font-serif">Width guide</h2>
                  <p className="text-[15px] font-medium text-gray-700 tracking-wide">
                    {product?.name} in {selectedVariant?.color_name}
                  </p>
                </div>
                <button onClick={onClose} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-x-icon lucide-x"
                    className="text-gray-700 w-7 h-7"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col px-7 py-4 overflow-y-auto h-full bg-[#FCFBF9]">
                <div className="flex flex-col w-full  border-gray-200 border rounded-xl overflow-hidden">
                  <div className="flex flex-row  gap-6.5 px-6 pt-6 pb-7 items-start">
                    <img
                      src={FrameWidth_1}
                      alt="frame_img"
                      className="object-contain w-[30%] "
                    />

                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-semibold">
                        Frame widths
                      </h3>
                      <p className="text-[16px] text-gray-600 font-medium leading-relaxed mt-0.5">
                        Our widths are determined by the overall frame width.
                        Choose a width that best corresponds with your own face.
                        (You won’t find this number on glasses.)
                      </p>
                    </div>
                  </div>

                  <div className="flex-row flex w-full divide-x divide-gray-200 ">
                    {selectedVariant?.product_sizes?.map((size, index) => {
                      const isSelected = frameWidth === size.size_name_slug;

                      return (
                        <div key={size.id} className="flex-col flex flex-1">
                          <div
                            className={`text-left text-[15px] border-t border-gray-200 bg-gray-50 pl-3 pt-2.5 pb-3 font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {size.size_name}
                          </div>

                          <div
                            className={`text-left text-[16px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium ${isSelected ? "text-black" : "text-gray-800"}`}
                          >
                            {size.frame_width_mm} mm
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-row py-5.5 gap-0.5 text-blue-700 hover:text-blue-900 items-center">
                  <button
                    onClick={() =>
                      setShowOtherMeasurements(!showOtherMeasurements)
                    }
                    className="text-[16px] cursor-pointer font-medium "
                  >
                    Other measurements
                  </button>

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
                    class="lucide lucide-chevron-down-icon lucide-chevron-down"
                    className="w-4 h-5"
                    animate={{rotate:showOtherMeasurements ? -180:0}}
                    transition={{duration:0.25,ease:"easeInOut"}}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
}