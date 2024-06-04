// import React, {useState} from 'react';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Button from 'react-bootstrap/Button';
// const DocUpload = () => {
//     const [title, setTitle] = useState('');
//     const [file, setFile] = useState(null);
//     const token = localStorage.getItem('token');

//     const url = `http://localhost:4000/patients/uploadDoc`;

//     const handleTitleChange = (e) => {
//       setTitle(e.target.value);
//     };

//     const handleFileChange = (e) => {
//       setFile(e.target.files[0]);
//     };

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic here
//       console.log('Title:', title);
//       console.log('File:', file);
//     };

//     return (
//         <div>
//         <form action={url} enctype="multipart/form-data" method="post">
//         <InputGroup className="mb-3">
//         <InputGroup.Text>Title</InputGroup.Text>
//         <Form.Control
//         name = "title"
//         onChange = {handleTitleChange}
//         />
//         </InputGroup>


//         <Form.Control className='mb-3'
//           type="file"
//           required
//           name='doc'
//             onChange = {handleFileChange}
//         /><br/>
//         <Button className='mb-3' type = 'submit'>Apply</Button>
//         </form>:<a href = '/log-in'>Log in to access</a>
//         </div>
//         )};

// export default DocUpload;

import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const UploadDoc = () => {
  const [forms, setForms] = useState([{ title: '', file: null }]);
  const url = `http://localhost:4000/patients/uploadDoc`;

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const newForms = [...forms];
    if (name === 'title') {
      newForms[index].title = value;
    } else if (name === 'file') {
      newForms[index].file = files[0];
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
        formData.append(`title`, form.title); // Unique titles using single value
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

  return (
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
  );
};

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

export default UploadDoc;
