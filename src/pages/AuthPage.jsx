import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

export default function AuthPage() {
  const [login, setLogin] = useState(true);

  function toggleRegister() {
    setLogin((prevState) => !prevState);
  }

  return (
    <div className="mx-auto w-3/4 flex flex-col text-center py-12 px-8">
      <div>
        <h1 className="text-5xl font-bold mb-6">Habit Tracker</h1>
        <p className="text-xl font-semibold border-3 p-3 inline-block rounded-md ">
          1% Better Everyday
        </p>
      </div>

      {login ? (
        <Login toggleRegister={toggleRegister}></Login>
      ) : (
        <Register toggleRegister={toggleRegister}></Register>
      )}
    </div>
  );
}
