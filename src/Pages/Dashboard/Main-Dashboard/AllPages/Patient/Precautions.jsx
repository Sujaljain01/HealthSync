import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./CSS/Precautions.css";

const Precautions = () => {
    // const { healthIssue: paramHealthIssue } = useParams();
    // const healthIssue = propHealthIssue || paramHealthIssue;
    const patientId = '';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchPrecautions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/precautions/${patientId}`);
                setData(response.data);
            } catch (error) { 
                setError('Error fetching precautions');
            } finally {
                setLoading(false);
            }
        };

        fetchPrecautions();
    }, [patientId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="precautions-container">
            <h1 className="precautions-heading">Precautions</h1>
            {data && (
                <>
                    <div className="section">
                        <h2>Information</h2>
                        <p>{data.information}</p>
                    </div>
                    <div className="section">
                        <h2>Symptoms</h2>
                        <ul>
                            {data.symptoms.map((symptom, index) => (
                                <li key={index}>{symptom}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="section">
                        <h2>Risk Factors</h2>
                        <ul>
                            {data.riskFactors.map((riskFactor, index) => (
                                <li key={index}>{riskFactor}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="section">
                        <h2>Precautions</h2>
                        <ul>
                            {data.precautions.map((precaution, index) => (
                                <li key={index}>{precaution}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="section">
                        <h2>Importance of Medication</h2>
                        <p>{data.medicationImportance}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Precautions;
