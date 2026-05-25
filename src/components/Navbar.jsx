function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#16213e",
      padding: "14px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #0f3460"
    }}>
      <span style={{ color: "#fff", fontWeight: "700", fontSize: "18px", letterSpacing: "0.5px" }}>
        ⚡ TechStore Intelligent System
      </span>
      <span style={{ color: "#888", fontSize: "13px" }}>
        Admin Panel
      </span>
    </nav>
  );
}

export default Navbar;