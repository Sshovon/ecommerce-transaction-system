import React, { useContext, useEffect, useState } from "react";
import "../../assets/main.css";

import { StepperContext } from "../../contexts/StepperContext";
import Timer from "../Timer";
import toast, { Toaster } from "react-hot-toast";


function OTP() {
  const [timer, setTimer] = useState(120);
  const { userData, setUserData ,sendMail} = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleClick = async()=>{
    await toast.promise(sendMail(), {
      loading: "Sending Mail...",
      success: "Mail Sent",
      error: "Error Occured!!",
    });
    setTimer(120); 
  }
  useEffect(() => {
    let intervalID;
    if (timer > 0) {
      intervalID = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [timer]);
  return (
    <div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Please Check your Email and enter the OTP
        </div>

        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["otp"] || ""}
            name="otp"
            placeholder="OTP"
            type="text"
            maxlength="6"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
        <div className="flex flex-row justify-between">
          <div
            className={`${
              timer > 0
                ? "text-green-700 font-bold"
                : " font-bold text-rose-600"
            }`}
          >
            <Timer timer={timer} />
          </div>
          {timer <= 0 && (
            <button onClick={handleClick} className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white">
              Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OTP;
