import "./App.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import Login from "./features/login/Login";

import RequireAuth from "./features/auth/RequireAuth";
import HomeScreen from "./pages/home";
import Shop from "./pages/shop";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*public routes */}
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop category={'all'} />} />
          <Route path="men" element={<Shop category={'men'} />} />
          <Route path="women" element={<Shop category={'women'} />} />
          <Route path="kids" element={<Shop category={'kids'} />} />

          {/* private routes*/}

          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
