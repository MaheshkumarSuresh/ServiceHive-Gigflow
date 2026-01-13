import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGigs, createGig } from "../../services/gigService";

// GET GIGS
export const getGigs = createAsyncThunk(
  "gigs/getAll",
  async (search = "", thunkAPI) => {
    try {
      const res = await fetchGigs(search);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// CREATE GIG
export const addGig = createAsyncThunk(
  "gigs/create",
  async (data, thunkAPI) => {
    try {
      const res = await createGig(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addGig.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  }
});

export default gigSlice.reducer;
