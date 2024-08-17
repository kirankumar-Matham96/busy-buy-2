import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authSelector } from "./authSlice";
import { addOrder } from "./ordersSlice";
import {
  notifyDanger,
  notifySuccess,
  notifyWarning,
} from "../../components/Notification";

/**
 * Get the initial cart items from Firestore for the current user.
 *
 * This thunk retrieves the current user's cart items from the Firestore database.
 * If the user is not logged in, it rejects the action with an error message.
 * If the user is logged in and their cart exists in Firestore, the cart items are returned.
 * Otherwise, it returns null, indicating that the cart is empty or doesn't exist.
 *
 * @async
 * @functiongetInitialCartItems
 * @param {void} arg - An unused argument; required by createAsyncThunk.
 * @param {object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {function} thunkApi.getState - A function that retrieves the current state of the Redux store.
 * @returns {Promise<Array|null|Error>} A promise that resolves to an array of cart items if the cart exists,
 *                                      null if the cart doesn't exist, or rejects with an error message.
 *
 * @throws {Error} Will throw an error if there is a problem fetching the cart items from Firestore.
 * @rejects {string} An error message indicating the reason for the failure.
 */
export const getInitialCartItems = createAsyncThunk(
  "cart/getInitialCart",
  async (arg, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    // if user is not logged in
    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      // fetch data from db
      const querySnapshot = await getDoc(doc(db, "cart", currentUser.email));
      if (querySnapshot.exists()) {
        const cartItems = { id: querySnapshot.id, ...querySnapshot.data() };
        return cartItems.cartItems;
      }
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Adds an item to the user's cart in Firestore.
 *
 * This thunk handles the process of adding an item to the user's cart stored in Firestore.
 * It first checks if the user is logged in. If the user is not logged in, it rejects the action.
 * If the user is logged in, it retrieves the existing cart items from Firestore and checks if the item
 * already exists in the cart. If the item exists, it increments the quantity of the item.
 * If the item does not exist, it adds the item to the cart with an initial quantity of 1.
 * Finally, it updates the cart data in Firestore and returns the updated cart.
 *
 * @async
 * @functionaddToCart
 * @param {object} item - The item to be added to the cart.
 * @param {string} item.id - The unique identifier of the item.
 * @param {object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {function} thunkApi.getState - A function that retrieves the current state of the Redux store.
 * @returns {Promise<Array|Error>} A promise that resolves to the updated cart array if the operation succeeds,
 *                                  or rejects with an error message if it fails.
 *
 * @throws {Error} Will throw an error if there is a problem updating the cart in Firestore.
 * @rejects {string} An error message indicating the reason for the failure.
 */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);
    const { cart } = cartSelector(state);

    // if user is not logged in
    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      // fetch cartItems from db
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnapshot = await getDoc(docRef);

      const cartList = cartSnapshot.exists()
        ? [...cartSnapshot.data().cartItems]
        : [];

      // check if item exists
      const isItemExists = cartList.some((cartItem) => cartItem.id === item.id);

      if (isItemExists) {
        // if exists, increment quantity
        cartList.map((cartItem) => {
          if (cartItem.id === item.id) {
            cartItem.quantity++;
          }
          return cartItem;
        });
      } else {
        // if not, add item to cart along with quantity:1
        cartList.push({ ...item, quantity: 1 });
      }

      // push the new cart data to db
      await setDoc(docRef, { cartItems: cartList });

      return [...cart, item];
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Removes an item from the user's cart in Firestore.
 *
 * This thunk handles the process of removing an item from the user's cart stored in Firestore.
 * It first checks if the user is logged in. If the user is not logged in, it rejects the action.
 * If the user is logged in, it retrieves the current cart items from Firestore, removes the item
 * with the specified `id` from the cart, and updates the cart data in Firestore.
 * If the item is not found in the cart, the action is rejected with an "Item not found" message.
 *
 * @async
 * @functionremoveFromCart
 * @param {string} id - The unique identifier of the item to be removed from the cart.
 * @param {object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {function} thunkApi.getState - A function that retrieves the current state of the Redux store.
 * @returns {Promise<Array|Error>} A promise that resolves to the updated cart array if the operation succeeds,
 *                                  or rejects with an error message if it fails.
 *
 * @throws {Error} Will throw an error if there is a problem updating the cart in Firestore.
 * @rejects {string} An error message indicating the reason for the failure.
 */
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    // if the user is not logged in
    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      // fetch data from db
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnap = await getDoc(docRef);
      const cartItems = (cartSnap.exists() && cartSnap.data().cartItems) || [];

      // filtering the item with id
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );

      // if the item not found
      if (updatedCartItems.length === cartItems.length) {
        return thunkApi.rejectWithValue("Item not found");
      }

      // Update the state with the new cart items
      await setDoc(docRef, { cartItems: updatedCartItems });

      // Return updated cart items to update the store
      return updatedCartItems;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Reduces the quantity of a specified item in the user's cart in Firestore.
 *
 * This thunk decreases the quantity of an item in the user's cart by 1. If the quantity
 * reaches 0, the item is removed from the cart. The updated cart is then saved to Firestore.
 * The function ensures the user is logged in before making any updates.
 *
 * @async
 * @functionreduceQuantity
 * @param {string} id - The unique identifier of the item for which the quantity is to be reduced.
 * @param {object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {function} thunkApi.getState - A function that retrieves the current state of the Redux store.
 * @returns {Promise<Array|Error>} A promise that resolves to the updated cart array if the operation succeeds,
 *                                  or rejects with an error message if it fails.
 *
 * @throws {Error} Will throw an error if there is a problem updating the cart in Firestore.
 * @rejects {string} An error message indicating the reason for the failure.
 */
export const reduceQuantity = createAsyncThunk(
  "cart/reduceQuantity",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    // if the user is not logged in
    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      // fetch data from db
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnap = await getDoc(docRef);
      const cartItems =
        (cartSnap.exists() && [...cartSnap.data().cartItems]) || [];

      // updating the data
      const updatedCartItems = cartItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      // Update the state with the new cart items
      await setDoc(docRef, { cartItems: updatedCartItems });

      // Return updated cart items to update the store
      return updatedCartItems;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Increases the quantity of a specified item in the user's cart in Firestore.
 *
 * This thunk increments the quantity of an item in the user's cart by 1.
 * The updated cart is then saved to Firestore. The function ensures the user is logged in before making any updates.
 *
 * @async
 * @functionincreaseQuantity
 * @param {string} id - The unique identifier of the item for which the quantity is to be increased.
 * @param {object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {function} thunkApi.getState - A function that retrieves the current state of the Redux store.
 * @returns {Promise<Array|Error>} A promise that resolves to the updated cart array if the operation succeeds,
 *                                  or rejects with an error message if it fails.
 *
 * @throws {Error} Will throw an error if there is a problem updating the cart in Firestore.
 * @rejects {string} An error message indicating the reason for the failure.
 */
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    // if the user is not logged in
    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      // fetch data from db
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnap = await getDoc(docRef);
      const cartItems = (cartSnap.exists() && cartSnap.data().cartItems) || [];

      // update the data
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      // Update the state with the new cart items
      await setDoc(docRef, { cartItems: updatedCartItems });

      // Return updated cart items to update the store
      return updatedCartItems;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Completes the purchase process by placing an order and clearing the user's cart.
 *
 * This thunk first dispatches an action to add the current cart items as an order in the database.
 * After the order is successfully placed, it clears the cart in Firestore by setting the cart items to an empty array.
 * The function ensures the user is logged in before proceeding with the purchase.
 *
 * @async
 * @functioncompletePurchase
 * @param {object} arg - An argument passed to the thunk, if any (currently unused).
 * @param {object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {function} thunkApi.getState - A function that retrieves the current state of the Redux store.
 * @param {function} thunkApi.dispatch - A function that allows dispatching other actions.
 * @returns {Promise<Array|Error>} A promise that resolves to an empty array if the purchase is completed successfully,
 *                                  or rejects with an error message if it fails.
 *
 * @throws {Error} Will throw an error if there is a problem completing the purchase.
 * @rejects {string} An error message indicating the reason for the failure.
 */
export const completePurchase = createAsyncThunk(
  "cart/completePurchase",
  async (arg, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);
    const { cart, totalPrice } = cartSelector(state);
    try {
      // dispatches an action to place an order
      await thunkApi
        .dispatch(
          addOrder({
            userId: currentUser.email,
            items: cart,
            total: totalPrice,
            timestamp: new Date().toDateString(),
          })
        )
        .unwrap();

      // clears the cart after placing the order
      const docRef = doc(db, "cart", currentUser.email);
      await setDoc(docRef, { cartItems: [] });

      return [];
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = { cart: [], loading: false, error: null, totalPrice: 0 };

/**
 * A Redux slice for managing the shopping cart state, including items in the cart, loading state,
 * total price calculation, and handling different cart-related actions like adding, removing,
 * and updating item quantities, as well as completing a purchase.
 *
 * @constant {Slice} cartSlice
 *
 * @property {string} name - The name of the slice, used to identify it in the store.
 * @property {object} initialState - The initial state of the cart, including an empty cart,
 *                                   zero total price, and no loading or error states.
 * @property {object} reducers - An object defining synchronous actions (currently empty).
 * @property {function} extraReducers - A function that defines how the slice's state changes in response
 *                                      to actions generated by the thunks (e.g., `getInitialCartItems`,
 *                                      `addToCart`, `removeFromCart`, `increaseQuantity`, `reduceQuantity`,
 *                                      `completePurchase`).
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      /**
       * Handles the pending state when fetching initial cart items.
       * Sets the loading state to true.
       */
      .addCase(getInitialCartItems.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state when cart items are successfully fetched.
       * Updates the cart and total price in the state.
       */
      .addCase(getInitialCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || [];
        state.totalPrice = state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2);
      })
      /**
       * Handles the rejected state when fetching cart items fails.
       * Sets the loading state to false and stores the error message.
       */
      .addCase(getInitialCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**
       * Handles the pending state when adding an item to the cart.
       * Displays a notification and sets the loading state to true.
       */
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        notifyWarning("Adding to cart...");
      })
      /**
       * Handles the fulfilled state when an item is successfully added to the cart.
       * Updates the cart and total price in the state, and displays a success notification.
       */
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2);
        notifySuccess("Item added to cart.");
      })
      /**
       * Handles the rejected state when adding an item to the cart fails.
       * Sets the loading state to false, stores the error message, and displays a failure notification.
       */
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to add to cart!");
      })
      /**
       * Handles the pending state when removing an item from the cart.
       * Sets the loading state to true.
       */
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state when an item is successfully removed from the cart.
       * Updates the cart and total price in the state, and displays a notification that the item was removed.
       */
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2);
        notifyDanger("Item removed from the cart!");
      })
      /**
       * Handles the rejected state when removing an item from the cart fails.
       * Sets the loading state to false and stores the error message.
       */
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**
       * Handles the pending state when increasing the quantity of an item in the cart.
       * Displays a notification and sets the loading state to true.
       */
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true;
        notifyWarning("Increasing the quantity...");
      })
      /**
       * Handles the fulfilled state when the quantity of an item is successfully increased.
       * Updates the cart and total price in the state, and displays a success notification.
       */
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2);
        notifySuccess("Quantity increased.");
      })
      /**
       * Handles the rejected state when increasing the quantity of an item fails.
       * Sets the loading state to false, stores the error message, and displays a failure notification.
       */
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to increased increase the quantity!");
      })
      /**
       * Handles the pending state when decreasing the quantity of an item in the cart.
       * Displays a notification and sets the loading state to true.
       */
      .addCase(reduceQuantity.pending, (state) => {
        state.loading = true;
        notifyWarning("Decreasing the quantity...");
      })
      /**
       * Handles the fulfilled state when the quantity of an item is successfully decreased.
       * Updates the cart and total price in the state, and displays a success notification.
       */
      .addCase(reduceQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2);
        notifySuccess("Quantity Decreased.");
      })
      /**
       * Handles the rejected state when decreasing the quantity of an item fails.
       * Sets the loading state to false, stores the error message, and displays a failure notification.
       */
      .addCase(reduceQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to decreased increase the quantity!");
      })
      /**
       * Handles the pending state when completing a purchase.
       * Displays a notification and sets the loading state to true.
       */
      .addCase(completePurchase.pending, (state) => {
        state.loading = true;
        notifyWarning("Placing the order...");
      })
      /**
       * Handles the fulfilled state when the purchase is successfully completed.
       * Clears the cart in the state, and displays a success notification.
       */
      .addCase(completePurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        notifySuccess("Order Confirmed!");
      })
      /**
       * Handles the rejected state when completing the purchase fails.
       * Sets the loading state to false, stores the error message, and displays a failure notification.
       */
      .addCase(completePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to place order!");
      }),
});

// exporting reducer
export const cartReducer = cartSlice.reducer;

// exporting actions
export const { initialLoad, add, remove, increase, decrease } =
  cartSlice.actions;

/**
 * A selector function to access the state of the cart. This selector returns an object
 * containing the cart items, total price, loading state, and any error messages.
 *
 * @functioncartSelector
 * @param {Object} state - The entire Redux state.
 * @returns {Object} An object containing the current state of the cart:
 * @returns {Array} cartSelector.cart - The list of items in the cart.
 * @returns {string} cartSelector.totalPrice - The total price of the items in the cart.
 * @returns {boolean} cartSelector.loading - Whether the cart state is currently loading.
 * @returns {string|null} cartSelector.error - Any error messages related to cart actions.
 */
export const cartSelector = (state) => ({
  cart: state.cartReducer.cart,
  totalPrice: state.cartReducer.totalPrice,
  loading: state.cartReducer.loading,
  error: state.cartReducer.error,
});
