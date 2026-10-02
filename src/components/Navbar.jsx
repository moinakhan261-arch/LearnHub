import {Link} from "react-router-dom";
import { useState } from "react";
function Navbar() {
    const [menuOpen,setMenuOpen] = useState(false);
    const token = localStorage.getItem("token");
    return(
        <nav className="relative flex justify-between items-center px-6 py-4 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-blue-600">LearnHub</h2>
            <button className="md:hidden text-2xl"
            onClick={()=>setMenuOpen(!menuOpen)}>
                ☰ 
            </button>
          <div
  className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-5 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none border-t md:border-0`}
> 
                <Link
  to="/"
  className="text-gray-700 hover:text-blue-600 transition"
>
  Home
</Link>

<Link
  to="/courses"
  className="text-gray-700 hover:text-blue-600 transition"
>
  Courses
</Link>

<Link
  to="/about"
  className="text-gray-700 hover:text-blue-600 transition"
>
  About
</Link>

{token ? (
  <>
    <Link
      to="/dashboard"
      className="text-gray-700 hover:text-blue-600 transition"
    >
      Dashboard
    </Link>

    <Link
      to="/my-learning"
      className="text-gray-700 hover:text-blue-600 transition"
    >
      My Learning
    </Link>

    <Link
      to="/profile"
      className="text-gray-700 hover:text-blue-600 transition"
    >
      Profile
    </Link>

    <Link
      to="/settings"
      className="text-gray-700 hover:text-blue-600 transition"
    >
      Settings
    </Link>

    <button
  onClick={() => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }}
  className="text-red-600 hover:text-red-700 transition"
>
  Logout
</button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="text-gray-700 hover:text-blue-600 transition"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="text-gray-700 hover:text-blue-600 transition"
    >
      Register
    </Link>
  </>
)}
            </div>
        </nav>
    );
}

export default Navbar;