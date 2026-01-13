import api from "./api";

export const fetchGigs = (search = "") =>
  api.get(`/gigs?search=${search}`);

export const createGig = (data) =>
  api.post("/gigs", data);
