import { createSlice } from "@reduxjs/toolkit";

import { IData } from "@/types/types";
import { data } from "@/data/index";

const initialState: IData[] = data;

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
});

export const { actions, reducer } = dataSlice;
export default reducer;
