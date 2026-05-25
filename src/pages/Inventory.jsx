import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getInventory, createInventory, updateInventory, deleteInventory } from "../services/inventoryService";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ quantity: "", reservedQuantity: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchInventory = () => {
    getInventory()
      .then((res) => setInventory(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleCreate = () => {
    createInventory(form).then(() => {
      setForm({ quantity: "", reservedQuantity: "" });
      setShowForm(false);
      fetchInventory();
    });
  };

  const handleDelete = (id) => {
    deleteInventory(id).then(fetchInventory);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Inventory</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Record
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-5">
              <input className="form-control" placeholder="Available Quantity" type="number"
                value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div className="col-md-5">
              <input className="form-control" placeholder="Reserved Quantity" type="number"
                value={form.reservedQuantity} onChange={(e) => setForm({ ...form, reservedQuantity: e.target.value })} />
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
                <th>#</th><th>Available</th><th>Reserved</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.quantity}</td>
                  <td>{i.reservedQuantity}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(i.id)}>Delete</button>
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

export default Inventory;