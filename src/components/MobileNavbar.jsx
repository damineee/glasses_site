import {Link} from "react-router-dom";
import glases_svg from "../assets/glases_nav.svg";
import { motion, AnimatePresence } from "framer-motion";
import {  useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useClikOutside from "../utils/hooks/useClickOutside";

export default function MobileNavbar({dbCategories,onOpenMenu}){
    const [showSubNav,setShowSubNav]=useState(true);
    const [lastScrollY,setLastScrollY]=useState(0);
    const {user,signOut}=useAuth();
    const [showUserMenu,setShowUserMenu]=useState(false);
    const userMenuRef=useRef(null);

    useClikOutside(userMenuRef,()=>{
      if(showUserMenu) setShowUserMenu(false);
    });
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setShowSubNav(false);
          setShowUserMenu(false);
        } else {
          setShowSubNav(true);
        }
        setLastScrollY(currentScrollY);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const displayName=user?.user_metadata?.username || user?.email?.split("@")[0] || "User";

    const handleSignOut=async()=>{
      setShowUserMenu(false);
      await signOut();
    };

    const threeCategories=dbCategories?.slice(0,4) || [];
    return (
      <div className="w-full flex flex-col   z-40">
        <div className="grid grid-cols-3 w-full h-12 bg-[#072369]  px-4 items-center text-white z-20 relative">
          <div className="flex flex-row  gap-3 items-center justify-self-start">
            <button onClick={onOpenMenu} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-menu-icon lucide-menu"
                className="h-5.5 sm:h-6 w-5.5 sm:w-6"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
            <Link
              to="/eyeglasses"
              className="flex flex-row gap-2 items-center hover:opacity-80 transition-opacity"
            >
              <img
                src={glases_svg}
                alt="icon"
                className="w-6 sm:w-5 text-center"
              />
              <p className="text-[15px] font-semibold font-sans hidden sm:block text-center tracking-tight">
                Premium eyewear, starting at $95
              </p>
            </Link>
          </div>
          <Link to="/" className="flex  justify-self-center whitespace-nowrap">
            <p className="font-[Arial] text-[14px] tracking-[4px] ">
              WARBY PARKER
            </p>
          </Link>

          <div className="flex flex-row items-center gap-3.5 justify-self-end">
            <Link to="/search" className="">
              <motion.div
                whileHover={{
                  scale: 1.06,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                whileTap={{
                  scale: 0.9,
                  y: 1,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                className=" hover:opacity-80  overflow-hidden "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </motion.div>
            </Link>

            {user ? (
              <div className="relative flex items-center" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="focus:outline-none cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.9, y: 1 }}
                    className={`hover:opacity-80 overflow-hidden ${
                      showUserMenu ? "text-blue-300" : "text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                      <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-9 -right-10 z-30 w-56 sm:w-67 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-gray-800"
                    >
                      <div className="absolute -top-1.5 right-11 w-3.5 h-3.5 bg-white border-t border-l border-gray-100 rotate-45" />
                      <div className="flex flex-col gap-2">
                        <div className="border-b border-gray-100 pb-2">
                          <p className="text-xs text-gray-400 font-medium mb-0.5">
                            Logged in as
                          </p>
                          <p className="text-[15px] sm:text-[17px] font-bold text-gray-900 truncate">
                            {displayName}
                          </p>
                          <p className="text-[12px] sm:text-[14px] text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>

                        <button
                          onClick={handleSignOut}
                          className="w-full mt-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm sm:text-[17px] font-semibold transition-colors cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.9, y: 1 }}
                  className="hover:opacity-80 overflow-hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-5 sm:w-6 h-5 sm:h-6"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </motion.div>
              </Link>
            )}
            <Link className="">
              <motion.div
                whileHover={{
                  scale: 1.06,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                whileTap={{
                  scale: 0.9,
                  y: 1,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                className=" hover:opacity-80  overflow-hidden "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-cart3"
                  viewBox="0 0 16 16"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showSubNav && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className=" z-10 bg-white h-12 w-full items-center shadow-[0_1px_0_0_white] border-b border-gray-100"
            >
              <div className="flex  h-full w-full items-center justify-between px-4">
                {threeCategories?.map((cat) => (
                  <Link
                    key={cat.id || cat.slug}
                    to={`/${cat.slug}`}
                    className="hover:text-gray-800 transition-colors text-black font-semibold text-[15px]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
}