import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./CSS/Precautions.css";
const Precautions = () => {
    const {patientId} = useParams(); // Make sure to properly set the patientId, e.g., from props or useParams if needed
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchPrecautions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/precautions/${patientId}`);
                setData(response.data);
                console.log(response.data)
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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Health Precautions</h1>
          {loading && <p style={{ color: '#666' }}>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {data && (
            <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <pre>{data}</pre>
            </div>
          )}
        </div>
      );
    }

export default Precautions;
