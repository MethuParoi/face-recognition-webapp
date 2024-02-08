import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {CameraModule} from "./pages/CameraModule";
import { RecoilRoot } from "recoil";
import Landing from "./pages/Landing";



function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/camera" element={<CameraModule />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
