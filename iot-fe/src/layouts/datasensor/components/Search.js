import React, { useState } from "react";
import '../../../css/search.css';

const Search = () => {
  const [filterType, setFilterType] = useState("Nhiệt độ");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSearch = () => {
    console.log(`Lọc theo ${filterType} với giá trị: ${filterValue}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định
  };

  return (
    <div className="search-container">
      <form>
        <select value={filterType} onChange={handleFilterChange} name="q">
          <option value="nhietdo">Nhiệt độ</option>
          <option value="doam">Độ ẩm</option>
          <option value="anhsang">Ánh sáng</option>
        </select>
        <input
          name="value"
          type="text"
          value={filterValue}
          onChange={handleInputChange}
          placeholder={`Nhập giá trị ${filterType.toLowerCase()}`}
        />

        <button onClick={handleSubmit} type="submit">
          Lọc
        </button>
      </form>
    </div>
  );
};

export default Search;
