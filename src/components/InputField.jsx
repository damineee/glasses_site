import { useState } from "react";

export default function InputField({
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  isPasswordField = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = touched && error;

  return (
    <div className="flex flex-col text-left w-full">
      <div className="flex relative items-center">
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          className={`peer w-full h-14 pt-6 pb-1 text-gray-900 font-medium outline-none text-[15px] px-4 shadow-sm rounded-xl border transition-colors ${
            hasError
              ? "border-red-500 focus:border-gray-700 hover:border-gray-700"
              : "border-gray-300 focus:border-gray-700 hover:border-gray-700"
          }`}
        />
        <label
          htmlFor={name}
          className="absolute left-4 top-1/2 inset-y-0 pointer-events-none text-gray-600 font-medium transition-all duration-200 origin-left peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-[13px] peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[13px]"
        >
          {label}
        </label>

        {isPasswordField && (
          <button
            type="button"
            className="absolute right-4 cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-slash-fill"
                viewBox="0 0 16 16"
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            )}
          </button>
        )}
      </div>

      {hasError ? (
        <span className="text-red-600 text-[12px] mt-0.5 font-medium pl-1">
          {error}
        </span>
      ) : (
        <span className="h-5" />
      )}
    </div>
  );
}
