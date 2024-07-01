import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import HeaderCompoent from "./layout/Header";
import WordsPage from "./page/WordsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderCompoent />}>
          <Route index element={<HomePage />} />
          <Route path="/words" element={<WordsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;