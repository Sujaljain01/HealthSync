import {React, useState} from 'react';
import SingleMedRec from './SingleMedRec.js';

function MedRecs(props) {
    return(
        props.medRecs.map((medRec) => {
        const url = `http://localhost:4000/files/${medRec}`
        return (
        <SingleMedRec key = {medRec} url = {url} />
        )}
    ) 
    )
} 

export default MedRecs; 