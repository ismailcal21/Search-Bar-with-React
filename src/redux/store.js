import categoriesReducer from "./reducers/categoriesReducer";
import { createStore, combineReducers } from "redux";
import booksReducer from "./reducers/booksReducer";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  bookState: booksReducer,
});

const store = createStore(rootReducer);

export default store;
