import { userReducer } from "@/entities/user/slice";
import { configureStore } from "@reduxjs/toolkit";
import { budgetReducer } from "@/entities/budget";
import { categoryDReducer } from "@/entities/categoryD";
import { categoryRReducer } from "@/entities/categoryR/slice";

const store = configureStore({
  reducer: {
    budget:budgetReducer,
    user: userReducer,
    categoryD: categoryDReducer,
    categoryR: categoryRReducer,

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
