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

/**
 * Asynchronously fetches the initial set of items from the fake store API.
 * This function is defined using `createAsyncThunk` and handles the API request to retrieve product data.
 *
 * @functiongetInitialState
 * @param {undefined} arg - The argument passed to the thunk. This function does not use any arguments.
 * @param {Object} thunkApi - The thunk API object provided by `createAsyncThunk`.
 * @param {Function} thunkApi.rejectWithValue - A function to handle errors by returning a rejected action with a value.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of product objects from the API response.
 */
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

/**
 * Redux slice for managing the state of items.
 * This slice includes state management for item listings, search, filtering, and categories.
 * It uses `createSlice` from Redux Toolkit to handle actions and state updates.
 *
 * @constant {Object} itemsSlice
 * @property {string} name - The name of the slice. Used as a prefix for generated action types.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - Reducer functions to handle synchronous actions.
 * @property {Function} reducers.setSearchTerm - Updates the search query in the state.
 * @property {Function} reducers.setCategories - Updates the list of selected categories.
 * @property {Function} reducers.setMaxPrice - Updates the maximum price filter.
 * @property {Function} reducers.filterResults - Filters items based on the search query, categories, and maximum price.
 * @property {Object} extraReducers - Handles asynchronous actions using `createAsyncThunk`.
 * @property {Function} extraReducers.addCase - Manages state changes based on the lifecycle of async thunks (pending, fulfilled, rejected).
 */
const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Updates the search query in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing the new search term.
     * @param {string} action.payload - The new search term.
     */
    setSearchTerm: (state, action) => {
      state.searchQuery = action.payload;
    },
    /**
     * Updates the list of selected categories.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing the new categories.
     * @param {Array<string>} action.payload - The new list of selected categories.
     */
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    /**
     * Updates the maximum price filter.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing the new maximum price.
     * @param {number} action.payload - The new maximum price filter.
     */
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    /**
     * Filters items based on search query, categories, and maximum price.
     * Updates the `filteredItems` in the state according to the current filters.
     *
     * @param {Object} state - The current state of the slice.
     */
    filterResults: (state) => {
      const { searchQuery, categories, maxPrice } = state;

      state.filteredItems = state.items
        // filter for search term
        .filter((item) =>
          searchQuery
            ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        )
        // filter for categories selected
        .filter((item) =>
          categories && categories.length > 0
            ? categories.includes(item.category)
            : true
        )
        // filter for price
        .filter((item) => (maxPrice ? item.price <= maxPrice : true));
    },
  },
  extraReducers: (builder) =>
    builder
      /**
       * Handles the pending state when fetching initial data.
       * Sets the loading state to true.
       */
      .addCase(getInitialState.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state when the data is successfully fetched.
       * Updates the state.
       * Extracts the categories and removes the duplicates.
       */
      .addCase(getInitialState.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload];
        state.filteredItems = [...action.payload];
        const categoriesSet = new Set();
        action.payload.map((item) => categoriesSet.add(item.category));
        state.allCategories = [...Array.from(categoriesSet)];
      })
      /**
       * Handles the rejected state when data fetch fails.
       * Sets the loading state to false and stores the error message.
       */
      .addCase(getInitialState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

/**
 * The reducer function for the `items` slice of the Redux store.
 * It handles actions and updates the state according to the logic defined in the `itemsSlice`.
 *
 * @constant {Function} itemReducer
 */
export const itemReducer = itemsSlice.reducer;

/**
 * Action creators generated by the `itemsSlice` to handle various state updates.
 *
 * @constant {Object} actions
 * @property {Function} setSearchTerm - Action creator for updating the search query in the state.
 * @property {Function} setCategories - Action creator for updating the selected categories in the state.
 * @property {Function} setMaxPrice - Action creator for updating the maximum price filter in the state.
 * @property {Function} filterResults - Action creator for filtering items based on the current filters.
 */
export const { setSearchTerm, setCategories, setMaxPrice, filterResults } =
  itemsSlice.actions;

/**
 * Selector function for accessing specific parts of the `items` slice state.
 *
 * @param {Object} state - The global Redux state object.
 * @returns {Object} - The selected state values related to items.
 * @property {Array<Object>} items - The list of filtered items.
 * @property {Array<string>} categories - The list of all available categories.
 * @property {boolean} loading - Indicates whether data is currently being loaded.
 * @property {string|null} error - Holds error messages if any errors occurred.
 */
export const itemsSelector = (state) => ({
  items: state.itemReducer.filteredItems,
  categories: state.itemReducer.allCategories,
  loading: state.itemReducer.loading,
  error: state.itemReducer.error,
});
