import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./CSS/Precautions.css";
const Precautions = ({ healthIssue: propHealthIssue }) => {
    const { healthIssue: paramHealthIssue } = useParams();
    const healthIssue = propHealthIssue || paramHealthIssue;
    const [precautions, setPrecautions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchPrecautions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/precautions/${healthIssue}`);
                setPrecautions(response.data);
            } catch (error) { 
                setError('Error fetching precautions');
            } finally {
                setLoading(false);
            }
        };

        fetchPrecautions();
    }, [healthIssue]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="precautions-container">
            <h1 className="precautions-heading">Precautions for {healthIssue}</h1>
            <div className="precautions-grid">
                {precautions.map((precaution, index) => (
                    <div key={index} className="precaution-card">
                        <div className="precaution-content">
                            <span className="precaution-number">{index + 1}</span>
                            <p className="precaution-text">{precaution}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Precautions;
