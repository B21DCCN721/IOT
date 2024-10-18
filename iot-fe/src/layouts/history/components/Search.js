import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();
  const apiUrl = `http://localhost:5000/history/search?search_time=${query}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
      console.log(error);
    }
    navigate(`/history/results?search_time=${query}`);
  };
  return (
    <div>
      <form className="search-container" onSubmit={handleSubmit}>
        <label htmlFor="start" className="me-2">
          Nhập thời gian:
        </label>
        <input
          name="value"
          id="start"
          type="text"
          placeholder="Nhập giá trị..."
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <input
          type="datetime-local"
          id="start"
          name="search_time"
          step="1"
          required
          onChange={(e) => setQuery(e.target.value)}
        /> */}
        <button type="submit">Lọc</button>
      </form>
    </div>
  );
};

export default Search;
