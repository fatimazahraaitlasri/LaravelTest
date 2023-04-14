import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  async function logout() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="shadow bg-white">
        <div className="h-16 mx-auto px-5 flex items-center justify-between">
          <h1 className="text-2xl">Hi, {localStorage.getItem("name")}</h1>

          <ul className="flex items-center gap-5">
            <li>
              <Link
                to="/home"
                className="hover:text-cyan-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={logout}
                className="hover:text-cyan-500 transition-colors">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <div className="p-[10px] px-0">{children}</div>
      </div>
    </>
  );
};

export default Navbar;
