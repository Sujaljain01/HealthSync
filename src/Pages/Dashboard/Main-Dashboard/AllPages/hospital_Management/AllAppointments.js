import React from 'react';
import SingleAppointment from './SingleAppointment';

function AllAppointments({ appointments }) {
    return (
        <div>
            {appointments.map((appointment, index) => (
                <SingleAppointment
                    key={index}
                    patientName={appointment.patientName}
                    doctorName={appointment.doctorName}
                    contactNumber={appointment.patientContact}
                    appDate={appointment.appDate}
                />
            ))}
        </div>
    );
}

export default AllAppointments;
