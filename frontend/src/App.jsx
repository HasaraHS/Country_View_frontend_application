import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Countries from "./components/countries/countries";

const App = () => {
  return (
    <BrowserRouter>
      <div className="font-Montserrat bg-[#001E23]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/countries" element={<Countries/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
