import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../pages/home/home.jsx";
import { Login } from "../pages/login/login.jsx";
import { Register } from "../pages/register/register.jsx";
import { Crud } from "../pages/crud/crud.jsx";

export function Router() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/crud" element={<Crud />} />
        </Routes>
    );
}