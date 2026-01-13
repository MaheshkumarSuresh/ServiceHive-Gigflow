import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

/**
 * @desc    Submit a bid for a gig
 * @route   POST /api/bids
 * @access  Private
 */
export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.status !== "open") {
      return res
        .status(400)
        .json({ message: "Gig is not open for bidding" });
    }

    // Prevent owner from bidding on own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot bid on your own gig" });
    }

    // Optional: prevent duplicate bids by same freelancer
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id
    });

    if (existingBid) {
      return res
        .status(400)
        .json({ message: "You have already submitted a proposal" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price
    });

    res.status(201).json({
      message: "Bid submitted successfully",
      bid
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all bids for a gig (Owner only)
 * @route   GET /api/bids/:gigId
 * @access  Private
 */
export const getBidsByGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Only gig owner can view bids
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view proposals" });
    }

    const bids = await Bid.find({ gigId: gig._id })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Hire a freelancer (Atomic operation)
 * @route   PATCH /api/bids/:bidId/hire
 * @access  Private
 */
export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);

    if (!bid) {
      throw new Error("Bid not found");
    }

    const gig = await Gig.findById(bid.gigId).session(session);

    if (!gig) {
      throw new Error("Gig not found");
    }

    if (gig.status !== "open") {
      throw new Error("Gig already assigned");
    }

    // Only gig owner can hire
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new Error("Not authorized to hire");
    }

    // Update gig status
    gig.status = "assigned";
    await gig.save({ session });

    // Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    // Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Populate freelancer details for frontend notification
    const hiredBid = await Bid.findById(bid._id).populate(
      "freelancerId",
      "name email"
    );

    res.json({
      message: "Freelancer hired successfully",
      hiredBid
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};
