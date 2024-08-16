import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  items: [],
  filteredItems: [],
  allCategories: [],
  categories: [],
  searchQuery: "",
  maxPrice: Infinity,
  loading: false,
  error: null,
};

export const getInitialState = createAsyncThunk(
  "items/fetchData",
  async (arg, thunkApi) => {
    try {
      const resp = await axios.get("https://fakestoreapi.com/products");
      return thunkApi.dispatch(initialLoad(resp.data));
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {
    initialLoad: (state, action) => {
      state.items = [...action.payload];
      state.filteredItems = [...action.payload];
      const categoriesSet = new Set();
      action.payload.map((item) => categoriesSet.add(item.category));
      state.allCategories = [...Array.from(categoriesSet)];
    },
    setSearchTerm: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    filterResults: (state) => {
      const { searchQuery, categories, maxPrice } = state;

      console.log({ searchQuery, categories, maxPrice });

      state.filteredItems = state.items
        .filter((item) =>
          searchQuery
            ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
        .filter((item) =>
          categories && categories.length > 0
            ? categories.includes(item.category)
            : true
        )
        .filter((item) => (maxPrice ? item.price <= maxPrice : true));
      console.log("state.filteredItems => ", state.filteredItems);
    },
  },
});

export const itemReducer = itemsSlice.reducer;
export const {
  initialLoad,
  setSearchTerm,
  setCategories,
  setMaxPrice,
  filterResults,
} = itemsSlice.actions;
export const itemsSelector = (state) => ({
  items: state.itemReducer.filteredItems,
  categories: state.itemReducer.allCategories,
});
