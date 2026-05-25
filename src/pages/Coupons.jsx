import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getCoupons, createCoupon, deleteCoupon } from "../services/couponService";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: "", discount: "", status: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchCoupons = () => {
    getCoupons()
      .then((res) => setCoupons(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleCreate = () => {
    createCoupon(form).then(() => {
      setForm({ code: "", discount: "", status: "" });
      setShowForm(false);
      fetchCoupons();
    });
  };

  const handleDelete = (id) => {
    deleteCoupon(id).then(fetchCoupons);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Coupons</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Coupon
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" placeholder="Code"
                value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Discount" type="number"
                value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
            </div>
            <div className="col-md-4">
              <select className="form-select"
                value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Discontinued">Discontinued</option>
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
                <th>#</th><th>Code</th><th>Discount</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.code}</td>
                  <td>{c.discount}%</td>
                  <td><span className="badge bg-secondary">{c.status}</span></td>
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

export default Coupons;