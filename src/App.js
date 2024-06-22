import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import HeaderCompoent from "./layout/Header";
import JapanPage from "./page/JapanPage";
import EngPage from "./page/EngPage";
import TestComponent from "./component/TestComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderCompoent />}>
          <Route index element={<HomePage />} />
          <Route path="/japan" element={<JapanPage />} />
          <Route path="/eng" element={<EngPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;