import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProducts } from "../services/productService";
import { getOrders } from "../services/orderService";
import { getClients } from "../services/clientService";

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, clients: 0 });

  useEffect(() => {
    Promise.all([getProducts(), getOrders(), getClients()]).then(
      ([products, orders, clients]) => {
        setStats({
          products: products.data.length,
          orders: orders.data.length,
          clients: clients.data.length,
        });
      }
    );
  }, []);

  return (
    <MainLayout>
      <h2 className="fw-bold mb-4">Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 border-0" style={{ borderLeft: "4px solid #212529" }}>
            <p className="text-muted mb-1">Total Products</p>
            <h2 className="fw-bold">{stats.products}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 border-0" style={{ borderLeft: "4px solid #212529" }}>
            <p className="text-muted mb-1">Total Orders</p>
            <h2 className="fw-bold">{stats.orders}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 border-0" style={{ borderLeft: "4px solid #212529" }}>
            <p className="text-muted mb-1">Total Clients</p>
            <h2 className="fw-bold">{stats.clients}</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
