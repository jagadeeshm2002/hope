import "./App.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./features/login/Login";

import RequireAuth from "./features/auth/RequireAuth";
import HomeScreen from "./pages/home";
import Shop from "./pages/shop";
import SingleProduct from "./pages/singleProduct";
import CartPage from "./pages/cart";
import Dashboard from "./pages/dashboard";

import Checkout from "./pages/checkout";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*public routes */}
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<Login type="login" />} />
          <Route path="register" element={<Login type="register"/>} />
          <Route path="shop" element={<Shop categoryValue={'all'} />} />
          <Route path="men" element={<Shop categoryValue={'men'} />} />
          <Route path="women" element={<Shop categoryValue={'women'}  />} />
          <Route path="kids" element={<Shop  categoryValue={'kids'} />} />
          <Route path="shop/:slug" element={<SingleProduct />} />

          {/* private routes*/}
  c 
          <Route element={<RequireAuth />}>
            
            <Route path="cart" element={<CartPage />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="checkout" element={<Checkout/>}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
