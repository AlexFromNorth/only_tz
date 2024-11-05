import { numberChanges } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentIndexState {
  currentIndex: number;
}

const initialState: CurrentIndexState = {
  currentIndex: 0,
};

const currentIndexSlice = createSlice({
  name: "currentIndex",
  initialState,
  reducers: {
    switchTheIndex(state, action: PayloadAction<number>) {
      state.currentIndex = numberChanges(state.currentIndex, action.payload);
    },
  },
});

export const { switchTheIndex } = currentIndexSlice.actions;
export default currentIndexSlice.reducer;
