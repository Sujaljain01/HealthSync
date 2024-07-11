import { Table } from "antd";
import React, { useEffect } from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";
import DoctorDashboard from "../AllPages/hospital_Management/DoctorUpdates";
const FrontPage = () => {
  const columns = [
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
  }, [dispatch]);

  function registerPatient() {
    window.location.href = '/patientProfile';
  }

  function addAppointment() {
    window.location.href = '/bookappointment';
  }

  function checkAppointment() {
    window.location.href = '/checkAppointments';
  }

  function viewAndUpdatePatient() {
    window.location.href = '/viewAndUpdatePatient';
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f7fafc' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', color: '#4c51bf' }}>Overview</h1>
          <button
            onClick={() => console.log("Logout clicked")}
            style={{ backgroundColor: '#4c51bf', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div>
              <h1 style={{ fontSize: '20px', color: '#4c51bf' }}>{data?.doctor}</h1>
              <button onClick={registerPatient} style={{ backgroundColor: 'transparent', border: 'none', color: '#4a5568', cursor: 'pointer' }}>Register Patient</button>
            </div>
            <MdPersonAdd style={{ fontSize: '32px', color: '#4c51bf' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div>
              <h1 style={{ fontSize: '20px', color: '#4c51bf' }}>{data?.patient}</h1>
              <button onClick={addAppointment} style={{ backgroundColor: 'transparent', border: 'none', color: '#4a5568', cursor: 'pointer' }}>Add Appointment</button>
            </div>
            <FaUserNurse style={{ fontSize: '32px', color: '#4c51bf' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div>
              <h1 style={{ fontSize: '20px', color: '#4c51bf' }}>{data?.appointment}</h1>
              <button onClick={checkAppointment} style={{ backgroundColor: 'transparent', border: 'none', color: '#4a5568', cursor: 'pointer' }}>Check Appointment</button>
            </div>
            <RiEmpathizeLine style={{ fontSize: '32px', color: '#4c51bf' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div>
              <h1 style={{ fontSize: '20px', color: '#4c51bf' }}>{data?.report}</h1>
              <button onClick={viewAndUpdatePatient} style={{ backgroundColor: 'transparent', border: 'none', color: '#4a5568', cursor: 'pointer' }}>Update Records</button>
            </div>
            <RiAdminLine style={{ fontSize: '32px', color: '#4c51bf' }} />
          </div>
        </div>

        
        <DoctorDashboard/>
      </div>
      
    </div>
  );
};

export default FrontPage;