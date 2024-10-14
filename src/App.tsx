import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/cover.jpg";
import LoginPage from "./components/login/login-page";
import RegisterPage from "./components/register/register-page";
//import { AlbumList } from "./components/album-list.component";
//import LoginPage from "./components/login/login-page";

function App() {
  return (
    <div>
      <>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
