import axios from "axios";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login({ toggleRegister }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  async function userLogin(formData) {
    const loginData = Object.fromEntries(formData.entries());
    setMessage("");
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.userName);
        navigate("/habits");
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="mt-12 mx-auto w-3/4 max-w-100">
      {message && (
        <p className="border border-red-600 rounded text-red-600 font-bold p-2 mb-3 text-center">
          {message}
        </p>
      )}
      <form action={userLogin}>
        <Input type="email" label="Email" id="email"></Input>
        <Input type="password" label="Password" id="password"></Input>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg "
        >
          Login
        </button>
      </form>
      <div className="m-3 flex justify-center items-center">
        <p className="mr-3">Not Registered?</p>
        <button
          onClick={toggleRegister}
          type="button"
          className="p-1 border rounded-md"
        >
          SignUp
        </button>
      </div>
    </div>
  );
}
