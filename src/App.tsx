import { FC } from "react";
import "./App.css";
import { Main } from "./Component/Main";

const App: FC = () => {
  return (
    <>
      <div style={{fontFamily: 'Poppins'}} className="bg-[#000] h-[100vh] font-[900] flex flex-col gap-[20px] p-[20px]">
        <h1 className="flex justify-center text-[red] text-[30px]">Movie Website</h1>
        <Main />
      </div>
    </>
  );
};

export default App;
