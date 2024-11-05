"use client";

import { store } from "@/store";
import { ProvidersProps } from "@/types/types";
import { Provider } from "react-redux";

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}