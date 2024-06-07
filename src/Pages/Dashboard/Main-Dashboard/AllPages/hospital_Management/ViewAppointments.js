import React, { useEffect, useState } from 'react';
import AllAppointments from "./AllAppointments";
import { Button } from 'react-bootstrap';
import axios from 'axios'
function ViewAppointments() {
    const [appDate, setAppDate] = useState('');
    const [appointments, setApp] = useState([]);

    // useEffect(()=>{
    //     fetchDate();
    // }, [appDate]);

    const handleChange = (e) => {
        setAppDate(e.target.value);
    };

    async function fetchDate() {
        const apps = await axios.get(`http://localhost:4000/doctors/getAllAppointments/${appDate}`);
        setApp(apps.data);
        console.log(apps.data);
    }

    return (
        <div>
            <input type="date" name="appDate" value={appDate} onChange={handleChange} />
            <label htmlFor="patientId">Date:</label>
            <Button onClick={fetchDate}>Fetch Data</Button>
            {
                appointments ?
                    (<div><AllAppointments appointments={appointments} /></div>) : (<div>Applications loading...</div>)
            }
        </div>
    )
}

export default ViewAppointments;