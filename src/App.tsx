import { FC } from "react";
import "./App.css";
import { Main } from "./Component/Main";
import { Body } from "./Component/Body";

const App: FC = () => {
  return (
    <>
      <div style={{fontFamily: 'Poppins'}} className="bg-[#000] font-[900] flex flex-col gap-[20px] pt-[20px] pb-[40px] px-[20px]">
        <h1 className="flex justify-center text-[red] text-[30px]">MovieFlix Website</h1>
        <Main />
        <Body />
      </div>
    </>
  );
};

export default App;
