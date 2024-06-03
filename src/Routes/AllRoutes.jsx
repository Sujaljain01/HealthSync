import React from "react";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Dashboard-Login/DLogin";

import AllReport from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/AllReport";
import Discharge_and_Create_Slip from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Discharge_and_Create_Slip";

import Patient_Details from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Patient_Details";
import Add_Patient from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Add_Patient";
import Book_Appointment from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Book_Appointment";

import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import MyCalendar from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/MyCalendar";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DLogin />} />
        <Route path="/dashboard" element={<FrontPage />} />
        ******************** hospital_Management Part *************************
        <Route path="/reports" element={<AllReport />} />
       
        <Route path="/createslip" element={<Discharge_and_Create_Slip />} />
        <Route path="/patientdetails" element={<Patient_Details />} />
   
        ******************** hospital_Management Part *************************
        <Route path="/addpatient" element={<Add_Patient />} />
        <Route path="/bookappointment" element={<Book_Appointment />} />
    
        <Route path="/calendar" element={<MyCalendar />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
