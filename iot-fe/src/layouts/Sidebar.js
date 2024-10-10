import React, { useState } from 'react';
import '../css/sidebar.css'; // Ensure the path is correct

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h2>IoT</h2>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item"><a className="nav-link active" href="#">Dashboard</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Datasensor</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Lịch sử</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
