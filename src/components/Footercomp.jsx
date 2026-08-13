
import { useState, useEffect, useEffectEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import footerimg from "../assets/footerimg.svg";
import { supabase } from "../utils/supabase";
import appstore from "../assets/appstore.svg";
import googleplay from "../assets/googleplay.svg";
import {
  FaTiktok,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";


const legalLinks = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Privacy Preferences", path: "/privacy-preferences" },
  { name: "Notice of Privacy Practices", path: "/notice-of-privacy-practices" },
  { name: "Terms of Use", path: "/terms-of-use" },
  { name: "Accessibility", path: "/accessibility" },
  { name: "CA Transparency Act", path: "/process/ca-transparency-act" },
  {
    name: "Do Not Sell or Share My Personal Information",
    path: "/do-not-sell-personal",
  },
  { name: "CA AB 1305 Disclosure", path: "/process/ca-ab-1305-disclosure" },
  {
    name: "Washington Health Data Policy",
    path: "/washington-health-data-policy",
  },
];

const footerLinks = [
  {
    title: "Products",
    links: [
      {
        name: "Eyeglasses",
        path: "/eyeglasses",
      },
      { name: "Sunglasses", path: "/sunglasses" },
      { name: "Contacts", path: "/contacts" },
      { name: "New collections", path: "/collections" },
      { name: "Accessories", path: "/accessories" },
      { name: "Gift cards", path: "/gift-card" },
      { name: "Intelligent Eyewear", path: "/intelligent-eyewear" },
    ],
  },
 {
    title: "Shop Online",
    links: [
      { name: "Advisor", path: "/ios-app" },
      { name: "Virtual Try-On", path: "/ios-app" },
      { name: "Download our app", path: "/ios-app" },
    ],
  
   secondaryGroup:{
    title: "Get a prescription",
    links: [
      { name: "Book an eye exam", path: "/appointments/eye-exams/booking" },
      { name: "Renew a prescription", path: "/virtual-vision-test" },
      { name: "Measure your PD", path: "/pd/instructions" },
    ],
  },
  tertiaryGroup:{
    title: "Visit a store",
    links: [{ name: "Find a location", path: "/retail" }],
  }
},
  {
    title: "Ways to save",
    links: [
      { name: "Insurance", path: "/insurance" },
      { name: "Flexible spending", path: "/flexible-spending-accounts" },
      { name: "20% off contacts", path: "/contacts-new-customer-offer" },
      { name: "Add a pair and save", path: "/add-a-pair-and-save" },
    ],
  
   secondaryGroup:{
    title: "Education",
    links: [
      { name: "Eyeglasses lens guide", path: "/eyeglasses/lenses" },
      { name: "Sunglasses lens guide", path: "/sunglasses/lenses" },
      { name: "Eyewear A to Z", path: "/learn/" },
      { name: "How our glasses are made", path: "/how-our-glasses-are-made" },
    ],
  }},
  {
    title: "About us",
    links: [
      { name: "Our story", path: "/history" },
      { name: "Buy a Pair, Give a Pair", path: "/buy-a-pair-give-a-pair" },
      { name: "Customer reviews", path: "/reviews/quality" },
      { name: "Jobs", path: "/careers" },
      { name: "Impact", path: "/impact-report" },
      { name: "Impact Foundation", path: "/impact-foundation" },
      { name: "Investors", path: "/investors" },
      { name: "Sitemap", path: "/sitemap" },
    ],
  },
];


const socialLinks = [
  {
    name: "tiktok",
    svgg: FaTiktok,
    path: "https://www.tiktok.com/@warbyparker",
  },
  {
    name: "facebook",
    svgg: FaFacebookF,
    path: "https://www.facebook.com/warbyparker/",
  },
  {
    name: "instagram",
    svgg: FaInstagram,
    path: "https://www.instagram.com/warbyparker/",
  },
  {
    name: "youtube",
    svgg: FaYoutube,
    path: "https://m.youtube.com/warbyparker",
  },
  {
    name: "x",
    svgg: FaTwitter,
    path: "https://x.com/warbyparker",
  },
];


export default function Footercomp() {

  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const [successMsg,setSuccessMsg]=useState("");


  const handleNewLetterSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true);
    const{error}=await supabase.from("newsletterSubscribers").insert([{email}]);
    setLoading(false);
    if(error){
      alert("A aparut o preblema la salvare:"+error.message);

    }else{
      setSuccessMsg("Successfully subscribed!");
      
      setEmail("");

      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }
  }


  return (
    <footer className="pt-5 w-full bg-white">
      <div className="lg:max-w-[85%] mx-auto md:max-w-full px-6 md:px-12 ">
        <div className="flex flex-col md:flex-row  justify-between items-start md:items-center pb-6 gap-y-3">
          <h3 className="font-serif text-[20px] ">
            Get the inside scoop on new frames, events, and more
          </h3>

          <form
            onSubmit={handleNewLetterSubmit}
            className="w-full md:w-[50%] lg:w-[38%] relative"
          >
            <div className="relative flex flex-row items-center border border-gray-200 rounded-2xl p-1  transition-all focus-within:border-gray-500 hover:border-gray-500 pr-2 has-[input:not(:placeholder-shown)]:border-gray-500">
              <input
                type="email"
                id="email_footer"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full h-13  pl-4 pr-2 pb-1 pt-6 bg-transparent text-black outline-none text-[15px] focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
              />
              <label
                htmlFor="email_footer"
                className="absolute left-5 pointer-events-none text-gray-700 text-[15px] font-medium transition-all duration-200 origin-left 
              peer-placeholder-shown:top-5
              peer-focus:top-1.5 peer-focus:text-[12px]
              peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[12px]"
              >
                Email address
              </label>
              {email.trim() && (
                <div className="w-10 h-10 aspect-square flex items-center justify-center animate-fade-in">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center  w-full h-full text-white bg-blue-600  rounded-lg shrink-0 cursor-pointer transition-colors  disabled:opacity-50"
                  >
                    {loading ? (
                      <p className="animate-pulse">...</p>
                    ) : (
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
                        class="lucide lucide-move-right-icon lucide-move-right"
                        className="h-5 w-5 text-white"
                      >
                        <path d="M18 8L22 12L18 16" />
                        <path d="M2 12H22" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
            {successMsg && (
              <div className="absolute -bottom-6 right-0">
                <p className=" text-green-500 font-semibold text-sm">
                  {successMsg}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className=" border-gray-300 border-t border-b  w-full ">
        <div className="grid grid-cols-1 md:grid-cols-6  pt-10 pb-5 px-14 ">
          {/* 1 */}
          <div className="space-y-3.5">
            <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
              {footerLinks[0].title}
            </h3>
            <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
              {footerLinks[0].links.map((link) => (
                <li key={link.name} className="w-full">
                  <Link
                    to={link.path}
                    className="hover:text-gray-900  block w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* 2 */}
          <div className="flex flex-col gap-10">
            <div className="space-y-3.5">
              <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
                {footerLinks[1].title}
              </h3>
              <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
                {footerLinks[1].links.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link
                      to={link.path}
                      className="hover:text-gray-900  block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
                {footerLinks[1].secondaryGroup?.title}
              </h3>
              <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
                {footerLinks[1].secondaryGroup?.links.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link
                      to={link.path}
                      className="hover:text-gray-900  block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
                {footerLinks[1].tertiaryGroup?.title}
              </h3>
              <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
                {footerLinks[1].tertiaryGroup?.links.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link
                      to={link.path}
                      className="hover:text-gray-900  block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 3 */}

          <div className="flex flex-col gap-10">
            <div className="space-y-3.5">
              <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
                {footerLinks[2].title}
              </h3>
              <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
                {footerLinks[2].links.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link
                      to={link.path}
                      className="hover:text-gray-900  block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
                {footerLinks[2].secondaryGroup?.title}
              </h3>
              <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
                {footerLinks[2].secondaryGroup?.links.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link
                      to={link.path}
                      className="hover:text-gray-900  block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
                {footerLinks[2].tertiaryGroup?.title}
              </h3>
              <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
                {footerLinks[2].tertiaryGroup?.links.map((link) => (
                  <li key={link.name} className="w-full">
                    <Link
                      to={link.path}
                      className="hover:text-gray-900  block w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4 */}
          <div className="space-y-3.5">
            <h3 className="text-[14px] font-bold text-shadow-gray-900 tracking-wide">
              {footerLinks[3].title}
            </h3>
            <ul className="space-y-3.5 text-[13.5px] text-gray-600 font-medium">
              {footerLinks[3].links.map((link) => (
                <li key={link.name} className="w-full">
                  <Link
                    to={link.path}
                    className="hover:text-gray-900  block w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5 */}
          {/* <div className="flex flex-col h-[96%] w-[1px] bg-gray-200  my-auto" /> */}
          <div className="flex flex-col col-span-2 justify-center items-center  border-gray-200 border-l my-3">
            <h3 className="text-[16px] font-semibold text-black">Need a hand?</h3>
            <p className="text-[14px] text-gray-700 font-medium text-center pt-2">
              We’re here to help. See frequently
              <br />
              asked questions and get in touch with
              <br />
              us
              <Link
                to="/help"
                className="underline underline-offset-2 text-blue-700 hover:text-blue-900 pl-1"
              >
                here
              </Link>
              <span>.</span>
            </p>

            <div className="flex flex-row items-center justify-center gap-5 pt-5">
              <Link to="/help" className="group">
                <div className="flex flex-col items-center gap-1.5">
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
                    class="lucide lucide-bell-ring-icon lucide-bell-ring"
                    className="text-[#757d85] w-5.5 h-5.5"
                  >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M22 8c0-2.3-.8-4.3-2-6" />
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                    <path d="M4 2C2.8 3.7 2 5.7 2 8" />
                  </svg>
                  <p className="text-[14px] text-gray-700 font-medium transition-colors group-hover:text-gray-950">
                    FAQ
                  </p>
                </div>
              </Link>
              <Link to="/help" className="group">
                <div className="flex flex-col items-center gap-1.5">
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
                    class="lucide lucide-messages-square-icon lucide-messages-square"
                    className="text-[#757d85] w-5.5 h-5.5"
                  >
                    <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
                  </svg>
                  <p className="text-[14px] text-gray-700 font-medium transition-colors group-hover:text-gray-950">
                    Chat
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-row gap-2 py-7">
              <a
                title="Download on the App Store"
                href="https://apps.apple.com/us/app/warby-parker/id1107693363"
                className="shadow-sm"
              >
                <img src={appstore} alt="AppStore_link" w-full h-full />
              </a>

              <a
                title="Download on the Google Play"
                href="https://play.google.com/store/apps/details?hl=en_US&id=com.warbyparker.app&referrer=singular_click_id%3D12036457-4e89-4b99-9010-15df625527b0"
                className="shadow-sm"
              >
                <img src={googleplay} alt="GooglePlay_link" w-full h-full />
              </a>
            </div>

            <div className="flex flex-row gap-4 ">
              {socialLinks.map((items) => {
                const IconComponent = items.svgg;
                return (
                  <a key={items.name} href={items.path} rel="noreferrer">
                    <IconComponent color="#3A434C" size={23} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
<div className="flex flex-col lg:flex-row flex-wrap  justify-start max-h-60 lg:justify-end gap-x-4 gap-y-4 text-gray-600 px-5  py-8 lg:px-13">
  {legalLinks.map((item)=>(
    <Link key={item.name} to={item.path} className="text-[12px] font-medium hover:text-gray-900">
      {item.name}
    </Link>
  ))}
</div>

      <img src={footerimg} alt="Footer_img" className="w-full  object-cover" />
    </footer>
  );
}
