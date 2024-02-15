import React from "react";

function NumImp({ dataIn, label, handleData, id }) {
  const handleChange = (e) => {
    handleData(e.target.value, id);
  };

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        min={1}
        max={4}
        type="number"
        className="form-control"
        value={dataIn}
        id={id}
        onChange={handleChange}
      />
    </>
  );
}

export default NumImp;
