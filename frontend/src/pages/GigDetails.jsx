import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { createBid, getBids, hireOneBid } from "../redux/slices/bidSlice";
import toast from "react-hot-toast";

export default function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { list } = useSelector(state => state.bids);

  const [gig, setGig] = useState(null);
  const [bid, setBid] = useState({ price: "", message: "" });

  // Fetch gig + bids
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
      } catch {
        toast.error("Failed to load gig");
      }
    };

    fetchGig();

    if (user) {
      dispatch(getBids(id));
    }
  }, [id, user, dispatch]);

  if (!gig) return null;

  const isOwner =
    user && gig.ownerId && user._id === gig.ownerId._id;

  const myBid = list.find(
    b => b.freelancerId?._id === user?._id
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* GIG INFO */}
      <div className="bg-white rounded-2xl border p-6 mb-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>
        <p className="text-gray-600 mb-4">{gig.description}</p>
        <p className="text-sm font-semibold">Budget: ₹{gig.budget}</p>
      </div>

      {/* FREELANCER VIEW */}
      {user && !isOwner && (
        <div className="bg-white rounded-2xl border p-6 shadow-sm mb-8">

          {/* STATUS MESSAGES */}
          {myBid?.status === "hired" && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
              🎉 <strong>Congratulations!</strong> You have been hired for this gig.
            </div>
          )}

          {myBid?.status === "rejected" && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              ❌ Your proposal was not selected for this gig.
            </div>
          )}

          {/* ALREADY BID */}
          {myBid ? (
            <div className="border rounded-xl p-4">
              <p className="font-medium mb-1">Your Proposal</p>
              <p className="text-gray-600 text-sm">{myBid.message}</p>
              <p className="mt-2 font-semibold">₹{myBid.price}</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium
                  ${
                    myBid.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : myBid.status === "hired"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {myBid.status.toUpperCase()}
              </span>
            </div>
          ) : (
            <>
              {/* SUBMIT PROPOSAL */}
              <h2 className="text-lg font-semibold mb-4">
                Submit a Proposal
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  dispatch(
                    createBid({
                      gigId: id,
                      price: bid.price,
                      message: bid.message
                    })
                  )
                    .unwrap()
                    .then(() => {
                      toast.success("Proposal submitted successfully");
                      setBid({ price: "", message: "" });
                      dispatch(getBids(id));
                    })
                    .catch(err => {
                      toast.error(err || "Failed to submit proposal");
                    });
                }}
                className="space-y-4"
              >
                <textarea
                  placeholder="Describe how you will complete this project..."
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  rows={4}
                  value={bid.message}
                  onChange={(e) =>
                    setBid({ ...bid, message: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Your bid amount (₹)"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={bid.price}
                  onChange={(e) =>
                    setBid({ ...bid, price: e.target.value })
                  }
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Submit Proposal
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* OWNER VIEW – MANAGE PROPOSALS */}
      {isOwner && (
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Proposals</h2>

          {list.length === 0 && (
            <p className="text-gray-500">No proposals received yet.</p>
          )}

          {list.map((b) => (
            <div key={b._id} className="border rounded-xl p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{b.freelancerId?.name}</p>
                  <p className="text-sm text-gray-500">
                    {b.freelancerId?.email}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">{b.message}</p>
                  <p className="mt-2 font-medium">₹{b.price}</p>
                </div>

                <div>
                  {b.status === "pending" && (
                    <button
                      onClick={() => {
                        dispatch(hireOneBid(b._id))
                          .unwrap()
                          .then(() => {
                            toast.success("Freelancer hired successfully");
                            dispatch(getBids(id));
                          })
                          .catch(() => toast.error("Failed to hire"));
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Hire
                    </button>
                  )}

                  {b.status === "hired" && (
                    <span className="text-green-600 font-semibold">HIRED</span>
                  )}

                  {b.status === "rejected" && (
                    <span className="text-red-500 font-semibold">REJECTED</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
