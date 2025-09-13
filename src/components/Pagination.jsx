import "../App.css";

const Pagination = ({
	totalPostsCount,
	onHandlePageChange,
	currentPage,
	siblings,
	returnPaginationRange,
}) => {
	let array = returnPaginationRange(totalPostsCount, currentPage, siblings);

	return (
		<div className="buttons-container container">
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
				const isElipsis = value === "...";
				const isActive = value === currentPage ? "active" : "page-button";
				return (
					<button
						key={id}
						className={isElipsis ? "elipsis" : isActive}
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
