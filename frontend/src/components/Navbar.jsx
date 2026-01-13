import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navItem = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-600 hover:text-gray-900";

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          GigFlow
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={navItem}>Browse</NavLink>

          {user && (
            <>
              <NavLink to="/my-gigs" className={navItem}>My Gigs</NavLink>
              <NavLink to="/post-gig" className={navItem}>Post Gig</NavLink>
            </>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className={navItem}>Login</NavLink>
              <NavLink
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => dispatch(logout())}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
