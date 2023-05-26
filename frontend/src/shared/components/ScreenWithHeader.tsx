import React from "react";
import Header from "../atoms/Header";
import { useNavigate } from "react-router-dom";
import NavBar from "../atoms/NavBar";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}

const ScreenWithHeader = ({ children, isLoading }: Props) => {
  const navigate = useNavigate();
  function onClickLogo() {
    navigate("/");
  }

  return (
    <div>
      <Header onClickLogo={onClickLogo} />
      <div className="flex flex-row bg-bg_color w-full">
        <NavBar />
        <div className="flex flex-1 flex-col p-6">{children}</div>
      </div>
    </div>
  );
};

export default ScreenWithHeader;
