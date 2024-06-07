import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import MedRecs from './MedRecs';

const ViewPatient = () => {
  // const InitData = {
  //   medicines:[]
  //  };


  const [med, setMed] = useState({ medName: '', duration: '', dosage: '' , medTime : ''});
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
        const originalFilename = files[0].name; // Extract original filename
        newForms[index].originalFilename = originalFilename; // Add new property
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
      const formData = new FormData(); // Create FormData object

      // Iterate through each form object in the array
      for (const form of forms) {
        if (form.title && form.file) { // Check for both title and file presence
          formData.append(`title`, form.originalFilename); // Unique titles using single value
          formData.append(`file`, form.file);
        } else {
          console.warn('Skipping form: Missing title or file'); // Log warning for missing data
        }
      }

      console.log(formData)
      const response = await axios.post(url, formData);

      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setPatientId(e.target.value);
  };

  async function fetchId() {
    await axios.get(`http://localhost:4000/doctors/getPatientDetails/${patientId}`).then((response) => {
      console.log(response.data.patientData);
      setPatientData(response.data.patientData);
    })

  }

  const handleIssueChange = (e) => {
    setHIssue(e.target.value);
  }

  const HandleMedChange = (e) => {
    // Update state based on the changed element's name
    setMed({
      ...med,
      [e.target.name]: e.target.value,
    });
  };

  const HandleMedAdd = async (e) => {
    e.preventDefault();
    console.log(med);
    const newMedicines = [...medicines, med];
    setMedicines(newMedicines);

    await axios.post(`http://localhost:4000/doctors/updateMedicines/${patientId}`, { newMedicines, hIssue });
  };

  // const HandleReportChange = (e) => {
  //   setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  // };


  return (
    <div>
      <div>
        <input type="text" name="patientId" value={patientId} onChange={handleChange} />
        <label htmlFor="patientId">Unique ID:</label>
        <Button onClick={fetchId}>Fetch Data</Button>
      </div>
      {patientData ? (
        <div>
          <Card className="patient-details">
            <Card.Header>Patient Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroupItem>
                Full Name: <span className="float-right">{patientData.name} {patientData.lastName}</span>
              </ListGroupItem>
              <ListGroupItem>
                Age: <span className="float-right">{patientData.age}</span>
              </ListGroupItem>
              <ListGroupItem>Gender: <span className="float-right">{patientData.gender}</span></ListGroupItem>
              <ListGroupItem>
                Contact Number: <span className="float-right">{patientData.contactNumber}</span>
              </ListGroupItem>
              <ListGroupItem>Blood Group: <span className="float-right">{patientData.bloodGroup}</span></ListGroupItem>
              <MedRecs medRecs={patientData.medicalRecords} />
              {/* //prescription */}
              <div>
                <label>Health Issue</label>
                <div>
                  <input
                    type="text"
                    placeholder="HealthIssue"
                    name="medName"
                    value={hIssue}
                    onChange={handleIssueChange}
                  /></div><hr />
                <label>Medicines</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="PCM"
                    name="medName"
                    value={med.medName}
                    onChange={HandleMedChange}
                  />
                  <div>
                    <label>Time</label>
                    <div className="inputdiv">
                      <input
                        type="time"
                        name="medTime"
                        value={med.medTime}
                        onChange={HandleMedChange}
                      />
                    </div>
                  </div>
                  <select name="duration" onChange={HandleMedChange}>
                    <option value="Dosage">Duration</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select>
                  <select name="dosage" onChange={HandleMedChange}>
                    <option value="Dosage">Dosage</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select><hr />
                  <button type="submit" onClick={HandleMedAdd}>Add</button>
                </div>
              </div>
              {/* ************* */}


            </ListGroup>
          </Card>
          <div style={styles.container}>
            <form action={url} encType="multipart/form-data" method="post" onSubmit={handleSubmit} style={styles.form} >
              {forms.map((form, index) => (
                <div key={index} style={styles.formInstance}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Title</InputGroup.Text>
                    <Form.Control
                      name="title"
                      value={form.title}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </InputGroup>

                  <Form.Control
                    className="mb-3"
                    type="file"
                    required
                    name="file"
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              ))}
              <Button className="mb-3" type="button" onClick={handleAddTemplate}>Add Template</Button>
              <Button className="mb-3" type="submit">Apply</Button>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading patient details...</div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e6f7ff',
  },
  form: {
    width: '50%',
    padding: '20px',
    border: '1px solid #007acc',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  formInstance: {
    marginBottom: '20px',
  },
};

export default ViewPatient;

