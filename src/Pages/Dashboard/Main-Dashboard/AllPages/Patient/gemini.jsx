import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CSS/Gemini.css";

const Gemini = () => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/generate');
                console.log('Data fetched:', response.data);
                setData(response.data.text);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="gemini-container">Loading...</div>;
    }

    if (error) {
        return <div className="gemini-container">{error}</div>;
    }

    return (
        <div className="gemini-container">
            <h1>Information on Fever</h1>
            <div className="output">{data}</div>
        </div>
    );
};

export default Gemini;