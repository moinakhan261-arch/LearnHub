
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const linkStyle =
    "block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200";

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-xl font-extrabold tracking-tight text-blue-600 sm:text-2xl"
        >
          LearnHub<span className="text-gray-800">.</span>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="ml-3 shrink-0 rounded-lg p-2 text-2xl leading-none text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-5 border-b border-gray-100 bg-white p-6 shadow-lg md:static md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <Link to="/" onClick={closeMenu} className={linkStyle}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu} className={linkStyle}>
            About
          </Link>

          <Link to="/contact" onClick={closeMenu} className={linkStyle}>
            Contact
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={linkStyle}
              >
                Dashboard
              </Link>

              <Link
                to="/my-learning"
                onClick={closeMenu}
                className={linkStyle}
              >
                My Learning
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
                className={linkStyle}
              >
                Profile
              </Link>

              <Link
                to="/settings"
                onClick={closeMenu}
                className={linkStyle}
              >
                Settings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-50 px-4 py-2 text-left font-semibold text-red-600 transition hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className={linkStyle}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-center font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

