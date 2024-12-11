import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLocations,
  updateLocationAsync,
  deleteLocationAsync,
  createLocationAsync,
} from "./apiCall";

const locationSlice = createSlice({
  name: "locationsRentel",
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload;
    });
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateLocationAsync.fulfilled, (state, action) => {
      state.locations = state.locations.map((location) =>
        location._id === action.payload._id ? action.payload : location
      );
    });

    builder.addCase(deleteLocationAsync.fulfilled, (state, action) => {
      state.locations = state.locations.filter(
        (location) => location._id !== action.meta.arg
      );
    });

    builder.addCase(createLocationAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createLocationAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.locations.push(action.payload); // Add the new location to the list
    });
    builder.addCase(createLocationAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default locationSlice.reducer;
