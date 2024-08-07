const CheckBoxFilter = ({defaultFilterKeys, visibleColumns, handleCheckboxChange}) => {
  return (
    <div className="form-control-container">
      {defaultFilterKeys?.map((obj, id) => {
        return (
          <label
            className={"form-control"}
            key={id}
            style={{ marginRight: "10px" }}
          >
            <input
              key={id}
              type="checkbox"
              checked={visibleColumns[obj.id]}
              onChange={() => handleCheckboxChange(obj.id)}
            />
            {obj.label}
          </label>
        );
      })}
    </div>
  );
};

export default CheckBoxFilter;
