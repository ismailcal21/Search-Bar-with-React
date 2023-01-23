import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categoriesState, bookState } = useSelector((state) => state);

  useEffect(() => {
    document.title = "Kitaplik-Categories-List";
  }, []);

  const DeleteCat = (id) => {
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        dispatch({ type: "DELETE_CATEGORIES", payload: id });
        const booksHasCategory = bookState.books.filter(
          (item) => item.categoryId == id
        );
        console.log("bookShasCATEGORY", booksHasCategory);
        booksHasCategory.map((item) =>
          dispatch({ type: "DELETE_BOOKS", payload: item.id })
        );
      })
      .catch((err) => {});
  };

  if (categoriesState.success !== true) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <Header />

      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Link to="/add-category" className="btn btn-sm btn-primary">
            Kategori Ekle
          </Link>
        </div>
        <table className="table my-5 table-striped">
          <thead>
            <tr>
              <th scope="col">Kitap Adi</th>

              <th scope="col text-center">Islem</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.map((cat) => {
              return (
                <tr>
                  <td>{cat.name}</td>

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
                          // setDidUpdate(true);
                          // setShowModal(true);
                          // setKitapid(book.id);
                          // setKitapName(book.name);
                          DeleteCat(cat.id);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-category/${cat.id}`}
                        className="btn btn-sm btn-outline-primary mx-1"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* {showModal === true && (
          <Modal
            title="Silme Islemi"
            aciklama={`${kitapName} `}
            aciklama2="adli kitabi silmek istediginizden emin misiniz?"
            setShowModal={setShowModal}
            onConfirm={() => deleteBook(kitapId)}
            onCancel={() => setShowModal(false)}
          />
        )} */}
        </table>
      </div>
    </div>
  );
};
export default CategoriesList;
