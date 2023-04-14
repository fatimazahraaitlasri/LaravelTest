import React, { useState } from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const { REACT_APP_API_URL } = process.env;

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/login`,
        values
      );

      if (response.data) {
        message.success("Login Successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("name", response.data.user.name);
        navigate("/home");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const [passwordShown, setPasswordShown] = useState(false);

  const TogglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Form
        onFinish={onFinish}
        className="h-screen flex justify-center items-center w-full"
      >
        <div className="bg-blue-50 flex h-full w-full justify-center items-center space-y-8">
          <div className="px-8 md:px-32 lg:px-24 bg-white shadow-xl rounded-xl py-4 ">
            <h1 className="mb-8 text-5xl text-center font-bold text-BLACJ">
              Login
            </h1>
            <Form.Item
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="floating_password"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_password"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <i
                  className="absolute right-0 top-0 mt-3 mr-4 text-black cursor-pointer"
                  onClick={TogglePassword}
                >
                  {passwordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </i>
              </div>
            </Form.Item>
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="rounded relative inline-flex group items-center justify-center px-6 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white
                "
              >
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                <span class="relative">Login</span>
              </button>
            </div>
            <p className="text-center text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                Register
              </Link>
            </p>
            <p className="text-center text-base text-gray-600">
              <Link
                to="/forgot-password"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                Forgot Password ?
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
