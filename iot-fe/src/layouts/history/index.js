import React from "react";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Sidebar from "../Sidebar";
import Search from "./components/Search";
import "../../css/table.css";

const Datasensor = () => {
  const [data, setData] = useState([]);
  const [maxPagesToShow, setMaxPagesToShow] = useState(5);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/history/?limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      }
      //finally là đoạn code luôn thực hiện dừ đúng hay lỗi
      // } finally {
      //   console.error('Lỗi lấy dữ liệu:', err);
      // }
    };
    getData();
  }, [limit]);
  const handleSearch = (data) => {
    setData(data)
  }
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const totalRows = Math.min(data.length, rowsPerPage * maxPagesToShow);
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = data.slice(0, totalRows).slice(startIndex, endIndex);
  const handleMaxPageChange = (event) => {
    setMaxPagesToShow(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value * 10));
    setPage(1); // Khi thay đổi số hàng trên mỗi trang, reset về trang đầu
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 container">
          <h1 className="mt-4">History</h1>
          <div className="container d-flex justify-content-end align-items-center">
            <Search onSearch={handleSearch} />
          </div>
          <div className="container d-flex align-items-center">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th className="col-2" scope="col">
                    ID
                  </th>
                  <th className="col-3" scope="col">
                    Thiết bị
                  </th>
                  <th className="col-3" scope="col">
                    Trạng thái
                  </th>
                  <th className="col-4" scope="col">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{startIndex + index + 1}</th>{" "}
                    {/* Sửa lại chỉ số ID */}
                    <td>{item.thietbi}</td>
                    <td>{item.trangthai}</td>
                    <td>{item.thoigian}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container d-flex justify-content-between align-items-center row">
            <div className="col-5">
              <label htmlFor="maxPagesToShow" className="me-2">
                Hiển thị:
              </label>
              <select
                id="maxPagesToShow"
                value={maxPagesToShow}
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
