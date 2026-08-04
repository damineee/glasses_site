import { useState,useEffect } from "react";
import { supabase } from "../utils/supabase";
import warby from "../assets/warby.svg";
import davis from "../assets/davis.svg";
import superior from "../assets/superior.svg";
import spectra from "../assets/spectra.svg";
import united from "../assets/united.svg";
import bluecross from "../assets/bluecross.svg";
import { div } from "framer-motion/client";
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

export default function InsuranceForm(){
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      zipCode: "",
      isDependent: false,
      policyholderFirstName: "",
      policyholderLastName: "",
      policyholderDateOfBirth: ""
    });

    const [errors,setErrors]=useState({});
    const [touched,setTouched]=useState({});
    const [loading,setLoading]=useState(false);
    const [successMsg,setSuccessMsg]=useState("");


    const validate=(data)=>{
        const errs={};

        if(!data.firstName.trim()) errs.firstName="First name is required.";
        if(!data.lastName.trim()) errs.lastName="Last name is required.";
        if(!data.dateOfBirth) errs.dateOfBirth="Date of birth is required.";
        if(!/^\d{5}$/.test(data.zipCode.trim())) errs.zipCode="Enter a valid zip code.";


        if(data.isDependent){
            if(!data.policyholderFirstName.trim()) errs.policyholderFirstName = "First name is required.";
            if (!data.policyholderLastName.trim()) errs.policyholderLastName = "Last name is required.";
            if(!data.policyholderDateOfBirth) errs.policyholderDateOfBirth = "Date of birth field is required.";
        }
        return errs;
    }

    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target;
        const val=type==="checkbox"?checked:value;
        const updatedForm={...formData,[name]:val};

        setFormData(updatedForm);

        if(touched[name]){
            setErrors(validate(updatedForm));
        }
    };
    const handleBlur=(e)=>{
        const {name}=e.target;
        const updateTouched={...touched,[name]:true};
        setTouched(updateTouched);
        setErrors(validate(formData));

    };
const handleSubmit=async(e)=>{
    e.preventDefault();

    const allTouched=Object.keys(formData).reduce(
        (acc,key)=>({...acc,[key]:true}),
        {}
    );
    setTouched(allTouched);

    const validationErrors=validate(formData);
    setErrors(validationErrors);

    if(Object.keys(validationErrors).length>0) return;
     setLoading(true);
     setSuccessMsg("");

     const { error } = await supabase.from("insurance_claims").insert([
       {
         first_name: formData.firstName,
         last_name: formData.lastName,
         date_of_birth: formData.dateOfBirth,
         zip_code: formData.zipCode,
         is_dependent: formData.isDependent,
         policyholder_first_name: formData.isDependent
           ? formData.policyholderFirstName
           : null,
         policyholder_last_name: formData.isDependent
           ? formData.policyholderLastName
           : null,
         policyholder_date_of_birth: formData.isDependent
           ? formData.policyholderDateOfBirth
           : null,
       },
     ]);
     setLoading(false);
     if(error){
        alert("A aparut eroare la salvare.");
     }else{
        setSuccessMsg("Information  submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          zipCode: "",
          isDependent: false,
          policyholderFirstName: "",
          policyholderLastName: "",
          policyholderDateOfBirth: "",
        });
        setTouched({});
        setErrors({});
     }
};


const renderInput=(name,label,type="text",maxLength,colSpan="col-span-4")=>{
    const value =formData[name];
    const hasError=touched[name] && errors[name];

    return (
      <div className={`flex flex-col text-left ${colSpan}`}>
        <div className="relative">
          <input
            type={type}
            name={name}
            id={name}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            className={`peer w-full h-14 px-4 pt-6 pb-1 shadow-sm rounded-xl bg-white text-gray-800 font-medium outline-none transition-all border ${
              hasError
                ? "border-red-500 "
                : "border-transparent focus:border-gray-400"
            }`}
          />
          <label
            htmlFor={name}
            className="absolute left-4 pointer-events-none text-gray-600 font-medium transition-all duration-200 origin-left peer-placeholder-shown:top-4 
          peer-focus:top-2 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[11px]"
          >
            {label}
          </label>
        </div>
        {hasError && (
          <span className="text-[#ff8383] text-[11px] mt-1 font-medium pl-1">
            {errors[name]}
          </span>
        )}
      </div>
    );
}

    return (
      <div className="flex flex-col mx-15 my-15 bg-[#061f5e] items-center gap-4 py-10 rounded-2xl  justify-center">
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="w-45">
            <img
              src={warby}
              alt="warby"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <AutoChangingSlidesShow />
        </div>

        <p className="text-[50px] font-serif text-white">
          It’s easy to use your insurance
        </p>
        <div className="text-[19px] font font-serif text-white items-center justify-center flex flex-col">
          <p>
            Enter your information to see if you have eligible benefits for
            frames, contacts, or eye exams. If you do,
          </p>
          <span>
            we’ll apply them automatically. This may vary by state or plan.
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="max-w-4xl mx-auto mt-2"
        >
          <div className="grid md:grid-cols-12 gap-4 mb-10">
            {renderInput(
              "firstName",
              "First name",
              "text",
              undefined,
              "col-span-4",
            )}
            {renderInput(
              "lastName",
              "Last name",
              "text",
              undefined,
              "col-span-4",
            )}
            {renderInput(
              "dateOfBirth",
              "Date of birth",
              "date",
              undefined,
              "col-span-2 ",
            )}
            {renderInput("zipCode", "Zip code", "text", 5, "col-span-2")}
          </div>

          <div className="flex items-center justify-center gap-2.5 cursor-pointer select-none text-white">
            <input
              type="checkbox"
              id="isDependent"
              name="isDependent"
              checked={formData.isDependent}
              onChange={handleChange}
              className="w-5.5 h-5.5 border-lg rounded border-gray-300 cursor-pointer accent-white"
            />
            <label
              htmlFor="isDependent"
              className="text-[15px] cursor-pointer font-medium"
            >
              I am a dependent on this insurance policy
            </label>
          </div>
          {formData.isDependent && (
            <div className="grid md:grid-cols-12 gap-4 mt-9">
              {renderInput(
                "policyholderFirstName",
                "Policyholder’s first name",
                "text",
                undefined,
                "col-span-4",
              )}
              {renderInput(
                "policyholderLastName",
                "Policyholder’s last name",
                "text",
                undefined,
                "col-span-4",
              )}
              {renderInput(
                "policyholderDateOfBirth",
                "Policyholder’s date of birth",
                "date",
                undefined,
                "col-span-4",
              )}
            </div>
          )}
          <div className="flex flex-col gap-3 items-center justify-center mt-7">
            <button
              type="submit"
              disabled={loading}
              className="bg-white font-semibold px-6 py-3 rounded-4xl shadow-sm disabled:opacity-50  cursor-pointer text-[16px] "
            >
              {loading ? (
                <p className="animate-pulse">Checking...</p>
              ) : (
                "Check my benefits"
              )}
            </button>
            {successMsg && (
              <p className=" text-green-300 font-semibold text-sm">
                {successMsg}
              </p>
            )}
          </div>
        </form>
      </div>
    );  

}

