import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Access your GigFlow account"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(form))
          .unwrap()
          .then(() => {
            toast.success("Logged in successfully");
          })
          .catch((err) => {
            toast.error(err || "Login failed");
          });
        }}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="
              w-full h-11 rounded-lg border border-gray-300
              bg-gray-50 px-4 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white
            "
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="
              w-full h-11 rounded-lg border border-gray-300
              bg-gray-50 px-4 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white
            "
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="
            w-full h-11 rounded-lg bg-indigo-600 text-white
            font-medium tracking-wide
            hover:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
