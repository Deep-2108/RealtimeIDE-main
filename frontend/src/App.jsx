
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import EditorPage from "./components/EditorPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editorpage" element={<EditorPage />} />
    </Routes>
  );
}

export default App;


