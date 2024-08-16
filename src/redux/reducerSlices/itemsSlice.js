import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = { items: [] };

export const getInitialState = createAsyncThunk(
  "items/fetchData",
  async (arg, thunkApi) => {
    try {
      const resp = await axios.get("https://fakestoreapi.com/products");
      thunkApi.dispatch(initialLoad(resp.data));
    } catch (error) {
      console.log(error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {
    initialLoad: (state, action) => {
      state.items = [...action.payload];
    },
  },
});

export const itemReducer = itemsSlice.reducer;
export const { initialLoad } = itemsSlice.actions;
export const itemsSelector = (state) => state.itemReducer.items;
