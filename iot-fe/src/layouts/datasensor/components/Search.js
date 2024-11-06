import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("nhietdo");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query, value);
    navigate(`/datasensor/results?q=${query}&value=${value}`);
  };
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="select-filter" className="me-2">
          Lọc theo:
        </label>
        <select
          name="q"
          id="select-filter"
          onChange={(e) => setQuery(e.target.value)}
        >
          <option value="nhietdo">Nhiệt độ</option>
          <option value="doam">Độ ẩm</option>
          <option value="anhsang">Ánh sáng</option>
          <option value="search_time">Thời gian</option>
        </select>
        <input
          name="value"
          type="text"
          placeholder="Nhập giá trị..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Lọc</button>
      </form>
    </div>
  );
};

export default Search;
