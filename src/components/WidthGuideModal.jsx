import { useEffect, useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import FrameWidth_1 from "../assets/FrameWidth_1.webp";
import othermeasurementswidth from "../assets/othermeasurementswidth.webp";
import BridgeWidth from "../assets/BridgeWidth.webp";
import LensWidth from "../assets/LensWidth.webp";
import TempleLength from "../assets/TempleLength.webp";
export default function WidthGuideModal({isOpen,onClose,product,selectedVariant,frameWidth}){
    const [showOtherMeasurements,setShowOtherMeasurements]=useState(false);
    const [showMeasurementsMeaning,setShowMeasurementsMeaning]=useState(false);
    

    useEffect(() => {
      if (!isOpen) {
        setShowOtherMeasurements(false);
      }
      if (!showOtherMeasurements) {
        setShowMeasurementsMeaning(false);
      }
    }, [isOpen, showOtherMeasurements]);
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
              className="flex flex-col fixed right-6 top-6 bottom-6 w-full max-w-[37rem] bg-white z-50 overflow-hidden  shadow-2xl border border-gray-200 rounded-3xl"
            >
              <div className="flex justify-between items-start pl-7 pr-5.5 py-6 border-b border-gray-200">
                <div className="">
                  <h2 className="text-[23px] font-serif">Width guide</h2>
                  <p className="text-[15px] font-medium text-gray-700 tracking-wide">
                    {product?.name} in {selectedVariant?.color_name}
                  </p>
                </div>
                <button onClick={onClose} className="cursor-pointer">
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

              <div className="flex-1  px-7 py-4 overflow-y-auto bg-[#FCFBF9]">
                <div className="flex flex-col w-full  border-gray-200 border rounded-xl overflow-hidden">
                  <div className="flex flex-row  gap-6.5 px-6 pt-6 pb-7 items-start">
                    <img
                      src={FrameWidth_1}
                      alt="frame_img"
                      className="object-contain w-[30%] "
                    />

                    <div className="flex flex-col">
                      <h3 className="text-[17px] font-semibold">
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
                    {selectedVariant?.product_sizes?.map((size) => {
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

                <button
                  onClick={() =>
                    setShowOtherMeasurements(!showOtherMeasurements)
                  }
                  className="text-[16px] cursor-pointer font-medium flex flex-row py-5.5 gap-0.5 text-blue-700 hover:text-blue-900 items-center"
                >
                  <span> Other measurements </span>
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
                    className="w-4 h-4"
                    animate={{ rotate: showOtherMeasurements ? -180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {showOtherMeasurements && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col w-full  border-gray-200 border rounded-xl overflow-hidden">
                        <div className="flex flex-row  gap-6.5 px-6 pt-6 pb-7 items-start">
                          <img
                            src={othermeasurementswidth}
                            alt="measure_width"
                            className="object-contain w-[30%] "
                          />

                          <div className="flex flex-col">
                            <h3 className="text-[17px] font-semibold">
                              Compare lens width bridge-temple length with your
                              glasses
                            </h3>
                            <p className="text-[16px] text-gray-600 font-medium leading-relaxed mt-0.5">
                              For most glasses, these measurements are found on
                              the inside of the temple arm. If you have a pair
                              you like, compare it to those measurements.
                            </p>

                            <button
                              onClick={() =>
                                setShowMeasurementsMeaning(
                                  !showMeasurementsMeaning,
                                )
                              }
                              className="text-[16px] cursor-pointer font-medium flex flex-row pt-1 gap-0.5 text-blue-700 hover:text-blue-900 items-center"
                            >
                              <span> What do these measurements mean?</span>
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
                                className="w-4 h-4"
                                animate={{
                                  rotate: showMeasurementsMeaning ? -180 : 0,
                                }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                              >
                                <path d="m6 9 6 6 6-6" />
                              </motion.svg>
                            </button>
                            <AnimatePresence>
                              {showMeasurementsMeaning && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                  className="flex flex-col overflow-hidden mt-7 pb-3 px-2 gap-6"
                                >
                                  <div className="flex flex-row gap-5 items-start">
                                    <img
                                      src={LensWidth}
                                      alt="Lens_width_img"
                                      className="object-contain w-[30%]"
                                    />
                                    <div className="flex flex-col">
                                      <h3 className="text-[16px] font-semibold">
                                        Lens width
                                      </h3>
                                      <p className="text-[15px] text-gray-600 font-medium  mt-0.5">
                                        The horizontal diameter of one lens (and
                                        the first measurement in the series)
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-row gap-5 items-start">
                                    <img
                                      src={BridgeWidth}
                                      alt="Bridge_width_img"
                                      className="object-contain w-[30%]"
                                    />
                                    <div className="flex flex-col">
                                      <h3 className="text-[16px] font-semibold">
                                        Bridge
                                      </h3>
                                      <p className="text-[15px] text-gray-600 font-medium  mt-0.5">
                                        The width of the bridge (and the second
                                        measurement in the series)
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-row gap-5 items-start">
                                    <img
                                      src={TempleLength}
                                      alt="Temple_length_img"
                                      className="object-contain w-[30%]"
                                    />
                                    <div className="flex flex-col">
                                      <h3 className="text-[16px] font-semibold">
                                        Temple length
                                      </h3>
                                      <p className="text-[15px] text-gray-600 font-medium  mt-0.5">
                                        The length of the entire temple arm,
                                        from the front to the tip (and the last
                                        measurement)
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="flex-row flex w-full divide-x divide-gray-200 ">
                          <div className="flex-1 border-t border-gray-200  pl-3 pt-2.5 pb-3" />
                          <div className="flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium text-gray-700">
                            Lens width
                          </div>
                          <div className="flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium text-gray-700">
                            Bridge
                          </div>
                          <div className="flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium text-gray-700">
                            Temple length
                          </div>
                        </div>
                        {selectedVariant?.product_sizes?.map((size) => {
                          const isSelected = frameWidth === size.size_name_slug;
                          return (
                            <div
                              key={size.id}
                              className="flex-row flex w-full divide-x divide-gray-200 "
                            >
                              <div
                                className={`flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {size.size_name}
                              </div>

                              <div
                                className={`flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {size.lens_width_mm} mm
                              </div>

                              <div
                                className={`flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {size.bridge_mm} mm
                              </div>
                              <div
                                className={`flex-1 text-left text-[15px] border-t border-gray-200  pl-3 pt-2.5 pb-3 font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {size.temple_length_mm} mm
                              </div>
                            </div>
                          );
                        })}
                        {/* {selectedVariant?.product_sizes?.map(
                            (size, index) => {
                              const isSelected =
                                frameWidth === size.size_name_slug;

                              return (
                                <div
                                  key={size.id}
                                  className="flex-col flex flex-1"
                                >
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
                            },
                          )} */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
}