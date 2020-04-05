import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./slices/root-reducer";

export default function configureAppStore(preloadedState?: any) {
  const store = configureStore({
    middleware: [...getDefaultMiddleware()],
    reducer: rootReducer
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./slices/root-reducer", () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
}
