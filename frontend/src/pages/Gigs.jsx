import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGigs } from "../redux/slices/gigSlice";
import { useNavigate } from "react-router-dom";

export default function Gigs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector(state => state.gigs);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getGigs(search));
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Browse Gigs</h1>
        <p className="text-gray-500">
          Find freelance projects posted by clients
        </p>
      </div>

      <input
        className="w-full md:w-1/2 bg-white border rounded-xl px-5 py-3 mb-10
                   focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Search gigs..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map(gig => (
          <div
            key={gig._id}
            onClick={() => navigate(`/gig/${gig._id}`)}
            className="cursor-pointer group"
          >
            <div className="bg-white rounded-2xl border p-6 shadow-sm
                            group-hover:shadow-lg group-hover:-translate-y-1
                            transition">
              <h3 className="font-semibold text-lg mb-2">{gig.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {gig.description}
              </p>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">₹{gig.budget}</span>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  Open
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
