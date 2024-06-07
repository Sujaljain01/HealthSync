import React from 'react';
import Card from 'react-bootstrap/Card';
function SingleAppointment(props) {

    return (
        <div>
            <span>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{props.patientName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.doctorName}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{props.contactNumber}</Card.Subtitle>
                        <Card.Text>
                            {props.appDate}
                        </Card.Text>
                        <hr></hr>
                    </Card.Body>
                </Card>
            </span>
        </div>
    )
}

export default SingleAppointment;
