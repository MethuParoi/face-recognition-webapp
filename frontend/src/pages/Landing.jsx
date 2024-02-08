import React from 'react';
import "./css/landing.css";
import { LuScanFace } from "react-icons/lu";
import ButtonPrimary from '../components/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
import { TraditionalButton } from '../components/TraditionalButton.jsx';


const Landing = () => {

    const navigate = useNavigate();
  return (
    <div className="parent-div">
      <div className="child-div-1">
        <div>
          <LuScanFace className="logo" />
        </div>
        <div>
          <h1 className="header-primary">Face Id Authentication</h1>
        </div>
      </div>

      <div className="child-div-2">
        <ButtonPrimary
          lable={"Sign in with Face Id"}
          onClick={() => {
            navigate("/camera");
          }}
        />
      </div>
      <div className="child-div-3">
        <TraditionalButton
          label={"Use traditional method"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}

export default Landing;