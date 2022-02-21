import React, { useEffect, useState } from "react";
import styled from "styled-components";

const OTPTimer = styled.div`
  color: blue;
  font-size: 14px;
  align-items: center;
  padding-top: 15px;
`;

const OtpTime = () => {
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  if(timer === 0){
      window.location.href = '/'
  }

  return <OTPTimer>{timer} secs</OTPTimer>;
};

export default OtpTime;
