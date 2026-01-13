import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGig } from "../redux/slices/gigSlice";
import toast from "react-hot-toast";

export default function PostGig() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch(addGig(form))
         .unwrap()
        .then(() => {
          toast.success("Gig posted successfully");
        })
        .catch(() => {
          toast.error("Failed to post gig");
        });
      }}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold">Post Gig</h2>

      <input className="border w-full p-2"
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })} />

      <textarea className="border w-full p-2"
        placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })} />

      <input className="border w-full p-2"
        type="number"
        placeholder="Budget"
        onChange={e => setForm({ ...form, budget: e.target.value })} />

      <button className="bg-black text-white w-full py-2">
        Post
      </button>
    </form>
  );
}
