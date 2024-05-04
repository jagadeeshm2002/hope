import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import Login from "./features/login/Login"
import Public from "./components/Public";
import RequireAuth from "./features/auth/RequireAuth"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/*public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* private routes*/}

          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome/>}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
