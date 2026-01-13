import Gig from "../models/Gig.js";

// CREATE GIG
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL OPEN GIGS (with search)
export const getGigs = async (req, res) => {
  try {
    const search = req.query.search || "";

    const gigs = await Gig.find({
      status: "open",
      title: { $regex: search, $options: "i" }
    }).populate("ownerId", "name email");

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("ownerId", "name");
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
