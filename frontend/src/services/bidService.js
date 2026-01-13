import api from "./api";

export const submitBid = (data) =>
  api.post("/bids", data);

export const fetchBidsByGig = (gigId) =>
  api.get(`/bids/${gigId}`);

export const hireBid = (bidId) =>
  api.patch(`/bids/${bidId}/hire`);
