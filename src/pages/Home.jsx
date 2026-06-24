import hero_glases from "../assets/hero_glases.avif";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SlArrowRight } from "react-icons/sl";
import sport_glas from "../assets/girls_sport.avif";
import boaz from "../assets/boaz.avif";
//flex h-12 w-43 rounded-4xl bg-[#1050D0] overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#0b3fa3] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#1050D0]/30
export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  return (
    <div className="w-full pt-9 overflow-hidden">
      <section
        className="relative w-full h-[calc(100vh-20px)] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-start px-12"
        style={{ backgroundImage: `url(${hero_glases})` }}
      >
        <div className="text-[115px] font-extralight font-serif leading-30 tracking-tighter">
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

        <div className="flex flex-row pt-7 gap-3">
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
            className="flex h-12 w-43 rounded-4xl bg-[#1050D0] overflow-hidden  hover:bg-[#0b3fa3]  hover:shadow-lg hover:shadow-[#1050D0]/30 "
          >
            <Link
              to="/"
              className="h-full w-full flex items-center justify-center"
            >
              <p className="text-white font-semibold font-sans">
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
            className="flex h-12 w-43 rounded-4xl bg-[#072369] overflow-hidden  hover:bg-[#102b6d]  hover:shadow-lg hover:shadow-[#1050D0]/30 "
          >
            <Link
              to="/"
              className="h-full w-full flex items-center justify-center"
            >
              <p className="text-white font-semibold font-sans">
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
          className="pt-7"
        >
          <Link
            to="/"
            className="w-full h-full flex flex-row gap-2 items-center hover:opacity-80 transition-opacity"
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
          className="absolute bottom-3 left-0 px-12 flex flex-row justify-between items-center w-full text-[17px] font-semibold font-sans text-white"
        >
          <div className="">
            <Link
              to="/"
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
              to="/"
              className=" hover:opacity-80 transition-opacity
              "
            >
              Vision benefits accepted
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="flex flex-row w-full h-235">
        <Link to="/" className="w-1/2  relative group overflow-hidden">
          <img
            src={boaz}
            alt="Boaz shop"
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-12 bottom-17 flex flex-col ">
            <p className="text-3xl font-normal font-serif text-white pb-7">
              The sunglasses of the season
            </p>
            <div className="flex bg-white h-12 w-33 rounded-4xl items-center justify-center ">
              <p className="font-sans font-semibold text-[16px]">Shop Boaz</p>
            </div>
          </div>
        </Link>

        <Link to="/" className="group w-1/2  relative overflow-hidden">
          <img
            src={sport_glas}
            alt="Sport glasses"
            className="w-auto h-auto transition-transform duration-400 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-12 bottom-17 flex flex-col ">
            <p className="text-3xl font-medium font-serif text-white pb-7">
              Performance eyewear made
              <span className="block">in Italy</span>
            </p>

            <div className="flex bg-white h-12 w-33 rounded-4xl items-center justify-center ">
              <p className="font-sans font-semibold text-[16px]">Shop Sport</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
