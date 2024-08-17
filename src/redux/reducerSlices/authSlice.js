import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../../config/firestore.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentUser: null,
};

// get the auth instance of firebase
const auth = getAuth(app);

/**
 * Observe the authentication state of the user.
 * This function listens for changes in the authentication state (login/logout)
 * and updates the Redux state with the current user's information.
 *
 * @param {void} arg - Unused argument.
 * @param {object} thunkApi - The thunk API for dispatching actions.
 */
export const observeAuthState = createAsyncThunk(
  "user/observeAuthState",
  async (arg, thunkApi) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          thunkApi.dispatch(
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
        } else {
          thunkApi.dispatch(setCurrentUser(null));
        }
      });
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Sign in the user with email and password.
 * This function authenticates the user using Firebase authentication.
 *
 * @param {object} param - The user credentials object.
 * @param {string} param.email - The user's email address.
 * @param {string} param.password - The user's password.
 * @param {object} thunkApi - The thunk API for dispatching actions and handling errors.
 * @returns {object} The authenticated user's data.
 */
export const signin = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkApi) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Sign up a new user with email and password.
 * This function registers a new user using Firebase authentication.
 *
 * @param {object} param - The user credentials object.
 * @param {string} param.email - The user's email address.
 * @param {string} param.password - The user's password.
 * @param {object} thunkApi - The thunk API for dispatching actions and handling errors.
 * @returns {object} The registered user's data.
 */
export const signup = createAsyncThunk(
  "user/register",
  async ({ email, password }, thunkApi) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/**
 * Sign out the current user.
 * This function signs out the user from Firebase authentication and updates the Redux state.
 *
 * @param {void} arg - Unused argument.
 * @param {object} thunkApi - The thunk API for dispatching actions and handling errors.
 * @returns {null} Returns null when the user is signed out.
 */
export const signout = createAsyncThunk(
  "user/logout",
  async (arg, thunkApi) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Set the current user in the Redux state.
     *
     * @param {object} state - The current state of the auth slice.
     * @param {object} action - The action object containing the user data.
     */
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Handles the pending state when signing in.
       * Sets the loading state to true.
       */
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state when user successfully logged in.
       * Updates the current user in the state.
       * Sets the loading to false.
       */
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      /**
       * Handles the rejected state when login fails.
       * Sets the loading state to false and stores the error message.
       */
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**
       * Handles the pending state when signing up.
       * Sets the loading state to true.
       */
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state when user successfully registered.
       * Sets the loading to false.
       */
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
      })
      /**
       * Handles the rejected state when registration fails.
       * Sets the loading state to false and stores the error message.
       */
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**
       * Handles the pending state when signing out.
       * Sets the loading state to true.
       */
      .addCase(signout.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state when user successfully logged out.
       * Updates the current user in the state to null.
       * Sets the loading to false.
       */
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      /**
       * Handles the rejected state when logging out fails.
       * Sets the loading state to false and stores the error message.
       */
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/**
 * The reducer function for the auth slice.
 *
 * @type {function} A Redux reducer that handles the user authentication state.
 */
export const authReducer = authSlice.reducer;

/**
 * Action to set the current user in the auth slice.
 *
 * @type {function} A Redux action creator.
 */
export const { setCurrentUser } = authSlice.actions;

/**
 * Selector function to get the auth state from the Redux store.
 *
 * @param {object} state - The entire Redux state.
 * @returns {object} An object containing loading, error, and currentUser states.
 */
export const authSelector = (state) => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  currentUser: state.authReducer.currentUser,
});
