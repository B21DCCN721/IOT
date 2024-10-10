import React from "react";
import Sidebar from "../Sidebar";

const History = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <h1 className="mt-4">History</h1>
          </div>
        </div>
      </div>
    );
  };
  
  export default History;