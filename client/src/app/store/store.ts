import { userReducer } from "@/entities/user/slice";
import { configureStore } from "@reduxjs/toolkit";
import { budgetReducer } from "@/entities/budget";
import { categoryDReducer, categoryRReducer } from "@/entities/category";
import { goalReducer } from "@/entities/goal";
import { transactionDReducer } from "@/entities/transactionD";
import { transactionRReducer } from "@/entities/transactionR";
import { sliderReducer } from "@/entities/infoSlider";

const store = configureStore({
  reducer: {
    budget:budgetReducer,
    user: userReducer,
    categoryD: categoryDReducer,
    categoryR: categoryRReducer,
    goal: goalReducer,
    transactionD: transactionDReducer,
    transactionR: transactionRReducer,
    infoSlider:sliderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
