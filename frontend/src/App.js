import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { CustomNavbar } from "./components/CustomNavbar";
import { Thread } from "./components/Thread";
import AuthContextProvider from "./service/AuthContextProvider";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn] = useState(false);
  return (
    <div className="App">
      <AuthContextProvider>
      <CustomNavbar />
      <Routes>
        <Route path="/" exact element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thread" element={<Thread />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
