import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  console.log("Cs", categoriesState);
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    document.title = "Kitaplik-Add-Category";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName === "") {
      alert("Burasi bos birakilamaz");
      return;
    }
    const hascat = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (hascat !== undefined) {
      alert("Bu category Daha once kaydedilmis");
    } else {
    }

    const newCategory = {
      id: new Date().getTime(),
      name: categoryName[0].toUpperCase() + categoryName.substring(1),
    };
    axios
      .post("http://localhost:3004/categories", newCategory)
      .then((res) => {
        console.log(res.data);
        setCategoryName("");
        navigate("/categories");
        dispatch({ type: "ADD_CATEGORIES", payload: newCategory });
      })
      .catch((err) => {
        console.log("addCategory", err);
      });
  };

  return (
    <div onSubmit={handleSubmit}>
      <Header />
      <div className="container my-5">
        <form>
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

export default AddCategory;
