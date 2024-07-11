import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomImage from '../../../../../img/record1.png';
import { Box } from '@mui/material';

const PatientDashboard = () => {
    const {patientId} = useParams();
    console.log(patientId)
  const navigate = useNavigate();

  const handleHealthAid = () => {
    // Navigate to Health Aid page
    navigate(`/precautions/${patientId}`);
  };

  const handleReportIssue = () => {
    // Navigate to Report Issue page
    navigate(`/sendTranscript/${patientId}`);
  };

  const handleUpdateSymptoms = () => {
    // Navigate to Update Symptoms page
    navigate("/updateSymptoms");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Patient Dashboard</h1>
      <div style={gridContainerStyle}>
        <div style={cardStyle} onClick={handleHealthAid}>
          <h2 style={cardHeadingStyle}>Health Aid</h2>
          <p style={cardTextStyle}>Click here for health aid.</p>
        </div>
        <div style={cardStyle} onClick={handleReportIssue}>
          <h2 style={cardHeadingStyle}>Report Issue</h2>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
  <img src={CustomImage} alt="Custom Microphone" width="400" />
</Box>

          <p style={cardTextStyle}>Click here to report an issue.</p>
        </div>
        <div style={cardStyle} onClick={handleUpdateSymptoms}>
          <h2 style={cardHeadingStyle}>Update Symptoms</h2>
          <p style={cardTextStyle}>Click here to update your symptoms.</p>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  margin: "auto",
  padding: "32px",
};

const headingStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "32px",
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
};

const cardStyle = {
  background: "#E0E7FF",
  padding: "24px",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  ":hover": {
    transform: "scale(1.05)",
  },
};

const cardHeadingStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "16px",
};

const cardTextStyle = {
  fontSize: "1rem",
};

export default PatientDashboard;