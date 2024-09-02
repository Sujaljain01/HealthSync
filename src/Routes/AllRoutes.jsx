import React from "react";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Dashboard-Login/DLogin";
import AllReport from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/AllReport";
import CreatePatientProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/CreatePatientProfile";
import AddAppointments from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/AddAppointment";
import Patient_Details from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Patient_Details";
import Add_Patient from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/Add_Patient";

import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import MyCalendar from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/MyCalendar";
import ViewAndUpdatePatient from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/View&UpdatePatientRecord";
import Precautions from "../Pages/Dashboard/Main-Dashboard/AllPages/Patient/Precautions";
// import Gemini from '../Pages/Dashboard/Main-Dashboard/AllPages/Patient/Gemini';
// Change this import statement in AllRoutes.jsx
import PatientDashboard from "../Pages/Dashboard/Main-Dashboard/AllPages/Patient/PatientDashboard";
import ViewAppointments from "../Pages/Dashboard/Main-Dashboard/AllPages/hospital_Management/ViewAppointments";
import Dictaphone from "../Pages/Dashboard/Main-Dashboard/AllPages/Patient/Dictaphone";
import Recommendations from "../Pages/Dashboard/Main-Dashboard/AllPages/Patient/Analyser";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Precautions healthIssue="Kidney stone" />} /> */}
        <Route path="/" element={<DLogin />} />
        <Route path="/dashboard/:doctorName" element={<FrontPage />} />
        <Route path="/patientHome/:patientId" element={<PatientDashboard />} />
        ******************** hospital_Management Part *************************
        <Route path="/checkAppointments" element={<ViewAppointments />} />
        <Route path="/viewAndUpdatePatient" element={<ViewAndUpdatePatient />} />
        <Route path="/sendTranscript/:patientId" element={<Dictaphone />} />
       
        <Route path="/patientProfile" element={<CreatePatientProfile />} />
        <Route path="/patientdetails" element={<Patient_Details />} />
        ******************** hospital_Management Part ************************
        <Route path="/addpatient" element={<Add_Patient />} />
        <Route path="/bookappointment" element={<AddAppointments />} />
    
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/precautions/:patientId" element={<Precautions />} />
        <Route path="/updateSymptoms" element={<Recommendations />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
