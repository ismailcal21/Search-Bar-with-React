import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [cat, setCat] = useState(null);
  const [allCategories, setAllCategories] = useState(null);

  const { categoriesState } = useSelector((state) => state);
  console.log("C", categoriesState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();
  console.log("params : ", params.catId);

  useEffect(() => {
    document.title = "Kitaplik-Categories-Edit";
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3004/categories").then((res) => {
      console.log("Edit cat res", res.data);
      setAllCategories(res.data);
      const myCategory = res.data.find((item) => item.id == params.catId);
      console.log("mycat", myCategory);
      setCat(myCategory);
      setCategoryName(myCategory.name);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName === "") {
      alert("Burasi bos birakilamaz");
      return;
    }
    const hadCat = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );

    // console.log("hadCat", hadCat);

    if (hadCat !== undefined) {
      alert("There is a book that has a same name.");
    } else;

    const newCat = {
      //...category
      id: params.catId,
      name: categoryName[0].toUpperCase() + categoryName.substring(1),
    };
    axios
      .put(`http://localhost:3004/categories/${params.catId}`, newCat)
      .then((res) => {
        console.log("resnew", res);
        navigate("/categories");
        dispatch({ type: "EDIT_CATEGORIES", payload: newCat });
      })
      .catch((err) => {});
  };

  if (allCategories === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="container ">
            <div className="row my-5">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  aria-label="First name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="my-4 d-flex justify-content-center ">
            <button type="submit" className="btn  btn-primary w-25">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
