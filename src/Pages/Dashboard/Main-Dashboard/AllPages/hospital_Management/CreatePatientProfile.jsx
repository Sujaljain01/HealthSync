import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreatePayment, CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import './CSS/CreatePatientProfile.css'


const notify = (text) => toast(text);

const CreatePatientProfile = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const initmed = {
  //   medName: "",
  //   dosage: "",
  //   duration: "",
  // };
  // const [med, setmed] = useState(initmed);

  // const [medicines, setmedicines] = useState([]);

  // const HandleMedChange = (e) => {
  //   setmed({ ...med, [e.target.name]: e.target.value });
  // };

  const InitData = {
    patientId : "",
    patientAge: "",
    patientMobile: "",
    patientBloodGroup: "",
    patientGender: "",
    patientName: ""
  };

  const [ReportValue, setReportValue] = useState(InitData);

  const HandleReportChange = (e) => {
    setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  };



  const HandleReportSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...ReportValue
    };
    try {
      console.log(data);
      axios.post('http://localhost:4000/doctors/patientRegistration',data)
    } catch (error) {
      console.log(error);
    }
  };

  // if (data?.isAuthticated === false) {
  //   return <Navigate to={"/"} />;
  // }

  // if (data?.user.userType !== "doctor") {
  //   return <Navigate to={"/dashboard"} />;
  // }
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          {/* <div className="Main_Add_Doctor_div"> */}

          <div className="form-container">
            <h2>Create Patient Profile</h2>
            <form>
            {/* <div> */}
            
            <div className="form-group">
         <br />
            <label>Patient Id</label>
                
                  <input
                    type="text"
                    placeholder="Id"
                    name="patientId"
                    value={ReportValue.patientId}
                    onChange={HandleReportChange}
                    required
                  />
                
              </div>
              {/* <div> */}  
                 <div className="form-group">
                <label>Patient Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Name"
                    name="patientName"
                    value={ReportValue.patientName}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
              {/* <div> */}
              <div className="form-group">
                <label>Patient Age</label>
                {/* <div className="inputdiv"> */}
                  <input
                    type="number"
                    placeholder="Age"
                    name="patientAge"
                    value={ReportValue.patientAge}
                    onChange={HandleReportChange}
                    required
                  />
                
              </div>
              <div className="form-group">
                <label>Patient Mobile</label>
                
                  <input
                    type="text"
                    placeholder="Mobile"
                    name="patientMobile"
                    value={ReportValue.patientMobile}
                    onChange={HandleReportChange}
                    required
                  />
                
              </div>
              
              <div className="form-group">
                <label>Patient Gender</label>
                
                  <select
                    name="patientGender"
                    value={ReportValue.patientGender}
                    onChange={HandleReportChange}
                  >
                    <option value="Choose Gender">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                
              </div>
              <div className="form-group">
                <label>Patient Blood Group</label>
              
                  <select
                    name="patientBloodGroup"
                    value={ReportValue.patientBloodGroup}
                    onChange={HandleReportChange}
                    required
                  >
                    <option value="Choose Blood Group">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                
              </div>

              
              
              {/* ******************************************** */}
              {/* <div>
                <label>Medicines</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="PCM"
                    name="medName"
                    value={med.medName}
                    onChange={HandleMedChange}
                  />
                  <select name="duration" onChange={HandleMedChange}>
                    <option value="Dosage">Duration</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select>
                  <select name="dosage" onChange={HandleMedChange}>
                    <option value="Dosage">Dosage</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <input type="submit" value={"Add"} onClick={HandleMedAdd} />
                </div>
              </div>
               */}
              {/* *********************************** */}
              {/* <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    name="date"
                    value={ReportValue.date}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              <div>
                <label>Time</label>
                <div className="inputdiv">
                  <input
                    type="time"
                    name="time"
                    value={ReportValue.time}
                    onChange={HandleReportChange}
                  />
                </div>
              </div> */}

              <button
                className="formsubmitbutton bookingbutton"
                onClick={HandleReportSubmit}
              >
                {loading ? "Loading..." : "Generate Patient Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePatientProfile;