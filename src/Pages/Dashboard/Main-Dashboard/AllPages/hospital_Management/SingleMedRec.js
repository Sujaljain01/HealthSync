import { React } from 'react';
import Card from 'react-bootstrap/Card';
function SingleMedRec(props) {
    const handleDownload = async () => {

        const link = document.createElement('a');
        link.href = props.url;
        link.download = 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <div>
                    <iframe
                        title="File Preview"
                        src={props.url}
                        width="200"
                        height="200"
                    />
                    <button onClick={handleDownload}>
                        Download PDF
                    </button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SingleMedRec;