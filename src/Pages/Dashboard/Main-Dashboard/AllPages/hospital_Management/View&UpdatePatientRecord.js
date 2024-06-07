import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import MedRecs from './MedRecs';

const ViewPatient = () => {
  const [forms, setForms] = useState([{ title: '', file: null }]);
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState('');
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
              <MedRecs medRecs = {patientData.medicalRecords}/>
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

