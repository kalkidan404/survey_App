
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateSurvey from "./pages/CreateSurvey";
import Survey from "./pages/survey";
import Response from "./pages/response";
import Submitted from "./pages/submitted";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/surveys/create" element={<CreateSurvey />} />
        <Route path="/surveys/:id" element={<Survey />} />
        <Route path="/surveys/:id/responses" element={<Response />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;