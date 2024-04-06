import {
  TypedUseSelectorHook,
  useDispatch as defaultUseDispatchHook,
  useSelector as defaultUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";
import store from "./store";
const useAppDispatch = defaultUseDispatchHook<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = defaultUseSelectorHook;
export * from "./store";
export { store, useAppDispatch, useAppSelector };