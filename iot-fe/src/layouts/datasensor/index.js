import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Sidebar from "../Sidebar";
import Search from "./components/Search";
import "../../css/table.css";

const Datasensor = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [column, setColumn] = useState("");
  const [sortType, setSortType] = useState("asc")

  
  useEffect(() => {
    const getData = async () => {
      try {
        const urlSort = isSort ? `&_sort&column=${column}&type=${sortType}` : '';
        const url = isSearch
          ? `http://localhost:5000/datasensor/search?q=${query}&value=${value}&limit=${limit}&page=${page}${urlSort}`
          : `http://localhost:5000/datasensor?limit=${limit}&page=${page}${urlSort}`;
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data.data);
        setTotalPage(data.totalPages);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      }
    };

    getData();
  }, [limit, page, isSearch, query, value,isSort, column, sortType]);

  const handleSearch = (query, value) => {
    setIsSearch(true);
    setQuery(query);
    setValue(value);
    setPage(1);
  };
  const handleSort = (column) => {
    setColumn(column);
    setSortType((prevType) => (prevType === "asc" ? "desc" : "asc"));  
    setIsSort(true);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * limit;

  const handleMaxPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 container">
          <h1 className="mt-4">Datasensor</h1>
          <div className="container d-flex justify-content-end align-items-center">
            <Search onSearch={handleSearch} />
          </div>
          <div className="container d-flex align-items-center">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="col-1" scope="col">ID</th>
                  <th className="" scope="col">
                    Nhiệt độ
                    <Link to={ `?_sort&column=nhietdo&type=${sortType === "asc" ? "desc" : "asc"}` } onClick={() => handleSort('nhietdo')}>
                      {column === 'nhietdo'? sortType === 'asc'?<i class="fa-solid fa-arrow-up-short-wide" style={{ marginLeft: "5px" }}></i>:<i class="fa-solid fa-arrow-down-wide-short" style={{ marginLeft: "5px" }}></i> :<i className="fa-solid fa-sort" style={{ marginLeft: "5px" }}></i>}
                    </Link>
                  </th>
                  <th className="" scope="col">
                    Độ ẩm
                    <Link to={ `?_sort&column=doam&type=${sortType === "asc" ? "desc" : "asc"}` } onClick={() => handleSort('doam')}>
                    {column === 'doam'? sortType === 'asc'?<i class="fa-solid fa-arrow-up-short-wide" style={{ marginLeft: "5px" }}></i>:<i class="fa-solid fa-arrow-down-wide-short" style={{ marginLeft: "5px" }}></i> :<i className="fa-solid fa-sort" style={{ marginLeft: "5px" }}></i>}
                    </Link>
                  </th>
                  <th className="" scope="col">
                    Ánh sáng
                    <Link to={ `?_sort&column=anhsang&type=${sortType === "asc" ? "desc" : "asc"}` } onClick={() => handleSort('anhsang')}>
                      {column === 'anhsang'? sortType === 'asc'?<i class="fa-solid fa-arrow-up-short-wide" style={{ marginLeft: "5px" }}></i>:<i class="fa-solid fa-arrow-down-wide-short" style={{ marginLeft: "5px" }}></i> :<i className="fa-solid fa-sort" style={{ marginLeft: "5px" }}></i>}
                    </Link>
                  </th>
                  {/* <th className="" scope="col">
                    Tốc độ gió
                    <Link to={ `?_sort&column=dobui&type=${sortType === "asc" ? "desc" : "asc"}` } onClick={() => handleSort('dobui')}>
                      {column === 'dobui'? sortType === 'asc'?<i class="fa-solid fa-arrow-up-short-wide" style={{ marginLeft: "5px" }}></i>:<i class="fa-solid fa-arrow-down-wide-short" style={{ marginLeft: "5px" }}></i> :<i className="fa-solid fa-sort" style={{ marginLeft: "5px" }}></i>}
                    </Link>
                  </th> */}
                  <th className="" scope="col">
                    Thời gian
                    <Link to={ `?_sort&column=thoigian&type=${sortType === "asc" ? "desc" : "asc"}` } onClick={() => handleSort('thoigian')}>
                      {column === 'thoigian'? sortType === 'asc'?<i class="fa-solid fa-arrow-up-short-wide" style={{ marginLeft: "5px" }}></i>:<i class="fa-solid fa-arrow-down-wide-short" style={{ marginLeft: "5px" }}></i> :<i className="fa-solid fa-sort" style={{ marginLeft: "5px" }}></i>}
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{startIndex + index + 1}</th>
                    <td className="test">{item.nhietdo}</td>
                    <td>{item.doam}</td>
                    <td>{item.anhsang}</td>
                    <td>{item.thoigian}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container d-flex justify-content-between align-items-center row">
            <div className="col-5" style={{ marginBottom: '10px' }}>
              <label htmlFor="maxPagesToShow" className="me-2">Hiển thị:</label>
              <select
                id="maxPagesToShow"
                value={limit}
                onChange={handleMaxPageChange}
                className="form-select d-inline-block w-auto"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="col-7">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datasensor;
