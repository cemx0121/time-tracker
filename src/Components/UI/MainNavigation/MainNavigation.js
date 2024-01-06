import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import InfoModal from "../InfoModal";
import { Link, useLocation } from "react-router-dom";
import "./MainNavigation.css";
import UserSettingsForm from "../../Settings/UserSettingsForm";
import { ImProfile } from "react-icons/im";
import { GrUserAdmin } from "react-icons/gr";
function MainNavigation({ children }) {
  const { userData } = useSelector((state) => state.auth);
  const [activeLink, setActiveLink] = useState(null);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const modalRef = useRef();

  const isAdmin = userData && userData.userRole === "Admin";

  useEffect(() => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split("/");
    if (pathParts.length > 1) {
      setActiveLink(pathParts[1]);
    }
  }, [location]);

  const handleWindowClick = (event) => {
    if (sidebarRef.current.contains(event.target)) {
      event.stopPropagation();
    } else {
      setSidebarActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  const removeActiveLink = () => {
    setActiveLink(null);
  };

  const toggleActive = (event) => {
    setSidebarActive(!isSidebarActive);
    event.stopPropagation();
  };

  return (
    <>
      <InfoModal
        ref={modalRef}
        modalTitle="Settings for user & profile"
        modalBody={
          <UserSettingsForm closeModal={() => modalRef.current.hide()} />
        }
      />
      <div
        className={isSidebarActive ? `sidebar open` : "sidebar"}
        ref={sidebarRef}
      >
        <div className="logo_details">
          {isSidebarActive && (
            <Link to="/" onClick={removeActiveLink}>
              <img
                className="logoPicture"
                src={`${process.env.PUBLIC_URL}/greenAiLogo.png`}
                alt="logo"
              />

              <div className="logo_name">Green.ai</div>
            </Link>
          )}
          <i className="bx bx-menu" id="btn" onClick={toggleActive}></i>
        </div>
        <ul className="nav-list">
          <li
            onClick={() => handleActiveLink("calender")}
            className={`${activeLink === "calender" ? "active" : ""}`}
          >
            <Link to="/calender">
              <i className="bx bx-calendar"></i>
              <span className="link_name">Calender</span>
            </Link>
            <span className="tooltip">Calender</span>
          </li>
          <li
            onClick={() => handleActiveLink("employees")}
            className={`${activeLink === "employees" ? "active" : ""}`}
          >
            <Link to="/employees">
              <i>
                <ImProfile size={20} />
              </i>
              <span className="link_name">Employees</span>
            </Link>
            <span className="tooltip">Employees</span>
          </li>
          {isAdmin && (
            <li
              onClick={() => handleActiveLink("admin-dashboard")}
              className={`${activeLink === "admin-dashboard" ? "active" : ""}`}
            >
              <Link to="/admin-dashboard">
                <i>
                  <GrUserAdmin />
                </i>
                <span className="link_name">Admin Dashboard</span>
              </Link>
              <span className="tooltip">Admin Dashboard</span>
            </li>
          )}
          <li
            onClick={() => modalRef.current.show()}
            className={`${activeLink === "settings" ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <a>
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
              <span className="tooltip">Settings</span>
            </a>
          </li>
          <li className="profile">
            <div className="profile_details">
              <img src={`${userData.imagePath}`} alt="profile" />
              <div className="profile_content">
                <div className="name">{`${userData.firstName} ${userData.lastName}`}</div>
                <div className="designation">{userData.jobPosition}</div>
              </div>
            </div>
            <Link to="/logout" className="logoutLink" id="log_out">
              <i className="bx bx-log-out" id="log_out"></i>
            </Link>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <main>{children}</main>
      </section>
    </>
  );
}

export default MainNavigation;
