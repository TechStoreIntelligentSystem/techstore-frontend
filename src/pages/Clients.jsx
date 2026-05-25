import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getClients, createClient, deleteClient } from "../services/clientService";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchClients = () => {
    getClients()
      .then((res) => setClients(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClients(); }, []);

  const handleCreate = () => {
    createClient(form).then(() => {
      setForm({ firstName: "", lastName: "", email: "", phone: "", address: "" });
      setShowForm(false);
      fetchClients();
    });
  };

  const handleDelete = (id) => {
    deleteClient(id).then(fetchClients);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Clients</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Client
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" placeholder="First Name"
                value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Last Name"
                value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input className="form-control" placeholder="Phone"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Address"
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
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
                <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(c.id)}>Delete</button>
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

export default Clients;