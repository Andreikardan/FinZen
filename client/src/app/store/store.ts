import { userReducer } from "@/entities/user/slice";
import { configureStore } from "@reduxjs/toolkit";
import { budgetReducer } from "@/entities/budget";
import { categoryDReducer } from "@/entities/categoryD";
import { categoryRReducer } from "@/entities/categoryR/slice";
import { goalReducer } from "@/entities/goal";

const store = configureStore({
  reducer: {
    budget:budgetReducer,
    user: userReducer,
    categoryD: categoryDReducer,
    categoryR: categoryRReducer,
    goal: goalReducer,

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
