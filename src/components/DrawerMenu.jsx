import { AnimatePresence, motion } from "framer-motion";
import { button, div } from "framer-motion/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus } from "lucide-react";
import { TfiApple } from "react-icons/tfi";
import { useAuth } from "../contexts/AuthContext";

function getSubcategoryUrl(sub, slug) {
  if (!sub.page_slug) return `/${slug}`;
  if (sub.page_slug === "page") return `/${slug}/${sub.filter_query}`;
  if (sub.page_slug === "color") return `/${slug}?colors=${sub.filter_query}`;
  if (sub.page_slug === "merch") return `/${slug}?merch=${sub.filter_query}`;
  if (sub.page_slug === "low") return `/${sub.filter_query}`;
  if (sub.page_slug === "price") return `/${slug}?prices=${sub.filter_query}`;
  return `/${slug}`;
}

const MeniuLinks = [
  {
    name: "Search",
    path: "/search",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
        className="w-5 h-5 "
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    ),
  },
  {
    name: "Find a store",
    path: "/retail",
    icon: (
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
        class="lucide lucide-store-icon lucide-store"
      >
        <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
        <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
        <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
      </svg>
    ),
  },
  {
    name: "25% off your first contacts order",
    path: "/contacts",
    icon: (
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
        class="lucide lucide-workflow-icon lucide-workflow"
      >
        <rect width="8" height="8" x="3" y="3" rx="2" />
        <path d="M7 11v4a2 2 0 0 0 2 2h4" />
        <rect width="8" height="8" x="13" y="13" rx="2" />
      </svg>
    ),
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="19"
        fill="currentColor"
        class="bi bi-heart"
        viewBox="0 0 16 16"
      >
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
      </svg>
    ),
  },
  {
    name: "Download our app",
    path: "/ios-app",
    icon: <TfiApple size={22} />,
  },
];

export default function DrawerMenu({isOpen,onClose,dbCategories}){
    const [selectedCategory,setSelectedCategory]=useState(null);
    const [openGroups,setOpenGroups]=useState({});
    const {user}=useAuth(); 
    useEffect(()=>{
        if(!isOpen){
            setSelectedCategory(null);
            setOpenGroups({});
        }
    },[isOpen]);

    const handleSelectCategory=(cat)=>{
      setSelectedCategory(cat);

      if(cat.subcategory_groups && cat.subcategory_groups.length>0){
        const initialState={};
        cat.subcategory_groups.forEach((group,index)=>{
          initialState[group.id]=index===0;
        });
        setOpenGroups(initialState);
      }else{
        setOpenGroups({});
      }
    };

    const toggleGroup= (groupId)=>{
        setOpenGroups((prev)=>({
            ...prev,
            [groupId]:!prev[groupId],
        }));
    };
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/30 z-50 xl:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full overflow-hidden w-full sm:w-[370px] bg-white z-50 flex flex-col border-r border-gray-200 "
            >
              <div className="flex flex-row items-center justify-between py-4  px-6">
                <AnimatePresence mode="wait">
                  {selectedCategory ? (
                    <motion.button
                      key={"back-button"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-1 text-gray-800 cursor-pointer text-[14px] font-semibold"
                    >
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
                        class="lucide lucide-chevron-left-icon lucide-chevron-left"
                        className="w-4 h-4 "
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      All
                    </motion.button>
                  ) : (
                    <div key="empty-spacer" className="w-8" />
                  )}
                </AnimatePresence>
                <h3 className="font-[Arial] font-semibold text-[16px] tracking-[3px] text-gray-600">
                  WARBY PARKER
                </h3>
                <button onClick={onClose} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-x-icon lucide-x"
                    className="text-gray-600 h-7 w-7"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1  items-start  overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!selectedCategory ? (
                    <motion.div
                      key="categories-list"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex flex-col h-full gap-2.5 px-6"
                    >
                      {dbCategories.map((cat, idx) => (
                        <button
                          key={cat.id || idx}
                          onClick={() => handleSelectCategory(cat)}
                          className="flex  flex-row justify-between cursor-pointer py-1 items-center w-full"
                        >
                          <span className="text-[21px] font-medium">
                            {cat.name}
                          </span>
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
                            class="lucide lucide-arrow-right-icon lucide-arrow-right"
                            className="text-gray-700 w-4 h-4"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </button>
                      ))}

                      <div className="flex flex-col gap-3 mt-3  text-blue-700 font-semibold text-[17px]">
                        {MeniuLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className="flex flex-row gap-2 items-center"
                          >
                            {link.icon}
                            <p className="text-center">{link.name}</p>
                          </Link>
                        ))}
                      </div>
                      {!user && (
                        <div>
                        <div className="mt-4 text-[16px] text-gray-700 font-semibold tracking-tight">
                        Sign in or create an account to shop, view orders,
                        manage prescriptions and more.
                      </div>

                      <div className="flex  flex-row sm:flex-col gap-x-2.5 gap-y-3 items-center w-full mt-3 mb-4 text-[16px] font-semibold">
                        <Link
                          to="/login"
                          className="flex flex-1 w-full rounded-3xl items-center justify-center py-3 text-white bg-blue-700 hover:bg-blue-900 transition-colors"
                        >
                          Sign In
                        </Link>

                        <Link
                          to="/register"
                          className="border border-gray-400 flex rounded-3xl  flex-1 w-full items-center justify-center py-3 "
                        >
                          Create account
                        </Link>
                      </div>
                      </div>
                    )}
                        
                      
                      
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`subcategories-${selectedCategory.id || selectedCategory.slug}`}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex flex-col  h-full gap-6 "
                    >
                      {selectedCategory.subcategory_groups.map((group) => {
                        const isExpanded = !!openGroups[group.id];

                        return (
                          <div key={group.id} className="px-7.5">
                            <button
                              onClick={() => toggleGroup(group.id)}
                              className="flex flex-row justify-between items-center w-full cursor-pointer"
                            >
                              <span className="text-gray-500 text-[21px] font-medium">
                                {group.group_name}
                              </span>

                              <div className="w-5 h-5 flex items-center justify-center">
                                {isExpanded ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-600"
                                  >
                                    <path d="M5 12h14" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-600"
                                  >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                  </svg>
                                )}
                              </div>
                            </button>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex flex-col gap-3.5 pl-5 pt-5.5">
                                    {group.subcategories.map((sub) => (
                                      <Link
                                        key={sub.id}
                                        to={getSubcategoryUrl(
                                          sub,
                                          selectedCategory.slug,
                                        )}
                                        onClick={onClose}
                                      >
                                        <span className="text-[18px] font-semibold">
                                          {sub.name}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}

                      <div className="mt-auto grid grid-cols-2 h-44 pt-2  flex-shrink-0 ">
                        <Link
                          to={`/${selectedCategory.slug}/${selectedCategory.women_link_url}`}
                          onClick={onClose}
                          className="relative h-full w-full overflow-hidden"
                        >
                          <img
                            src={selectedCategory.image_women_url}
                            alt={selectedCategory.women_text}
                            className="w-full h-full object-cover "
                          />
                          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-black text-[13px] font-semibold px-3 py-1.5 rounded-3xl shadow-sm whitespace-nowrap">
                            {selectedCategory.women_text}
                          </p>
                        </Link>
                        <Link
                          to={`/${selectedCategory.slug}/${selectedCategory.men_link_url}`}
                          onClick={onClose}
                          className="relative h-full w-full overflow-hidden"
                        >
                          <img
                            src={selectedCategory.image_men_url}
                            alt={selectedCategory.men_text}
                            className="w-full h-full object-cover "
                          />
                          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-black text-[13px] font-semibold px-3 py-1.5 rounded-3xl shadow-sm whitespace-nowrap">
                            {selectedCategory.men_text}
                          </p>
                        </Link>
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