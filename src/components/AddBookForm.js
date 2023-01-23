import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";

const AddBookForm = (props) => {
  useEffect(() => {
    document.title = "Kitaplik-Kitap Ekle";
  }, []);
  const [isbn, setIsbn] = useState("");
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  //const [categories, setCategories] = useState(null);
  const [books, setBooks] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categoriesState } = useSelector((state) => state);

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };
  const AddBook = () => {
    if (isbn === "" || bookname === "" || author === "") {
      alert("These can not be empty");
      return;
    }
    // <const hasBook = books.find((book) => book.name === bookname);
    // console.log("hasBook", hasBook);
    // if (hasBook !== undefined) {
    //   alert("Bu kitap daha önce kaydedildi");
    //   return;
    // }>
    const newBook = {
      id: new Date().getTime(),
      name: bookname,
      isbn: isbn,
      author: author,
      categoryId: category,
    };
    console.log("newbokk", newBook);
    axios
      .post("http://localhost:3004/books", newBook)
      .then((res) => {
        console.log("AddBook Res Cat", res);
        dispatch({ type: "ADD_BOOK", payload: newBook });
        setAuthor("");
        setBookName("");
        setIsbn("");
        navigate("/");
      })
      .catch((err) => {
        console.log(">>AddBook Err Cat", err);
      });
  };

  if (categoriesState.success !== true) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="container ">
          <div className="row my-5 ">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Kitap Adi"
                aria-label="First name"
                value={bookname}
                onChange={(event) => setBookName(event.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Kitap yazari"
                aria-label="Last name"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="isbn"
                aria-label="First name"
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value={""} selected>
                  categories
                </option>
                {categoriesState.categories.map((cat) => {
                  return <option value={cat.id}>{cat.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="my-4 d-flex justify-content-center ">
          <button
            onClick={() => setShowModal(true)}
            type="submit"
            className="btn  btn-primary w-25"
          >
            Kaydet
          </button>
        </div>
        {showModal === true && (
          <Modal
            title="Silme Islemi"
            aciklama={bookname}
            aciklama2="adli kitabi eklemek istediginizden emin misiniz?"
            setShowModal={setShowModal}
            onConfirm={() => AddBook()}
            onCancel={() => setShowModal(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AddBookForm;
