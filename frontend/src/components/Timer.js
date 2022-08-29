import React from "react";
import '../assets/main.css'

function Timer({ timer }) {



  return (
    <>
      {timer >0 && `${
        timer / 60 === 0 ? `${timer % 60}sec`
          : `${parseInt(timer / 60)} min : ${timer % 60}`
      } sec`}
    
      {timer <= 0 && `OTP Expired`}
    </>
  );
}

export default Timer;
