import axios from "axios";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

export default function Register({ toggleRegister }) {
  const navigate = useNavigate();

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

      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to register", error.message);
    }
  }

  return (
    <div className="mt-12 mx-auto w-3/4 max-w-100">
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
