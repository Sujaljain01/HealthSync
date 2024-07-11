import React, { useState } from 'react';
import axios from 'axios';
import AnalyserImage from '../../../../../img/analyzer.jpg';
const Recommendations = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict-specialization', 
        { symptoms: symptoms },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };
  return (
    <div style={styles.page}>
      <div style={styles.imageContainer}>
        <img 
          src={AnalyserImage} 
          alt="Health" 
          style={styles.image}
        />
      </div>
      <div style={styles.container}>
        <h2 style={styles.heading}>Symptom Checker</h2> {/* Added heading here */}
        <input
          type="text"
          placeholder="Enter symptoms separated by commas"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          style={styles.input}
        />
        <button onClick={handlePredict} style={styles.button}>
          Predict
        </button>
        {prediction && (
          <div style={styles.predictionContainer}>
            <p style={styles.prediction}>Prediction: {prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
    background: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    marginLeft:'5px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  container: {
    flex: 1,
    margin: '100px',
    backgroundColor: '#fff',
    color: '#333',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '80%',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#54de54',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  predictionContainer: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#ffe082',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  prediction: {
    fontSize: '18px',
    color: '#333',
  },
  heading: { // Added heading style
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
};

export default Recommendations;
