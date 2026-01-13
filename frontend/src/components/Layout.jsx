import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">GigFlow</Link>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-black">Login</Link>
          <Link to="/register" className="text-gray-600 hover:text-black">Register</Link>
        </div>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
