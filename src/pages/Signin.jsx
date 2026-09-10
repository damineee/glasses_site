import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../components/InputField";

export default function Singin(){
    const {signIn} =useAuth();
    const navigate=useNavigate();
    const [loginData,setLoginData]=useState({
        email:"",
        password:"",
    });

    const [errors,setErrors]=useState({});
    const [touched,setTouched]=useState({});
    const [serverError,setServerError]=useState("");
    const [loading,setLoading]=useState(false);

    const validate=(data)=>{
        const errs={};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const val=data.email.trim();
        if(!val){
            errs.email="Email or username required";
        }else if(val.includes("@") && !emailRegex.test(val) ){
            errs.email="Invalid email address,should contain @.";
        }

        if (!data.password) {
      errs.password = "Password required";
    }
        return errs;
    }

     const handleChange=(e)=>{
        const {name,value}=e.target;
        const updatedLogin={...loginData,[name]:value};

        setLoginData(updatedLogin);

        if(touched[name]){
            setErrors(validate(updatedLogin));
        }
    };

    const handleBlur=(e)=>{
        const {name}=e.target;
        const updatedTouched={...touched,[name]:true};
        setTouched(updatedTouched);
        setErrors(validate(loginData));
    };

    
  

  const handleSignIn=async(e)=>{
    e.preventDefault();
    setServerError("");

    const allTouched=Object.keys(loginData).reduce(
        (acc,key)=>({...acc,[key]:true}),
        {}
    );
    setTouched(allTouched);

    const validationErrors=validate(loginData);
    setErrors(validationErrors);

    if(Object.keys(validationErrors).length>0) return;

    setLoading(true);

    const {error}=await signIn(loginData.email,loginData.password);
    setLoading(false);


    if(error){
        setServerError(error.message);
        
    }else{
        navigate("/");
    }
    
  };
     return (
       <div className="flex flex-col bg-[#F5F5F5] h-screen items-center justify-center p-4">
         <div className="bg-white flex flex-col rounded-xl shadow-md border w-full max-w-[350px] sm:max-w-[400px] xl:max-w-[440px] border-gray-200  py-5">
           <div className="flex flex-col px-6 items-center justify-center w-full h-full relative">
             <Link
                      to="/"
                        title="Home"
                        className="absolute cursor-pointer top-0 left-4 transition-opacity hover:opacity-85  "
                      >
                        <IoChevronBack size={22} />
                      
                      </Link>
             <h2 className="text-[15px] font-semibold font-[Arial]  tracking-[2px]">
               WARBY PARKER
             </h2>
             <p className="py-3 font-serif font-medium text-[23px]">Log in</p>
             {serverError && (
               <div className="w-full flex relative items-center justify-center p-2 bg-[#FEDCE0] border border-[#DCC0C4] text-[#871F26] text-sm rounded-md font-medium text-center mb-3">
                 <span> {serverError}</span>

                 <button
                   type="button"
                   onClick={() => setServerError("")}
                   className="cursor-pointer absolute right-2 "
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
                     class="lucide lucide-x-icon lucide-x"
                     className="text-[#B76C71] w-5 h-5 "
                   >
                     <path d="M18 6 6 18" />
                     <path d="m6 6 12 12" />
                   </svg>
                 </button>
               </div>
             )}

             <form
               onSubmit={handleSignIn}
               noValidate
               className="w-full space-y-2"
             >
               <InputField
                 name="email"
                 label="Email or username"
                 type="text"
                 value={loginData.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={errors.email}
                 touched={touched.email}
               />
               <InputField
                 name="password"
                 label="Password"
                 type="password"
                 isPasswordField={true}
                 value={loginData.password}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={errors.password}
                 touched={touched.password}
               />

               <button
                 type="submit"
                 disabled={loading}
                 className="w-full bg-blue-700 hover:bg-blue-800 mt-3 transition-colors text-white cursor-pointer py-3 font-semibold rounded-3xl flex items-center justify-center"
               >
                 {loading ? (
                   <span className="animate-pulse">Log in into account..</span>
                 ) : (
                   "Log in"
                 )}
               </button>
             </form>
           </div>
           <div className="flex flex-row items-center justify-start px-6 pb-2 text-[13px] font-semibold text-gray-700 mt-5 gap-1">
             <p className="items-start">Don't have an account?</p>
             <Link
               to="/register"
               className="text-blue-800  text-[14px] hover:text-blue-900"
             >
               Sign up
             </Link>
           </div>
         </div>
       </div>
     );
}