import React from "react";
import { NavLink } from 'react-router-dom';
import "../css/sidebar.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>IoT</h2>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/datasensor" activeClassName="active">
            Datasensor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/history" activeClassName="active">
            Lịch sử
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
