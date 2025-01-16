import { userReducer } from "@/entities/user/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { budgetReducer } from "@/entities/budget";
import { categoryDReducer, categoryRReducer } from "@/entities/category";
import { goalReducer } from "@/entities/goal";
import { transactionDReducer } from "@/entities/transactionD";
import { transactionRReducer } from "@/entities/transactionR";
import { sliderReducer } from "@/entities/infoSlider";

const appReducer = combineReducers({
  budget: budgetReducer,
  user: userReducer,
  categoryD: categoryDReducer,
  categoryR: categoryRReducer,
  goal: goalReducer,
  transactionD: transactionDReducer,
  transactionR: transactionRReducer,
  infoSlider: sliderReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "user/signOut/fulfilled") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
