import { FC } from "react";
import "./App.css";
import Body from "./Component/Body";

const App: FC = () => {
  return (
    <>
      <div style={{fontFamily: 'Poppins'}} className="bg-[#000] text-[#fff] font-[900] flex flex-col h-[100%] gap-[20px] pt-[20px] pb-[40px] px-[20px]">
        <Body />
      </div>
    </>
  );
};

export default App;
