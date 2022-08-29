import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import '../../assets/main.css'

function PaymentDetails() {
  const { userData, setUserData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
      <div className="flex flex-col ">
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Account Number
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              // onChange={handleChange}
              disabled={true}
              value={userData.accountNumber}
              name="accountNumber"
              placeholder="Account Number"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>

        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Payable Amount
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              // onChange={handleChange}
              disabled={true}
              value={userData.amount}
              name="amount"
              placeholder="Amount"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
        <div className="mx-2 w-full flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            PIN
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              onChange={handleChange}
              value={userData["secret"] || ""}
              name="secret"
              placeholder="Secret"
              type="password"
              maxlength="4"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
