import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getPayments, createPayment, deletePayment } from "../services/paymentService";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ amount: "", transactionNumber: "", status: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchPayments = () => {
    getPayments()
      .then((res) => setPayments(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleCreate = () => {
    createPayment(form).then(() => {
      setForm({ amount: "", transactionNumber: "", status: "" });
      setShowForm(false);
      fetchPayments();
    });
  };

  const handleDelete = (id) => {
    deletePayment(id).then(fetchPayments);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Payments</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Payment
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" placeholder="Amount" type="number"
                value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Transaction Number"
                value={form.transactionNumber} onChange={(e) => setForm({ ...form, transactionNumber: e.target.value })} />
            </div>
            <div className="col-md-3">
              <select className="form-select"
                value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Refunded">Refunded</option>
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
                <th>#</th><th>Transaction</th><th>Amount</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.transactionNumber}</td>
                  <td>${p.amount}</td>
                  <td><span className="badge bg-secondary">{p.status}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(p.id)}>Delete</button>
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

export default Payments;