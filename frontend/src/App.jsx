import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import PostGig from "./pages/PostGig";
import GigDetails from "./pages/GigDetails";
import MyGigs from "./pages/MyGigs";

function Layout({ children }) {
  const { pathname } = useLocation();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Gigs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gig/:id" element={<GigDetails />} />
          <Route path="/my-gigs" element={<MyGigs />} />
          <Route
            path="/post-gig"
            element={
              <PrivateRoute>
                <PostGig />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
