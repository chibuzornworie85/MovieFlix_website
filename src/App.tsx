import { FC } from "react";
import "./App.css";
import Body from "./components/Body";

const App: FC = () => {
  return (
    <>
      <div
        data-testid="app"
        style={{ fontFamily: "Poppins" }}
        className="bg-[#000] text-[#fff] font-[900] flex flex-col h-[100%] gap-[20px] pt-[20px] pb-[40px] px-[20px]"
      >
        <Body />
      </div>
    </>
  );
};

export default App;
