import React, { useState } from 'react';
import AllAppointments from './AllAppointments';
import axios from 'axios';

function ViewAppointments() {
    const [appDate, setAppDate] = useState('');
    const [appointments, setApp] = useState([]);

    const handleChange = (e) => {
        setAppDate(e.target.value);
    };

    async function fetchDate() {
        try {
            const apps = await axios.get(`http://localhost:4000/doctors/getAllAppointments/${appDate}`);
            setApp(apps.data);
            console.log(apps.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }

    return (
        <div style={{ padding: '32px', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
            <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="appDate" style={{ display: 'block', color: '#4a5568', fontWeight: 'bold', marginBottom: '8px' }}>Date:</label>
                    <input
                        type="date"
                        name="appDate"
                        value={appDate}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
                    />
                    <button
                        onClick={fetchDate}
                        style={{ backgroundColor: '#4299e1', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', width: '100%' }}
                    >
                        Fetch Data
                    </button>
                </div>
                {appointments.length > 0 ? (
                    <div>
                        <AllAppointments appointments={appointments} />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#4299e1' }}>Applications loading...</div>
                )}
            </div>
        </div>
    );
}

export default ViewAppointments;