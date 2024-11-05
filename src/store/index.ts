import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./dataSlice";
import currentIndexReducer from "./currentIndexSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    currentIndex: currentIndexReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
