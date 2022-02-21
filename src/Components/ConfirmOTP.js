import axios from "axios";
import { sha256 } from "js-sha256";
import React, { useState } from "react";
import styled from "styled-components";
import OtpTime from "./OtpTime";
const WelcomeHeading = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 20px 10px;
  width: 380px;
  background: white;
  border-radius: 4px;
  font-family: Montserrat;
  font-weight: bold;
`;

const OTPInput = styled.form`
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin: 20px auto;
  & input {
    padding: 10px;
    font-size: 14px;
    outline: none;
    border: none;
    font-weight: bold;
    font-family: Montserrat;
  }
`;

const OTPButton = styled.button`
  padding: 15px 15px;
  font-size: 14px;
  color: white;
  background-color: black;
  outline: none;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  font-family: Montserrat;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin: 40px auto;
`;

const SubHeading = styled.span`
  color: black;
  font-family: Montserrat;
  margin-top: 5px;
  margin-bottom: 30px;
  align-items: center;
  font-size: 10px;
  margin-top: 30px;
`;

const Unauth = styled.span`
  color: red;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
  padding-top: 15px;
`;

const WrongOTP = styled.span`
  color: red;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
  padding-top: 15px;
`;
const ConfirmOTP = () => {
  const [otp, setOTP] = useState();
  const [unauth, setUnauth] = useState([]);
  const [invalidotp, setInvalidotp] = useState([]);
  const validateOTP = async () => {
    const validateResponse = await axios
      .post(
        "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",

        {
          otp: sha256(otp),
          txnId: localStorage.getItem("txnId"),
        }
      )
      .catch((e) => {
        if (e.response.status === 401) {
          setUnauth(e.response.data);
        } else if (e.response.data.errorCode === "USRAUT0014") {
          setInvalidotp(e.response.data.error);
        }
      });

    if (validateResponse !== undefined && otp.length === 6) {
      localStorage.setItem("token", validateResponse.data.token);
      window.location.href = "./DownloadCertificate";
    }
  };

  const handleClick = () => {
    validateOTP();
  };

  return (
    <WelcomeHeading>
      COWIN-APP
      <Logo src="./icons/otp.svg" />
      <OTPInput>
        <input
          required
          type="tel"
          placeholder="Enter OTP"
          onChange={(e) => setOTP(e.target.value)}
        />
      </OTPInput>
      <OTPButton onClick={() => handleClick()}>Verify & Proceed</OTPButton>
      <WrongOTP>{invalidotp}</WrongOTP>
      <Unauth>{unauth}</Unauth>
      <OtpTime />
      <SubHeading>Recieved OTP is only valid for 3 minutes</SubHeading>
    </WelcomeHeading>
  );
};

export default ConfirmOTP;
