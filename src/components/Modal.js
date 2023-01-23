import React from "react";

const Modal = (props) => {
  // const { onCancel, onConfirm, title, aciklama } = props;
  const { setShowModal, onConfirm, aciklama, title, aciklama2, onCancel } =
    props;

  return (
    <button
      onClick={onCancel}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "default",
        boxSizing: "border-box",
      }}
    >
      <div
        className="shadow-lg p-3 mb-5 bg-white rounded"
        style={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center">
          <strong>{aciklama}</strong> {aciklama2}
        </p>
        <div className="d-flex justify-content-center">
          <button
            onClick={onCancel}
            className="btn btn-sm btn-outline-danger mx-3"
          >
            Kapat
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-outline-primary btn-sm "
          >
            Onayla
          </button>
        </div>
      </div>
    </button>
  );
};
export default Modal;
