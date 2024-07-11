import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaAmbulance } from "react-icons/fa";
import { GiNurseFemale } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHospitalUser } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { MdBedroomChild } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div>
        <div style={{ ...styles.sidebar, width: isOpen ? "200px" : "70px" }}>
          <div style={styles.topSection}>
            <h1 style={{ ...styles.logo, display: isOpen ? "block" : "none" }}>
              HealthSync
            </h1>
            <div style={{ ...styles.bars, marginLeft: isOpen ? "50px" : "0px" }}>
              <ImMenu onClick={toggle} style={styles.menuIcon} />
            </div>
          </div>
          <div style={styles.bottomSection}>
            <Link style={styles.link} to="/dashboard">
              <div style={styles.icon}>
                <MdDashboardCustomize style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Dashboard
              </div>
            </Link>

            <Link style={styles.link} to="/addpatient">
              <div style={styles.icon}>
                <FaHospitalUser style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Add Patient
              </div>
            </Link>

            <Link style={styles.link} to="/bookappointment">
              <div style={styles.icon}>
                <BsBookmarkPlus style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Appointments
              </div>
            </Link>

            <Link style={styles.link} to="/reports">
              <div style={styles.icon}>
                <TbReportMedical style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Reports
              </div>
            </Link>

            <Link style={styles.link} to="/checkappointment">
              <div style={styles.icon}>
                <BsFillBookmarkCheckFill style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Check Appointments
              </div>
            </Link>

            <Link style={styles.link} to="/createslip">
              <div style={styles.icon}>
                <BiDetail style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Create Report
              </div>
            </Link>

            <Link
              style={styles.link}
              onClick={() => dispatch({ type: "AUTH_LOGOUT" })}
              to="/"
            >
              <div style={styles.icon}>
                <FiLogOut style={styles.mainIcon} />
              </div>
              <div style={{ ...styles.linkText, display: isOpen ? "block" : "none" }}>
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    backgroundColor: '#4c51bf',
    transition: 'width 0.3s',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  bars: {
    cursor: 'pointer',
  },
  menuIcon: {
    color: '#fff',
    fontSize: '1.5rem',
  },
  bottomSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'background 0.3s',
  },
  linkText: {
    fontSize: '1rem',
  },
  icon: {
    marginRight: '10px',
  },
  mainIcon: {
    fontSize: '1.5rem',
  },
};

export default Sidebar;