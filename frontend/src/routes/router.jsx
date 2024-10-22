import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "../pages/login/login.jsx";
import { Home } from "../pages/home/home.jsx";

export function Router() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}