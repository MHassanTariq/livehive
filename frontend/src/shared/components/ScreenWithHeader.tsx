import React from "react";
import Header from "../atoms/Header";
import { useNavigate } from "react-router-dom";
import NavBar from "../atoms/NavBar";
import { MutatingDots } from "react-loader-spinner";
import { Loader } from "../atoms/Loader";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}

const ScreenWithHeader = ({ children, isLoading }: Props) => {
  const navigate = useNavigate();

  // logication functions
  function onClickLogo() {
    navigate("/");
  }

  // render functions
  function renderLoader() {
    if (isLoading) {
      return (
        <div className="absolute bg-bg_modal inset-0 flex justify-center items-center">
          <Loader />
        </div>
      );
    }
  }

  return (
    <div>
      {renderLoader()}
      <Header onClickLogo={onClickLogo} />
      <div className="flex flex-row bg-bg_color w-full">
        <NavBar />
        <div className="flex flex-1 flex-col p-6">{children}</div>
      </div>
    </div>
  );
};

export default ScreenWithHeader;
