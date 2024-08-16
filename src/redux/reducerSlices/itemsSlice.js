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
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {
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
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getInitialState.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInitialState.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload];
        state.filteredItems = [...action.payload];
        const categoriesSet = new Set();
        action.payload.map((item) => categoriesSet.add(item.category));
        state.allCategories = [...Array.from(categoriesSet)];
      })
      .addCase(getInitialState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const itemReducer = itemsSlice.reducer;
export const { setSearchTerm, setCategories, setMaxPrice, filterResults } =
  itemsSlice.actions;
export const itemsSelector = (state) => ({
  items: state.itemReducer.filteredItems,
  categories: state.itemReducer.allCategories,
  loading: state.itemReducer.loading,
  error: state.itemReducer.error,
});
