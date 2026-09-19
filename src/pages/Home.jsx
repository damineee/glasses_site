import hero_glases from "../assets/hero_glases.avif";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import men_aero from "../assets/men_shopaero.webp";
import boaz from "../assets/boaz.avif";
import NewArrivalsSwiper from "../components/NewArrivalsSwiper";
import { div} from "framer-motion/client";
import vision4 from "../assets/visionBenfoto_4.avif";
import vision1 from "../assets/visionBenfoto_1.avif";
import vision2 from "../assets/visionBenfoto_2.avif";
import vision3 from "../assets/visionBenfoto_3.avif";
import InsuranceForm from "../components/InsuranceForm";

//flex h-12 w-43 rounded-4xl bg-[#1050D0] overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#0b3fa3] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#1050D0]/30


  



  const visionBenefits = [
    {
      id: 1,
      title: "Prescription eyeglasses",
      image: vision1,
      slug: "/eyeglasses",
    },
    {
      id: 2,
      title: "Prescription sunglasses",
      image: vision2,
      slug: "/sunglasses",
    },
    {
      id: 3,
      title: "Contacts",
      image: vision3,
      slug: "/contacts",
    },
    {
      id: 4,
      title: "Eye exams",
      image: vision4,
      slug: "/appointments/eye-exams/booking",
    },
  ];

  function AutoChangingSlidesShow(){
    const images = [davis, spectra, united, superior, bluecross];

    const [currentIndex,setCurrentIndex]=useState(0);

    useEffect(()=>{
      const intervalId=setInterval(()=>{
        setCurrentIndex((prevIndex)=>(prevIndex+1)%images.length);
      },1500);

      return ()=>clearInterval(intervalId);
    },[]);


    return (
      <div className="w-45 h-10">
        <img
          src={images[currentIndex]}
          alt={`Warby Parker Slide ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-opacity duration-1000 ease-in opacity-100"
        />
      </div>
    );
  }



export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  return (
    <div className="w-full pt-9 overflow-hidden">
      <section className="relative w-full lg:h-[calc(100vh-20px)] h-[calc(100vh-110px)]  flex flex-col lg:justify-center justify-end items-start lg:px-12 px-8 lg:pb-0  pb-5">
        <div className="absolute inset-0 ">
          <img
            src={hero_glases}
            alt="main_image"
            className="w-full h-full object-cover    object-center"
          />
        </div>
        <div className="flex  lg:hidden text-[45px] z-3 font-extralight font-serif ">
          <p>SEE SUMMER BETTER</p>
        </div>
        <div className="lg:block hidden text-[115px] z-3 font-extralight font-serif leading-30 tracking-tighter">
          <motion.p
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            SEE
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            SUMMER
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            BETTER
          </motion.p>
        </div>

        <div className="flex flex-wrap  w-full items-center lg:hidden  pt-4 gap-x-4 gap-y-1.5 z-3">
          <motion.button
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2, ease: "linear" },
            }}
            whileTap={{
              scale: 0.9,
              y: 1,
              transition: { duration: 0.3, ease: "linear" },
            }}
            className="flex  h-10 max-w-40 min-w-34 rounded-4xl bg-[#1050D0] overflow-hidden  hover:bg-[#0b3fa3]  hover:shadow-lg hover:shadow-[#1050D0]/30 "
          >
            <Link
              to="/"
              className="h-full w-full flex items-center justify-center"
            >
              <p className="text-white  text-[13px] font-semibold font-sans">
                Start with a quiz
              </p>
            </Link>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            whileTap={{
              scale: 0.9,
              y: 1,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="flex  h-10 max-w-40 min-w-34   rounded-4xl bg-[#072369] overflow-hidden  hover:bg-[#102b6d]  hover:shadow-lg hover:shadow-[#1050D0]/30 "
          >
            <Link
              to="/eyeglasses"
              className="h-full w-full flex items-center justify-center"
            >
              <p className="text-white  text-[13px] font-semibold font-sans">
                Shop eyeglasses
              </p>
            </Link>
          </motion.button>
        </div>
        <div className="hidden lg:flex flex-row pt-7 gap-3 z-3">
          <motion.button
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              x: { duration: 1.2, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2, ease: "linear" },
            }}
            whileTap={{
              scale: 0.9,
              y: 1,
              transition: { duration: 0.3, ease: "linear" },
            }}
            className="flex lg:h-12 lg:w-43  rounded-4xl bg-[#1050D0] overflow-hidden  hover:bg-[#0b3fa3]  hover:shadow-lg hover:shadow-[#1050D0]/30 "
          >
            <Link
              to="/"
              className="h-full w-full flex items-center justify-center"
            >
              <p className="text-white lg:text-[16px]  font-semibold font-sans">
                Start with a quiz
              </p>
            </Link>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              x: { duration: 1.2, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            whileTap={{
              scale: 0.9,
              y: 1,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="flex lg:h-12 lg:w-43   rounded-4xl bg-[#072369] overflow-hidden  hover:bg-[#102b6d]  hover:shadow-lg hover:shadow-[#1050D0]/30 "
          >
            <Link
              to="/eyeglasses"
              className="h-full w-full flex items-center justify-center"
            >
              <p className="text-white lg:text-[16px]  font-semibold font-sans">
                Shop eyeglasses
              </p>
            </Link>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="pt-7 z-3"
        >
          <Link
            to="/"
            className="w-full h-full hidden lg:flex flex-row gap-2 items-center hover:opacity-80 transition-opacity"
          >
            <p className="text-white font-sans text-[16px] font-semibold">
              Shop Summer
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="12"
              fill="white"
              class="bi bi-chevron-right"
              viewBox="0 -1 16 16"
              stroke="white"
              strokeWidth="1.5"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 21 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute z-3 bottom-3 left-0 px-12 hidden lg:flex flex-row justify-between items-center w-full text-[17px] font-semibold font-sans text-white"
        >
          <div className="">
            <Link
              to="/contacts"
              className=" hover:opacity-80 transition-opacity
              "
            >
              25% off first contacts order
            </Link>
          </div>
          <div>
            <p>Free shipping</p>
          </div>
          <div>
            <p>Free 30-day returns</p>
          </div>
          <div className="">
            <Link
              to="/insurance"
              className=" hover:opacity-80 transition-opacity
              "
            >
              Vision benefits accepted
            </Link>
          </div>
        </motion.div>
        <div className="absolute z-1 inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </section>

      <section className="flex md:flex-row flex-col w-full sm:h-250 md:h-150 lg:h-150 xl:h-200 h-190 ">
        <Link
          to="/sunglasses"
          className="lg:w-1/2 flex-1 w-full  relative group overflow-hidden"
        >
          <img
            src={boaz}
            alt="Boaz shop"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute lg:left-12 lg:bottom-17 bottom-8 left-7 flex flex-col ">
            <p className="lg:text-3xl text-[27px] font-normal font-serif text-white pb-7">
              The sunglasses of the season
            </p>
            <div className="flex bg-white h-12 w-44  rounded-4xl items-center justify-center shadow-sm">
              <p className="font-sans font-semibold lg:text-[16px] text-[15px] ">
                Shop Sunglasses
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/"
          className="group lg:w-1/2 flex-1 w-full  relative overflow-hidden"
        >
          <img
            src={men_aero}
            alt="Sport glasses"
            className="w-full h-full object-cover object-top  transition-transform duration-300 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute lg:left-12 lg:bottom-17 bottom-8 left-7 flex flex-col ">
            <p className="lg:text-3xl text-[27px] font-medium font-serif text-white pb-7">
              A new level of lightweight
            </p>

            <div className="flex bg-white h-12 w-44 rounded-4xl items-center justify-center shadow-sm">
              <p className="font-sans font-semibold lg:text-[16px] text-[15px] ">
                Shop Aero Series
              </p>
            </div>
          </div>
        </Link>
      </section>

      <div className="py-10  ">
        <NewArrivalsSwiper />
      </div>

      <div className="flex flex-col sm:px-15 px-6 sm:pt-8 pt-5 items-center justify-center">
        <h1 className="text-[30px] font-serif">
          Four ways to use your vision benefits
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  w-full gap-6 pt-5 ">
          {visionBenefits.map((benefits) => (
            <div
              key={benefits.id}
              className="flex flex-col relative overflow-hidden rounded-2xl aspect-[4/5] group"
            >
              <Link to={benefits.slug}>
                <img
                  src={benefits.image}
                  alt={benefits.title}
                  className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-102"
                />

                <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center">
                  <p className="bg-white text-black font-sans text-[16px] px-7 py-3 shadow-sm rounded-3xl font-semibold">
                    {benefits.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <InsuranceForm />
    </div>
  );
}
