import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  submitBid,
  fetchBidsByGig,
  hireBid
} from "../../services/bidService";

// SUBMIT BID
export const createBid = createAsyncThunk(
  "bids/create",
  async (data, thunkAPI) => {
    try {
      const res = await submitBid(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// FETCH BIDS
export const getBids = createAsyncThunk(
  "bids/fetch",
  async (gigId, thunkAPI) => {
    try {
      const res = await fetchBidsByGig(gigId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// HIRE BID
export const hireOneBid = createAsyncThunk(
  "bids/hire",
  async (bidId, thunkAPI) => {
    try {
      const res = await hireBid(bidId);
      return { bidId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const bidSlice = createSlice({
  name: "bids",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBids.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(hireOneBid.fulfilled, (state, action) => {
        state.list = state.list.map(bid =>
          bid._id === action.payload.bidId
            ? { ...bid, status: "hired" }
            : { ...bid, status: "rejected" }
        );
      });
  }
});

export default bidSlice.reducer;
