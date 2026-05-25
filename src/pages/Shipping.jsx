import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getShippings, createShipping, deleteShipping } from "../services/shippingService";

function Shipping() {
  const [shippings, setShippings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ carrier: "", trackingNumber: "", status: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchShippings = () => {
    getShippings()
      .then((res) => setShippings(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchShippings(); }, []);

  const handleCreate = () => {
    createShipping(form).then(() => {
      setForm({ carrier: "", trackingNumber: "", status: "" });
      setShowForm(false);
      fetchShippings();
    });
  };

  const handleDelete = (id) => {
    deleteShipping(id).then(fetchShippings);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Shipping</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Shipping
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" placeholder="Carrier"
                value={form.carrier} onChange={(e) => setForm({ ...form, carrier: e.target.value })} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Tracking Number"
                value={form.trackingNumber} onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })} />
            </div>
            <div className="col-md-3">
              <select className="form-select"
                value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Not Delivered">Not Delivered</option>
                <option value="Returned">Returned</option>
              </select>
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
                <th>#</th><th>Carrier</th><th>Tracking</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shippings.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.carrier}</td>
                  <td>{s.trackingNumber}</td>
                  <td><span className="badge bg-secondary">{s.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(s.id)}>Delete</button>
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

export default Shipping;