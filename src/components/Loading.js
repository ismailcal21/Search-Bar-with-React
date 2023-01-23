const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className="spinner-border text-success d-flex justify-content-center align-items-center"
        style={{ height: "50px", width: "50px" }}
        role="status"
      >
        <div>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
