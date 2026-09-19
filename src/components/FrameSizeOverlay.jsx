
import React from "react";

export default function FrameSizeOverlay({ sizeDetails }) {
  if (!sizeDetails) return null;

  const { frame_width_mm, lens_width_mm, lens_height_mm, bridge_mm } =
    sizeDetails;



  return (
    <div className="absolute inset-0  pointer-events-none flex items-center justify-center ">
      <div className="relative w-full  h-full">
        {/* 1.*/}
        {frame_width_mm && (
          <div className="absolute left-[30%] sm:left-[20%]   lg:left-[22%]    top-[25%] md:top-[18%]  lg:top-[30%]  right-[10%] flex flex-col items-center">
            <span className="bg-white lg:px-3 px-2 lg:py-0.5 text-[12px] lg:text-[15px] font-semibold text-gray-800 rounded-2xl shadow-xs mb-3">
              {frame_width_mm} mm
            </span>
            <div className="relative w-full h-[1px] bg-gray-600 text-gray-600  flex items-center justify-between">
              <div className="absolute -left-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </div>
              <div className="absolute -right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 2.  */}
        {lens_height_mm && (
          <div className="absolute left-[42%] sm:left-[40%]   lg:left-[40%]    top-[52%] md:top-[50%]  lg:top-[52%]  right-[10%]  h-[8%] md:h-[10%] lg:h-[7%] xl:h-[10%] flex items-center">
            <div className="h-full w-[1px] bg-gray-600 text-gray-600 relative flex flex-col items-center justify-between">
              <div className="absolute -top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3 rotate-90"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </div>
              <div className="absolute -bottom-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3 rotate-90"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <span className="bg-white lg:px-3 px-2 lg:py-0.5 text-[12px] lg:text-[15px] font-semibold text-gray-800 rounded-2xl absolute right-1/2  translate-x-1/2 top-1/2 -translate-y-1/2 shadow-xs ml-2 whitespace-nowrap">
                {lens_height_mm} mm
              </span>
            </div>
          </div>
        )}

        {/* 3. */}
        {lens_width_mm && (
          <div className="absolute right-[20%] sm:right-[20%]   lg:right-[20%]    top-[54%]   lg:top-[55%]  right-[10%] w-[8%]  lg:w-[15%]  flex flex-col items-center">
            <div className="w-full h-[1px] bg-gray-600 text-gray-600 relative flex items-center justify-between">
              <div className="absolute -left-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </div>
              <div className="absolute -right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
            </div>
            <span className="bg-white lg:px-3 px-2 lg:py-0.5 text-[12px] lg:text-[15px] font-semibold text-gray-800 rounded-2xl absolute shadow-xs right-1/2  translate-x-1/2  translate-y-0 -bottom-8 xl:bottom-1/2 xl:translate-y-1/2 text-nowrap">
              {lens_width_mm} mm
            </span>
          </div>
        )}

        {/* 4. */}
        {bridge_mm && (
          <div className="absolute bottom-[30%]  sm:bottom-[30%]   left-[55%] sm:left-[53%] md:left-[51%]  xl:left-[51%] w-[6%] lg:w-[10%] xl:w-[12%] 2xl:left-[49%] flex flex-col items-center">
            <div className="w-full h-[1px] bg-gray-600 text-gray-600 relative flex items-center justify-between">
              <div className="absolute -left-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
              </div>
              <div className="absolute -right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                  className="w-3 h-3"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
            </div>
            <span className="bg-white lg:px-3 px-2 lg:py-0.5 text-[12px] lg:text-[15px] font-semibold text-gray-800 rounded-2xl absolute shadow-xs left-1/2  -translate-x-1/2 translate-y-0 -bottom-10 xl:bottom-1/2 xl:translate-y-1/2 text-nowrap">
              {bridge_mm} mm
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
