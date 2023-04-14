import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return <div>{<Navbar>{children}</Navbar>}</div>;
}

export default ProtectedRoute;
