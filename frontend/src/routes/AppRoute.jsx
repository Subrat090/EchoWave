import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Project from "../screens/project";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/project" element={<Project />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;