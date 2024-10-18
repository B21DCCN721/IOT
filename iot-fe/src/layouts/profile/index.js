import React from "react";
import Sidebar from "../Sidebar";
import "../../css/profile.css";
import avatar from '../../static/img/avatar.png'

const Profile = () => {
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10 container-profile d-flex align-items-center">
          <div className="card-profile d-flex" style={{ width: "26rem" }}>
            <div>
              <img src={avatar}  alt="..." style={{ width: '150px', borderRadius: '50%' }}/>
            </div>
            <div className="card-profile-info">
              <h5>Đào Xuân Trí - B21DCCN721</h5>
              <h5>Nhóm 05</h5>
              <ul >
                <li >
                  <a  href="https://github.com/B21DCCN721/IOT.git" target="_blank" rel="noopener noreferrer">
                    Link github
                  </a>
                </li>
                <li >
                  <a  href="https://api.postman.com/collections/33872423-efae5b60-a157-40b3-a36d-ffd059e7dc28?access_key=PMAT-01JA3DF0Q90NHXEEJW9ZAA3VRW" target="_blank" rel="noopener noreferrer">
                    API DOCS
                  </a>
                </li>
                <li >
                  <a  href="#" target="_blank" rel="noopener noreferrer">
                    Link báo cáo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
