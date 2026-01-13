import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs/my").then(res => {
      setGigs(res.data);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Posted Gigs</h1>

      {gigs.length === 0 && (
        <p className="text-gray-500">
          You haven’t posted any gigs yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {gigs.map(gig => (
          <Link
            key={gig._id}
            to={`/gig/${gig._id}`}
            className="text-inherit"
          >
            <div className="bg-white border rounded-xl p-6 hover:shadow-md">
              <h3 className="font-semibold">{gig.title}</h3>
              <p className="text-gray-600 line-clamp-2">
                {gig.description}
              </p>

              <div className="flex justify-between mt-4 text-sm">
                <span>₹{gig.budget}</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {gig.status || "OPEN"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
