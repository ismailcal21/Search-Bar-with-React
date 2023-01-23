import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";

const EditBook = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log("params", params);
  const [isbn, setIsbn] = useState("");
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  //const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { categoriesState, bookState } = useSelector((state) => state);
  console.log("booksatate edit1", bookState);

  //const [books, setBooks] = useState(null);
  useEffect(() => {
    document.title = "Kitaplik-Kitap Duzenle";
  }, []);

  useEffect(() => {
    const arananKitap = bookState.books.find((item) => item.id == params.id);

    if (arananKitap === undefined) {
      navigate("/");
      return;
    }
    setBookName(arananKitap.name);
    setAuthor(arananKitap.author);
    setIsbn(arananKitap.isbn);
    setCategory(arananKitap.categoryId);
    // axios
    //   .get(`http://localhost:3004/books/${params.id}`)
    //   .then((res) => {
    //     console.log("eDITBOOK Res Book", res);
    //     setBookName(res.data.name);
    //     setAuthor(res.data.author);
    //     setIsbn(res.data.isbn);
    //     setCategory(res.data.categoryId);
    //     axios
    //       .get("http://localhost:3004/categories")
    //       .then((res) => {
    //         console.log("EditBook Res Cat", res);
    //         setCategories(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(">>EditBook Err Cat", err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(">>EditBook Err Book", err);
    //   });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };
  const EditBook = () => {
    if (isbn === "" || bookname === "" || category === "") {
      alert("These can not be empty");
      return;
    }
    const updatedBook = {
      id: params.kitapId,
      name: bookname[0].toUpperCase() + bookname.substring(1),
      author: author,
      categoryId: category,
      isbn: isbn,
    };
    axios
      .put(`http://localhost:3004/books/${params.id}`, updatedBook)
      .then((res) => {
        console.log("UpdatedBook Res Cat", res);
        dispatch({ type: "EDIT_BOOK", payload: updatedBook });
        navigate("/");
      })
      .catch((err) => {
        console.log(">>UpdatedBook Err Cat", err);
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
    <div>
      <Header />

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
            <button type="submit" className="btn  btn-primary w-25">
              Kaydet
            </button>
            <Link to="/" className="btn  btn-danger w-25 mx-2">
              Vazgec
            </Link>
          </div>
          {showModal === true && (
            <Modal
              title="Silme Islemi"
              aciklama={`${bookname} `}
              aciklama2="adli kitabi duzenlemek istediginizden emin misiniz?"
              setShowModal={setShowModal}
              onConfirm={() => EditBook()}
              onCancel={() => setShowModal(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
};
export default EditBook;
