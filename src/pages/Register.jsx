import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../components/InputField";
export default function Register() {
    
    const {signUp}=useAuth();
  const navigate=useNavigate();
    const [loginData,setLoginData]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
  const [errors, setErrors] = useState({});
  const [touched,setTouched]=useState({});
  const [serverError,setServerError]=useState("");
  const [loading, setLoading] = useState(false);


    const validate=(data)=>{
        const errs={};
        if(!data.username.trim()){
            errs.username = "Username required";
        }else if(data.username.length<3){
            errs.username = "Username must have at least 3 characters.";
        }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!data.email.trim()){
            errs.email="Email required";
        }else if(!emailRegex.test(data.email)){
            errs.email = "Invalid email address,should contain @.";
        }

        if (!data.password) {
      errs.password = "Password required";
    } else {
      if (!/^[A-Z]/.test(data.password)) {
        errs.password = "Password must start with an uppercase letter.";
      } else if (data.password.length < 8) {
        errs.password = "Password must be at least 8 characters long.";
      } else if (!/[a-z]/.test(data.password)) {
        errs.password = "Password must contain at least one lowercase letter.";
      } else if (!/[0-9]/.test(data.password)) {
        errs.password = "Password must contain at least one digit.";
      }
    }
        if (!data.confirmPassword) {
      errs.confirmPassword = "Confirm password.";
    } else if (data.password !== data.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
    };


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

    
  

  const handleSignUp=async(e)=>{
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

    const {error}=await signUp(loginData.email,loginData.password,loginData.username);
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
          <p className="py-3 font-serif font-medium text-[23px]">Sign up</p>
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

          <form onSubmit={handleSignUp} noValidate className="w-full space-y-2">
            <InputField
              name="username"
              label="Username"
              value={loginData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
              touched={touched.username}
            />
            <InputField
              name="email"
              label="Email address"
              type="email"
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
            <InputField
              name="confirmPassword"
              label="Confirm password"
              type="password"
              isPasswordField={true}
              value={loginData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <span className="text-[13px] font-medium text-gray-700">
              By creating an account, you agree to our
              <Link
                to="/terms-of-use"
                target="_blank"
                className="text-blue-700 text-[14px] font-semibold whitespace-nowrap"
              >
                {" "}
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                target="_blank"
                className="text-blue-700 text-[14px] font-semibold whitespace-nowrap"
              >
                Privacy Policy.
              </Link>
            </span>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 mt-4 transition-colors text-white cursor-pointer py-3 font-semibold rounded-3xl flex items-center justify-center"
            >
              {loading ? (
                <span className="animate-pulse">Creating account...</span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
        <div className="flex flex-row items-center justify-start px-6 pb-2 text-[13px] font-semibold text-gray-700 mt-5 gap-1">
          <p className="items-start">Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-800  text-[14px] hover:text-blue-900"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
