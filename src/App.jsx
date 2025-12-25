import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>} />
        <Route path="/habits" element={<Dashboard></Dashboard>} />
      </Routes>
    </BrowserRouter>
  );
}
