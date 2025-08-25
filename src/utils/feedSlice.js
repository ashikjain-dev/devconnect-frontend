import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const updatedConnection = state.filter(
        (conn) => conn._id !== action.payload
      );
      return updatedConnection;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
