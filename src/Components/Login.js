import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

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

const MobileInput = styled.form`
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

const PhoneButton = styled.button`
  padding: 15px;
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
`;

const EmptyMobile = styled.span`
  color: red;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
`;

const SameMobile = styled.span`
  color: red;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
`;
const ApiError = styled.span`
  color: red;
  align-items: center;
  font-size: 12px;
  margin-bottom: 10px;
`;
const Login = () => {
  const [mobile, setMobile] = useState();
  const [emptymobile, setEmptymobile] = useState([]);
  const [samemobile, setSamemobile] = useState([]);
  const [apierror, setApiError] = useState([]);
  const [setError] = useState(false);
  const sendOTP = async () => {
    const phoneResponse = await axios
      .post(
        "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
        {
          mobile: mobile,
        },
        { "Access-Control-Allow-Origin": "*" }
      )
      .catch((e) => {
        // console.log(e.response);
        if (e.response.data.errorCode === "USRAUT0010") {
          setEmptymobile(e.response.data.error);
        } else if (e.response.status === 500) {
          setApiError(e.response.data);
        } else {
          setSamemobile(e.response.data);
        }
      });

    if (phoneResponse !== undefined && mobile.length === 10) {
      debugger;
      console.log(phoneResponse.data.txnId);
      localStorage.setItem("txnId", phoneResponse.data.txnId);
      window.location.href = "./ConfirmOTP";
    }
    // console.log(phoneResponse.data);
  };

  const handleClick = () => {
    sendOTP();
  };

  const handlePhonerNumber = () => {
    const input = document.getElementsByTagName("input");
    console.log(input[0]);
    input[0].style.color = "red";
  };

  const handlePhonerNumberReset = () => {
    const input = document.getElementsByTagName("input");
    console.log(input[0]);
    input[0].style.color = "black";
  };

  return (
    <>
      <WelcomeHeading>
        COWIN-APP
        <Logo src="./icons/logo.svg" />
        <MobileInput>
          <input
            type="tel"
            required
            placeholder="Enter Phone Number"
            onChange={(e) => {
              setMobile(e.target.value);
              if (e.target.value.length !== 10) {
                setError(true);
                handlePhonerNumber();
              } else {
                setError(false);
                handlePhonerNumberReset();
              }
            }}
          />
        </MobileInput>
        <SameMobile>{samemobile}</SameMobile>
        <EmptyMobile>{emptymobile}</EmptyMobile>
        <ApiError>{apierror}</ApiError>
        <SubHeading>
          An OTP will be sent to your mobile number for verification
        </SubHeading>
        <PhoneButton type="button" onClick={() => handleClick()}>
          Send OTP
        </PhoneButton>
      </WelcomeHeading>
    </>
  );
};

export default Login;
