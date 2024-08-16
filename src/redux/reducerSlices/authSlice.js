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

const auth = getAuth(app);

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

export const signin = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkApi) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signin userCredentials => ", userCredentials);
      return userCredentials.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  "user/register",
  async ({ email, password }, thunkApi) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signup credentials => ", userCredentials);
      return userCredentials.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signout.pending, (state) => {
        state.loading = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setCurrentUser } = authSlice.actions;
export const authSelector = (state) => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  currentUser: state.authReducer.currentUser,
});
