import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-5" style={{ width: "400px" }}>
        <h2 className="fw-bold mb-1">TechStore</h2>
        <p className="text-muted mb-4">Sign in to your account</p>

        <label className="form-label fw-semibold">Email</label>
        <input type="email" className="form-control mb-3" placeholder="admin@techstore.com" />

        <label className="form-label fw-semibold">Password</label>
        <input type="password" className="form-control mb-4" placeholder="••••••••" />

        <button className="btn btn-dark w-100" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;

