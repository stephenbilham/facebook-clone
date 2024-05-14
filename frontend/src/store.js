import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
// Combine all slice reducers into a single reducer object
const rootReducer = combineReducers({
	user: userSlice,
	// Add other slice reducers here
});

// Create and export the Redux store
const store = configureStore({
	reducer: rootReducer,
});

export default store;
