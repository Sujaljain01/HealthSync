import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreatePayment, CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import axios from 'axios';


const AddAppointments = () => {
  const { data } = useSelector((store) => store.auth);
  const notify = (text) => toast(text);
  const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
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
    AppointmentDate: "",
    DoctorName:""
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
      axios.post('http://localhost:4000/doctors/updateAppointments',data)
      
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
          <div className="Add_appointment_div">
            <h1>Add Appointment</h1>
            <form>
            <div>
            <label>Patient Id</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Id"
                    name="patientId"
                    value={ReportValue.patientId}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Appointment Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="Appointment Date"
                    name="AppointmentDate"
                    value={ReportValue.AppointmentDate}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Doctor Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Doctor"
                    name="DoctorName"
                    value={ReportValue.DoctorName}
                    onChange={HandleReportChange}
                    required
                  />
                </div>
              </div>
                    
              <button
                className="formsubmitbutton appointmentbutton"
                onClick={HandleReportSubmit}
              >
                {loading ? "Loading..." : "Adding Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAppointments;