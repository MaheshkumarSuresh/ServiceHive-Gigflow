export default function GigCard({ gig }) {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2">
      <h3 className="font-medium text-lg">{gig.title}</h3>
      <p className="text-sm text-gray-600">{gig.description}</p>

      <div className="flex justify-between items-center pt-2">
        <span className="text-sm text-gray-500">
          Budget: ₹{gig.budget}
        </span>
        <span className="text-xs text-gray-400">
          {gig.ownerId?.name}
        </span>
      </div>
    </div>
  );
}
