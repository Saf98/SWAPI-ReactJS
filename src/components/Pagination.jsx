const Pagination = ({
  totalPostsCount,
  onHandlePageChange,
  currentPage,
  siblings,
  returnPaginationRange
}) => {
  let array = returnPaginationRange(totalPostsCount, currentPage, siblings);

  return (
    <div>
      <button onClick={() => onHandlePageChange("&laquo;")}>&laquo;</button>
      <button onClick={() => onHandlePageChange("&lsaquo;")}>&lsaquo;</button>
      {array.map((value, id) => {
        return (
          <button
            key={id}
            className={value === currentPage ? "active" : ""}
            onClick={() => onHandlePageChange(value)}
          >
            {value}
          </button>
        );
      })}
      <button onClick={() => onHandlePageChange("&rsaquo;")}>&rsaquo;</button>
      <button onClick={() => onHandlePageChange("&raquo;")}>&raquo;</button>
    </div>
  );
};

export default Pagination;
