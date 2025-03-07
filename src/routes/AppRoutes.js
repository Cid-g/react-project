import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage.js";
import SignupPage from "../pages/SignupPage.js";
import HomePage from "../pages/HomePage.js";
import ForgotPassword from "../pages/ForgotPasswordPage.js";
import AboutPage from "../pages/AboutPage.js";
import StudentPage from "../pages/StudentPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import AdminMainPage from "../pages/AdminMainPage.js";
import ProtectedRoute from "./ProtectedRoute.js";
import UserTable from "../components/ui/UserTable.js";
import AdminDashboardPage from "../pages/AdminDashboardPage.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherDashboardPage from "../pages/TeacherDashboardPage.js";
import AdminLoginPage from "../pages/AdminLoginPage.js";
import { ROLES } from "../constants.js";
function AppRoutes() {
  return (
    <>
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/homepage" element={<HomePage/>} />
      <Route path= "/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/about" element={<AboutPage/>} />

      <Route path="/profile" element={<ProfilePage/>}/>

      <Route path="/table" element = {<UserTable />}/>

      <Route path='access-admin' element = {<AdminLoginPage />}/>
      <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminMainPage />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
              <TeacherDashboardPage />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentPage />
            </ProtectedRoute>
          }
        /> 
      
        <Route path ='/dashboard' element={<AdminDashboardPage/>}/>
        
       
    </Routes>
    <ToastContainer />
    </>
  );
}

export default AppRoutes;
