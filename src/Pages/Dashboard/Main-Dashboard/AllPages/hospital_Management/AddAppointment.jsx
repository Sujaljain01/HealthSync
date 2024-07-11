import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";

const AddAppointments = () => {
  const { data } = useSelector((store) => store.auth);
  const notify = (text) => toast(text);
  const [loading, setLoading] = useState(false);
  const InitData = {
    patientId: "",
    AppointmentDate: "",
    DoctorName: ""
  };

  const [ReportValue, setReportValue] = useState(InitData);

  const HandleReportChange = (e) => {
    setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  };

  const HandleReportSubmit = async (e) => {
    e.preventDefault();
    let data = { ...ReportValue };
    try {
      setLoading(true);
      await axios.post('http://localhost:4000/doctors/updateAppointments', data).then((res)=>{
      if(res.data.message == 'appointment added')
      {
        setLoading(false);
        notify("Appointment added successfully!");
        setReportValue({
          patientId: "",
          AppointmentDate: "",
          DoctorName: ""
        })
      }
      else
      {
        notify("Appointment could not be added");
      }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      notify("Error adding appointment");
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.afterSidebar}>
          <div style={styles.addAppointmentDiv}>
            <h1 style={styles.heading}>Add Appointment</h1>
            <form onSubmit={HandleReportSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Patient Id</label>
                <input
                  type="text"
                  placeholder="Id"
                  name="patientId"
                  value={ReportValue.patientId}
                  onChange={HandleReportChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Appointment Date</label>
                <input
                  type="date"
                  name="AppointmentDate"
                  value={ReportValue.AppointmentDate}
                  onChange={HandleReportChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Doctor Name</label>
                <input
                  type="text"
                  placeholder="Doctor"
                  name="DoctorName"
                  value={ReportValue.DoctorName}
                  onChange={HandleReportChange}
                  required
                  style={styles.input}
                />
              </div>
              <button
                type="submit"
                style={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Loading..." : "Add Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f7fafc'
  },
  afterSidebar: {
    flex: 1,
    padding: '32px',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addAppointmentDiv: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  heading: {
    fontSize: '24px',
    color: '#4c51bf',
    marginBottom: '24px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4a5568'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #e2e8f0'
  },
  submitButton: {
    backgroundColor: '#4c51bf',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center'
  }
};

export default AddAppointments;