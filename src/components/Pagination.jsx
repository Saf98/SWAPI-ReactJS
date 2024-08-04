import "./App.css";

const Pagination = ({
  totalPostsCount,
  onHandlePageChange,
  currentPage,
  siblings,
  returnPaginationRange,
}) => {
  let array = returnPaginationRange(totalPostsCount, currentPage, siblings);

  return (
    <div className="buttons-container">
      <button
        className="page-button"
        onClick={() => onHandlePageChange("&laquo;")}
      >
        &laquo;
      </button>
      <button
        className="page-button"
        onClick={() => onHandlePageChange("&lsaquo;")}
      >
        &lsaquo;
      </button>
      {array.map((value, id) => {
        return (
          <button
            key={id}
            className={
              value === currentPage
                ? "active"
                : "page-button"
            }
            onClick={() => onHandlePageChange(value)}
          >
            {value}
          </button>
        );
      })}
      <button
        className="page-button"
        onClick={() => onHandlePageChange("&rsaquo;")}
      >
        &rsaquo;
      </button>
      <button
        className="page-button"
        onClick={() => onHandlePageChange("&raquo;")}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
