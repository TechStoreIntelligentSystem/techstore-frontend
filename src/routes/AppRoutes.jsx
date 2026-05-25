import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Clients from "../pages/Clients";
import Inventory from "../pages/Inventory";
import Payments from "../pages/Payments";
import Shipping from "../pages/Shipping";
import Coupons from "../pages/Coupons";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/coupons" element={<Coupons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;