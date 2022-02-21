import axios from "axios";
import React, { useEffect, useState } from "react";
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

const BenIdInput = styled.form`
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

const DownloadButton = styled.button`
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
  color: red;
  font-family: Montserrat;
  margin-top: 5px;
  margin-bottom: 30px;
  font-size: 10px;
  margin-top: 30px;
  align-items: center;
  font-weight: bold;
`;

const Unauth = styled.span`
  color: red;
  align-items: center;
  font-size: 12px;
  /* margin-bottom: 10px; */
  padding-top: 15px;
  padding-bottom: 15px;

`;

// const WrongOTP = styled.span`
//   color: red;
//   align-items: center;
//   font-size: 12px;
//   margin-bottom: 10px;
// `;
const DownloadCertificate = () => {
  const [benId, setBenId] = useState([]);
  const [logout, setLogout] = useState(false);
  // const userId = {
  //     user1: '46469161198030',
  //     user2: '17488642321190'
  // }
  const downloadCertificate = async () => {
    const certificateResponse = await axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${benId}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .catch((e) => {
        setLogout(e.response.data);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      });
  };

  const handleDownload = () => {
    downloadCertificate();
    localStorage.clear();
    //       if(userId.user1 === benId || userId.user2 === benId)
  };

  return (
    <WelcomeHeading>
      COWIN-APP
      <Logo src="./icons/document.svg" />
      <BenIdInput>
        <input
          type="tel"
          required
          placeholder="Enter Beneficiary ID"
          onChange={(e) => setBenId(e.target.value)}
        />
      </BenIdInput>
      <Unauth>{logout}</Unauth>
      <DownloadButton
        onClick={() => {
          handleDownload();
        }}
      >
        Download Certificate
      </DownloadButton>
      <SubHeading>Session is managed for 3 minutes only</SubHeading>
    </WelcomeHeading>
  );
};

export default DownloadCertificate;
