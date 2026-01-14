import axios from "axios";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Register({ toggleRegister }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  async function userRegister(formData) {
    const loginData = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name: loginData.username,
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
      <form action={userRegister}>
        <Input type="text" label="Username" id="username"></Input>
        <Input type="email" label="Email" id="email"></Input>
        <Input type="password" label="Password" id="password"></Input>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg "
        >
          Register
        </button>
      </form>
      <div className="m-3 flex justify-center items-center">
        <p className="mr-3">Already Registered?</p>
        <button className="p-1 border rounded-md" onClick={toggleRegister}>
          Login
        </button>
      </div>
    </div>
  );
}
