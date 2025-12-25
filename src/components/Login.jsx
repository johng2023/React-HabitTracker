import axios from "axios";
import Input from "./Input";

const BASE_URL = "http://localhost:3000";

export default function Login({ toggleRegister }) {
  async function userLogin(formData) {
    const loginData = Object.fromEntries(formData.entries());

    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: loginData.email,
      password: loginData.password,
    });

    localStorage.setItem("token", response.data.token);
  }

  return (
    <div className="mt-12 mx-auto w-3/4 max-w-100">
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
