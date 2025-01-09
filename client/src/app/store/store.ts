import { userReducer } from "@/entities/user/slice";
import { configureStore } from "@reduxjs/toolkit";
import { budgetReducer } from "@/entities/budget";
import { categoryDReducer } from "@/entities/categoryD";
import { categoryRReducer } from "@/entities/categoryR/slice";
import { transactionDReducer } from "@/entities/transactionD";
import { transactionRReducer } from "@/entities/transactionR";

const store = configureStore({
  reducer: {
    budget:budgetReducer,
    user: userReducer,
    categoryD: categoryDReducer,
    categoryR: categoryRReducer,
    transactionD: transactionDReducer,
    transactionR: transactionRReducer,

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
