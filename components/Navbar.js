export default function Navbar() {
  return (
    <div className="topbar">
      <div className="logoText">Linkarsha</div>

      <div className="topActions">
        <a href="/login" className="loginBtn">Log in</a>
        <a href="/signup" className="signupBtn">Sign up free</a>
        <div className="menuBtn">☰</div>
      </div>
    </div>
  );
}
