import { ThunkAction, Action } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface AppError {
  error: string;
}

export enum SliceStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  EMPTY = "EMPTY"
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
