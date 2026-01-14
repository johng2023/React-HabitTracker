import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HabitContextProvider from "./store/habitContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <HabitContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage></AuthPage>} />
            <Route
              path="/habits"
              element={
                <ProtectedRoute>
                  <Dashboard></Dashboard>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </HabitContextProvider>
    </>
  );
}
