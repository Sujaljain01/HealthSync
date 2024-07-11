import React from 'react';
import Card from 'react-bootstrap/Card';
function SingleAppointment(props) {

    return (
        <div>
            <span>
                <Card style={{ width: '18rem' , height : '6rem'}}>
                    <Card.Body>
                        <Card.Title>Patient Name: {props.patientName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Doctor Name: {props.doctorName}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Contact Name {props.contactNumber}</Card.Subtitle>
                        <Card.Text>
                            Appointment Date: {props.appDate}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </span><hr/>
        </div>
    )
}

export default SingleAppointment;
