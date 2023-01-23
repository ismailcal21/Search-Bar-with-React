import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import CategoriesList from "./pages/categoriesList";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_CATEGORIES_FAIL",
          payload: "kategorileri cekerken bir hata olustu",
        });
      });
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get(" http://localhost:3004/books")
      .then((res) => {
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_BOOKS_FAIL", payload: "Hata olustu" });
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:catId" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
