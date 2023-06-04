import { configureStore } from "@reduxjs/toolkit";
import { streamMatricsApi } from "./services/createApi";

export const store = configureStore({
  reducer: {
    [streamMatricsApi.reducerPath]: streamMatricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    streamMatricsApi.middleware,
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
