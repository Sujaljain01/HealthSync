import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import axios from 'axios';

const DoctorDashboard = () => {
  // Dummy patient data
  // const [patients, setPatients] = useState([
  //   { patientId: 1, name: "John Doe", message: "Fever", doctorName: "Dr. Smith" },
  //   { patientId: 2, name: "Jane Doe", message: "Cough", doctorName: "Dr. Johnson" },
  //   { patientId: 3, name: "Alice Smith", message: "Headache", doctorName: "Dr. Brown" },
  //   // Add more dummy patients as needed
  // ]);
  const {doctorName} = useParams();
  const [patients, setPatients] = useState([]);

  useEffect(() => { 
    const fetchPatients = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/doctors/getQueries`);
            setPatients(response.data);
            console.log(response.data)
        } catch (error) { 
            console.log(error);
        }
    };

    fetchPatients();
}, [doctorName]);


  const handleAccept = (patientId) => {
    // Update patient status or perform any action
    window.location.href = '/bookappointment'
    console.log("Accepted patient with ID:", patientId);
  };

  // const handleIgnore = (patientId) => {
  //   // Update patient status or perform any action
  //   console.log("Ignored patient with ID:", patientId);
  // };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Doctor Dashboard</h1>
      <div style={gridContainerStyle}>
        {patients.map((patient) => (
          <div key={patient.patientId} style={cardStyle}>
            <div style={patientCardStyle}>
              <h2>{patient.patientId}</h2>
              <div><p>{patient.message}</p></div>
              <ul>
              {patient.healthIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
              </ul>
            </div>
            <div style={buttonContainerStyle}>
              <button
                style={acceptButtonStyle}
                onClick={() => handleAccept(patient.patientId)}
              >
                Accept
              </button>
              {/* <button
                style={ignoreButtonStyle}
                onClick={() => handleIgnore(patient.patientId)}
              >
                Ignore
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;

// Embedded CSS styles
const containerStyle = {
  margin: "auto",
  padding: "1rem",
};

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "1rem",
};

const cardStyle = {
  background: "#ffffff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.5rem",
  padding: "1rem",
};

const patientCardStyle = {
  marginBottom: "1rem",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const acceptButtonStyle = {
  background: "#28a745",
  color: "#ffffff",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  cursor: "pointer",
};

const ignoreButtonStyle = {
  background: "#dc3545",
  color: "#ffffff",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  cursor: "pointer",
};