
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import { IoSearch, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { FaGlasses } from "react-icons/fa6";
import glases_svg from "../assets/glases_nav.svg";
import contact_svg from "../assets/contact_nav.svg";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
export default function Navbar(){
    const [isScrolled,setIsScrolled]=useState(false);
    const [isHovered,setIsHovered]=useState(false);
const menuItems = [
  { id: 1, name: "Eyeglasses", url: "/catalog?type=eyeglasses" },
  { id: 2, name: "Sunglasses", url: "/catalog?type=sunglasses" },
  { id: 3, name: "Contacts", url: "/contacts" },
  { id: 4, name: "Eye exams", url: "/exams" },
  { id: 5, name: "Insurance", url: "/insurance" },
  { id: 6, name: "Accessories", url: "/accessories" },
  { id: 7, name: "Style quiz", url: "/quiz" },
  {id:8,name:"Intelligent Eyewear",url:"/eyewear"},
];
    useEffect(()=>{
        const handleScroll=()=>{
            if (window.scrollY>20){
                setIsScrolled(true);
            }else{
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll',handleScroll);
        return ()=> window.removeEventListener('scroll',handleScroll);
    },[]);

    const isMenuWhite = isScrolled || isHovered;
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.20,
    },
  },
};

const itemm = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
    return (
      <header className="fixed top-0 left-0 w-full z-50 ">
        <div className="flex flex-row w-full h-10 bg-[#072369] justify-between px-12 items-center text-white">
          <FadeIn>
            <Link
              to="/"
              className="flex flex-row gap-2 items-center hover:opacity-80 transition-opacity"
            >
              <img src={glases_svg} alt="icon" className="h-5" />
              <p className="text-[16px] font-semibold font-sans">
                Premium eyewear, starting at $95
              </p>
            </Link>
          </FadeIn>

          <FadeIn>
            <Link to="/" className="flex items-center justify-center">
              <p className="font-[Arial] text-[19px] tracking-[4px]">
                WARBY PARKER
              </p>
            </Link>
          </FadeIn>

          <FadeIn>
            <Link
              to="/"
              className="flex flex-row gap-2 items-center hover:opacity-80 transition-opacity"
            >
              <img src={contact_svg} alt="icon" className="h-5" />
              <p className="text-[16px] font-semibold font-sans">
                25% off your first contacts order
              </p>
            </Link>
          </FadeIn>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full h-16 flex flex-row py-10 px-12 justify-between items-center  transition-all duration-300 ${
            isMenuWhite ? "bg-white " : "bg-transparent"
          }`}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-row gap-5 text-[16px] font-sans font-semibold "
          >
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="hover:text-[#3A434C] transition-colors"
              >
                <motion.p variants={itemm}>{item.name}</motion.p>
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="items-center justify-center flex flex-row gap-5"
          >
            <Link to="/">
              <motion.div
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                whileTap={{
                  scale: 0.9,
                  y: 1,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                className="border-1 h-12 w-31 rounded-4xl items-center justify-center flex gap-2    hover:border-gray-500  hover:opacity-90 overflow-hidden  hover:shadow-lg hover:shadow-[#1050D0]/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                <p className="font-semibold">Sign in</p>
              </motion.div>
            </Link>

            {/* {SearchBar} */}
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
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                  className="w-full h-full"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </motion.div>
            </Link>
            {/* {Inima} */}
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
                className="hover:opacity-85  relative"
              >
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

                <div className="absolute bottom-3 left-3 h-[15px] rounded-full w-[15px] bg-[#1050d0] flex items-center justify-center">
                  <p className="text-white text-[11px] font-semibold font-[Arial]">
                    1
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* {Cart} */}
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
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </header>
    );
}