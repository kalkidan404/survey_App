
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import CreateSurvey from "./pages/createSurvey";
import Survey from "./pages/survey";
import Response from "./pages/response";
import Submitted from "./pages/submitted";
import  Profile  from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/surveys/create" element={<CreateSurvey />} />
        <Route path="/surveys/:id" element={<Survey />} />
        <Route path="/surveys/:id/responses" element={<Response />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;