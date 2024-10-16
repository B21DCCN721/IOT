import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("nhietdo");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const apiUrl = `http://localhost:5000/datasensor/search?q=${query}&value=${value}`;
    // const apiUrl = new URL("http://localhost:5000/datasensor/search");
    // apiUrl.searchParams.append("q", query);
    // apiUrl.searchParams.append("value", value);

    try {
      // Fetch the API data using async/await
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      onSearch(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    navigate(`/datasensor/results?q=${query}&value=${value}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <select name="q" onChange={(e) => setQuery(e.target.value)}>
          <option value="nhietdo">Nhiệt độ</option>
          <option value="doam">Độ ẩm</option>
          <option value="anhsang">Ánh sáng</option>
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
