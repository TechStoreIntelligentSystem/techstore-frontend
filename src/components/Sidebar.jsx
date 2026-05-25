import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/products", label: "Products", icon: "📦" },
  { to: "/orders", label: "Orders", icon: "🛒" },
  { to: "/clients", label: "Clients", icon: "👥" },
  { to: "/inventory", label: "Inventory", icon: "🏭" },
  { to: "/payments", label: "Payments", icon: "💳" },
  { to: "/shipping", label: "Shipping", icon: "🚚" },
  { to: "/coupons", label: "Coupons", icon: "🎟️" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div style={{ width: "250px", minHeight: "100vh", backgroundColor: "#1a1a2e", padding: "24px 16px" }}>
      <h6 style={{ color: "#888", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
        Navigation
      </h6>
      <ul className="nav flex-column">
        {links.map((link) => (
          <li className="nav-item mb-1" key={link.to}>
            <Link
              to={link.to}
              className="nav-link d-flex align-items-center gap-2"
              style={{
                borderRadius: "8px",
                padding: "10px 14px",
                color: location.pathname === link.to ? "#fff" : "#aaa",
                backgroundColor: location.pathname === link.to ? "#0f3460" : "transparent",
                fontWeight: location.pathname === link.to ? "600" : "400",
                transition: "all 0.2s",
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
