import React from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Sidebar from "../Sidebar";
import Search from "./components/Search";
import "../../css/table.css";

const Datasensor = () => {
  const data = [
    {
      id: 1121,
      nhietdo: 27.6,
      doam: 43,
      anhsang: 42,
      thoigian: "2024-10-09 13:33:43",
    },
    {
      id: 1120,
      nhietdo: 27.6,
      doam: 43,
      anhsang: 36,
      thoigian: "2024-10-09 13:33:42",
    },
    {
      id: 1119,
      nhietdo: 27.6,
      doam: 43,
      anhsang: 36,
      thoigian: "2024-10-09 13:33:41",
    },
    {
      id: 1118,
      nhietdo: 27.6,
      doam: 43,
      anhsang: 42,
      thoigian: "2024-10-09 13:33:40",
    },
  ];
  const rowsPerPage = 1;
  const [page, setPage] = useState(1);
  const [maxPagesToShow, setMaxPagesToShow] = useState(5);

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
    setPage(1); // Khi thay đổi số hàng trên mỗi trang, reset về trang đầu
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
            <Search />
          </div>
          <div className="container d-flex align-items-center">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th className="col-1" scope="col">
                    ID
                  </th>
                  <th className="col-2" scope="col">
                    Nhiệt độ
                  </th>
                  <th className="col-2" scope="col">
                    Độ ẩm
                  </th>
                  <th className="col-2" scope="col">
                    Ánh sáng
                  </th>
                  <th className="col-3" scope="col">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{startIndex + index + 1}</th>{" "}
                    {/* Sửa lại chỉ số ID */}
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
