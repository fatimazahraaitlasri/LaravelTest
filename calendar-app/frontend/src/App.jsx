import React, { lazy, Suspense } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const EmailSent = lazy(() => import("./pages/EmailSent"));
const PasswordResetSuccess = lazy(() => import("./pages/PasswordResetSuccess"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/password-reset-success"
              element={
                <PublicRoute>
                  <PasswordResetSuccess />
                </PublicRoute>
              }
            />

            <Route
              path="/email-sent"
              element={
                <PublicRoute>
                  <EmailSent />
                </PublicRoute>
              }
            />

            <Route
              path="/reset-password/:userId/:resetString"
              element={
                <PublicRoute>
                  <UpdatePassword />
                </PublicRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
