import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";

const ListBook = (props) => {
  const dispatch = useDispatch();

  const [filteredBooks, setFilteredBooks] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [kitapId, setKitapid] = useState();
  const [kitapName, setKitapName] = useState();
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const { categoriesState, bookState } = useSelector((state) => state);
  console.log(">>>redux1", categoriesState);
  console.log(">>>BooksState", bookState);

  useEffect(() => {
    const filtered = bookState.books.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setFilteredBooks(filtered);
  }, [searchText]);

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        dispatch({ type: "DELETE_BOOK", payload: id });
        setDidUpdate(!didUpdate);
        setShowModal(false);
        document.location.reload();
      })
      .catch((err) => {
        console.log("delete err", err);
      });
  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:3004/books")
    //   .then((res) => {
    //     console.log("ListBook Res", res);
    //     setBooks(res.data);
    //     // axios
    //     //   .get("http://localhost:3004/categories")
    //     //   .then((res) => {
    //     //     console.log("ListBook Res Cat", res);
    //     //     setCategories(res.data);
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log(">>ListBook Err Cat", err);
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(">>ListBook Err", err);
    //   });
  }, [didUpdate]);

  if (
    bookState.success !== true ||
    (categoriesState.success !== true) | (filteredBooks === null)
  ) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <div className="col ">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Search the book name"
            aria-label="First name"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        <Link to="/add-book" className="btn btn-sm btn-primary">
          Kitap Ekle
        </Link>
      </div>

      <table className="table my-5 table-striped">
        <thead>
          <tr>
            <th scope="col">Kitap Adi</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th className="text-center" scope="col">
              ISBN
            </th>
            <th className="text-center" scope="col">
              Islem
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => {
            const category = categoriesState.categories.find(
              (cat) => cat.id == book.categoryId
            );
            return (
              <tr>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{category.id}</td>
                <td className="text-center">
                  {book.isbn === "" ? "-" : book.isbn}
                </td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        //deleteBook(book.id);
                        setDidUpdate(true);
                        setShowModal(true);
                        setKitapid(book.id);
                        setKitapName(book.name);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit-book/${book.id}`}
                      className="btn btn-sm btn-outline-primary mx-1"
                      onClick={() => {}}
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        {showModal === true && (
          <Modal
            title="Silme Islemi"
            aciklama={`${kitapName} `}
            aciklama2="adli kitabi silmek istediginizden emin misiniz?"
            setShowModal={setShowModal}
            onConfirm={() => deleteBook(kitapId)}
            onCancel={() => setShowModal(false)}
          />
        )}
      </table>
    </div>
  );
};

export default ListBook;
