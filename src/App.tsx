import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/cover.jpg";
import LoginPage from "./components/login/login-page";
import RegisterPage from "./components/register/register-page";
import PrivateRoute from "./components/private-route/private-route";
import Dashboard from "./components/dashboard/dashboard";
//import { AlbumList } from "./components/album-list.component";
//import LoginPage from "./components/login/login-page";

function App() {
  return (
    <div>
      <>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/tierlist"
              element={<PrivateRoute component={Dashboard} />}
            />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
