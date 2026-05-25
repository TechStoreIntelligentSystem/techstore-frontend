import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getOrders, createOrder, deleteOrder } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ orderDate: "", total: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchOrders = () => {
    getOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCreate = () => {
    createOrder(form).then(() => {
      setForm({ orderDate: "", total: "" });
      setShowForm(false);
      fetchOrders();
    });
  };

  const handleDelete = (id) => {
    deleteOrder(id).then(fetchOrders);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Orders</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Order
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-5">
              <input className="form-control" type="datetime-local"
                value={form.orderDate} onChange={(e) => setForm({ ...form, orderDate: e.target.value })} />
            </div>
            <div className="col-md-5">
              <input className="form-control" placeholder="Total" type="number"
                value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={handleCreate}>Save</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card shadow-sm">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th><th>Date</th><th>Total</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td>${o.total}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(o.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
}

export default Orders;