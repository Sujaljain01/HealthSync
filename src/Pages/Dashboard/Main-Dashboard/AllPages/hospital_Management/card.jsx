import React from "react";

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="mb-2">
        <span className="font-bold text-gray-700">Patient ID:</span> {patient.patientId}
      </div>
      <div className="mb-2">
        <span className="font-bold text-gray-700">Message:</span> {patient.message}
      </div>
      <div>
        <span className="font-bold text-gray-700">Doctor Name:</span> {patient.doctorName}
      </div>
    </div>
  );
};

export default PatientCard;