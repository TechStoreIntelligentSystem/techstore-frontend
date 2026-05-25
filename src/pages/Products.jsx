import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProducts, createProduct, deleteProduct } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = () => {
    getProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleCreate = () => {
    createProduct(form).then(() => {
      setForm({ name: "", price: "", stock: "" });
      setShowForm(false);
      fetchProducts();
    });
  };

  const handleDelete = (id) => {
    deleteProduct(id).then(fetchProducts);
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Products</h2>
        <button className="btn btn-dark" onClick={() => setShowForm(!showForm)}>
          + New Product
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <div className="row g-2">
            <div className="col-md-4">
              <input className="form-control" placeholder="Name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Price" type="number"
                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Stock" type="number"
                value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
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
                <th>#</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
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

export default Products;