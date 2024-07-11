import React, { useState } from 'react';
import axios from 'axios';
import MedRecs from './MedRecs';
import { toast, ToastContainer } from "react-toastify";
const notify = (text) => toast(text);


const ViewAndUpdatePatient = () => {
  const [med, setMed] = useState({ medName: '', duration: '', dosage: '', medTime: '' });
  const [medicines, setMedicines] = useState([]);
  const [forms, setForms] = useState([{ title: '', file: null }]);
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [hIssue, setHIssue] = useState('');
  const url = `http://localhost:4000/patients/uploadDoc/${patientId}`;

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const newForms = [...forms];
    if (name === 'title') {
      newForms[index].title = value;
    } else if (name === 'file') {
      newForms[index].file = files[0];
      if (files[0]) {
        const originalFilename = files[0].name;
        newForms[index].originalFilename = originalFilename;
      }
    }
    setForms(newForms);
  };

  const handleAddTemplate = () => {
    setForms([...forms, { title: '', file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      forms.forEach(form => {
        if (form.title && form.file) {
          formData.append('title', form.originalFilename);
          formData.append('file', form.file);
        }
      });
      const response = await axios.post(url, formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setPatientId(e.target.value);
  };

  const fetchId = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/doctors/getPatientDetails/${patientId}`);
      setPatientData(response.data.patientData);
      console.log(response.data.patientData)
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleIssueChange = (e) => {
    setHIssue(e.target.value);
  };

  const handleMedChange = (e) => {
    setMed({ ...med, [e.target.name]: e.target.value });
  };

  const handleMedAdd = async (e) => {
    e.preventDefault();
    const newMedicines = [...medicines, med];
    setMedicines(newMedicines);
    try {
      await axios.post(`http://localhost:4000/doctors/updateMedicines/${patientId}`, { newMedicines, hIssue }).then((res)=>{
        if(res.data.message == 'Updated')
        {
          notify('Medicine added successfully')
        }
        else
        {
          notify('Medicine was not added')
        }
      });
    } catch (error) {
      notify('Something went wrong')
      console.error('Error updating medicines:', error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div style={{ padding: '32px', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="patientId" style={{ display: 'block', color: '#4a5568', fontWeight: 'bold', marginBottom: '8px' }}>Unique ID:</label>
          <input
            type="text"
            name="patientId"
            value={patientId}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
          />
          <button onClick={fetchId} style={{ backgroundColor: '#4299e1', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', width: '100%' }}>Fetch Data</button>
        </div>
        {patientData ? (
          <div>
            <div style={{ marginBottom: '24px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#4299e1', color: '#ffffff', padding: '8px 16px' }}>Patient Details</div>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span>Full Name:</span>
                  <span>{patientData.name}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span>Age:</span>
                  <span>{patientData.age}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span>Gender:</span>
                  <span>{patientData.gender}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #e2e8f0' }}>
                  <span>Contact Number:</span>
                  <span>{patientData.contactNumber}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
                  <span>Blood Group:</span>
                  <span>{patientData.bloodGroup}</span>
                </li>
                <MedRecs medRecs={patientData.medicalRecords} />
              </ul>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#4a5568', fontWeight: 'bold', marginBottom: '8px' }}>Health Issue</label>
              <input
                type="text"
                placeholder="Health Issue"
                name="healthIssue"
                value={hIssue}
                onChange={handleIssueChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
              />
              <hr style={{ marginBottom: '16px' }} />
              <label style={{ display: 'block', color: '#4a5568', fontWeight: 'bold', marginBottom: '8px' }}>Medicines</label>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Medicine Name"
                  name="medName"
                  value={med.medName}
                  onChange={handleMedChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
                />
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#4a5568', fontWeight: 'bold', marginBottom: '8px' }}>Time</label>
                  <input
                    type="time"
                    name="medTime"
                    value={med.medTime}
                    onChange={handleMedChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
                  />
                </div>
                <select
                  name="duration"
                  onChange={handleMedChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
                >
                  <option value="">Select Duration</option>
                  <option value="After Meal">After Meal</option>
                  <option value="Before Meal">Before Meal</option>
                </select>
                <select
                  name="dosage"
                  onChange={handleMedChange}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '16px' }}
                >
                  <option value="">Select Dosage</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button
                  type="submit"
                  onClick={handleMedAdd}
                  style={{ backgroundColor: '#48bb78', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', width: '100%' }}
                >
                  Add
                </button>
              </div>
            </div>

            <form
              action={url}
              encType="multipart/form-data"
              method="post"
              onSubmit={handleSubmit}
              style={{ backgroundColor: '#edf2f7', padding: '16px', borderRadius: '8px' }}
            >
              {forms.map((form, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ marginBottom: '8px', display: 'flex' }}>
                    <span style={{ padding: '8px 16px', backgroundColor: '#e2e8f0', borderRadius: '4px 0 0 4px' }}>Title</span>
                    <input
                      name="title"
                      value={form.title}
                      onChange={(e) => handleInputChange(index, e)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '0 4px 4px 0' }}
                    />
                  </div>
                  <input
                    type="file"
                    required
                    name="file"
                    onChange={(e) => handleInputChange(index, e)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddTemplate}
                style={{ backgroundColor: '#4299e1', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', width: '100%', marginBottom: '8px' }}
              >
                Add Template
              </button>
              <button
                type="submit"
                style={{ backgroundColor: '#48bb78', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', width: '100%' }}
              >
                Apply
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#4299e1' }}>Loading...</div>
        )}
      </div>
    </div>
    </>
  );
};

export default ViewAndUpdatePatient;
