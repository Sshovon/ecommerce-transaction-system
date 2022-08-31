import "../assets/main.css";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import PaymentDetails from "../components/steps/PaymentDetails";
import OTP from "../components/steps/OTP";
import Final from "../components/steps/Final";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function BankScreen() {
  // const user =JSON.parse(localStorage.getItem('user'))
  // console.log(user)
  const ecomAccountNumber = "11111";
  const email = JSON.parse(localStorage.getItem("user")).contactInformation
    .email;
  const amount = localStorage.getItem("amount");
  const accountNumber = JSON.parse(localStorage.getItem("user")).bankInformation
    .accountNumber;
  const steps = ["Payment Details", "One Time Password", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({ amount, accountNumber });
  const [finalData, setFinalData] = useState([]);

  const accountVerifier = async () => {
    return axios.post("/api3/bank/validatesecret", {
      secret: userData.secret,
    });
  };
  const validTransaction = async () => {
    return axios.post("/api1/valid/", { amount, accountNumber });
  };

  const sendMail = async () => {
    return axios.post("/api3/otp/send", {
      email,
    });
  };

  const verifyOTP = async () => {
    return axios.get(`/api3/otp/verify/${userData.otp}`);
  };

  // have to clear cart after successfully placing a order
  const makePayment = async () => {
    axios
      .post("/api1/add", {
        inID: ecomAccountNumber,
        outID: accountNumber,
        amount,
      })
      .then(async (result) => {
        const trxID = result.data.trxID;
        const { data } = await axios.get("/api3/cart/view");
        const { cart } = data;
        const { data: orderData } = await axios.post("/api3/order/place", {
          trxID,
          orders: cart,
        });
        //console.log(orderData)
        //sending money from ecom-seller
        //ecom static account
        const transactions = [];
        for (let order of orderData.orders) {
          const amount = parseInt(order.price) * parseInt(order.quantity);
          const fee = amount * 0.05;
          const ecomtobankAdd = await axios.post("/api1/add", {
            inID: order.sellerID,
            outID: "11111",
            amount: amount - fee,
          });
          transactions.push(ecomtobankAdd);
        }
        const transData = await Promise.all(transactions);
        const res = transData;
        //console.log(res)
        const supplierPromise = [];
        for (let i = 0; i < res.length; i++) {
          const supplierTransaction = axios.post("/api2/supplier/add", {
            orderID: orderData.orderID,
            customerID: orderData.customerID,
            sellerID: orderData.orders[i].sellerID,
            trxID: res[i].data.trxID,
            quantity: orderData.orders[i].quantity,
            amount:
              parseInt(orderData.orders[i].price) *
              parseInt(orderData.orders[i].quantity),
            productID:orderData.orders[i].productID
          });
          supplierPromise.push(supplierTransaction);
        }
        await Promise.all(supplierPromise);
        await axios.get("/api3/cart/clear");
        //console.log(supplierTransactionList)
      });
  };
  const handleClickBack = function () {
    let newStep = currentStep;
    newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  const handleClick = async (direction = null) => {
    //console.log(currentStep);
    let newStep = currentStep;
    if (newStep === 1) {
      await Promise.all([validTransaction(), accountVerifier()])
        .then(async function (results) {
          const [validTransactionResult, accountVerifyResult] = results;

          if (accountVerifyResult.data.status === false) {
            toast.error("Incorrect PIN");
          } else if (validTransactionResult.data.status === "invalid") {
            toast.error("Insufficient Balance");
          } else {
            await toast.promise(sendMail(), {
              loading: "Sending Mail...",
              success: "Mail Sent",
              error: "Error Occured!!",
            });
            newStep++;
            newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
          }
        })
        .catch(() => {
          toast.error("Error Occured!!");
        });
    } else if (newStep === 2) {
      const result = await verifyOTP();
      //console.log(result.data);
      if (result.data.status === !true) {
        toast.error("OTP Verification failed!!");
      } else {
        toast.success("OTP Verification Successful");
        setTimeout(async()=>{
          await toast.promise(makePayment(), {
            loading: "Wait a bit...",
            success: "Transaction Successful",
            error: "Transaction Failed",
          });
          direction === "next" ? newStep++ : newStep--;
          newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        },1000)
        
      }
    }
    // check if steps are within bounds
  };
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PaymentDetails />;
      case 2:
        return <OTP />;
      case 3:
        return <Final />;
      default:
    }
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="my-10 p-10 ">
          <StepperContext.Provider
            value={{ userData, setUserData, finalData, setFinalData,sendMail }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
      {/* navigation button */} 
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
          handleClickBack={handleClickBack}
        />
      )}
    </div>
  );
}

export default BankScreen;
