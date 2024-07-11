import React from 'react';
import {useParams} from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Container, Card, CardContent, Typography, Box, Paper } from '@mui/material';
import MicrophoneImage from './microphone.jpg'; // Ensure you have an appropriate microphone image
import RecordingImage from './recording.png'; // Ensure you have an appropriate recording image
import { Chip } from '@mui/material';
import { Send, Mic, MicOff } from '@mui/icons-material';
import axios from 'axios';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const {patientId} = useParams();

  const handleSend = async () => {
    // Here you can add functionality to send the transcript to the doctor
    await axios.post(`http://localhost:4000/patients/transUpload/${patientId}`, {transcript}).then((res)=>{
      console.log(res);
    })
    alert(`Transcript sent to the doctor: ${transcript}`);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
      Voice-to-Text Medical Submission
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img src={MicrophoneImage} alt="Microphone" width="100" />
      </Box>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          How to Use
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          <strong>1.</strong> Click "Start Recording" to begin.
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          <strong>2.</strong> Click "Stop Recording" to end.
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          <strong>3.</strong> Click "Send" to submit the transcript to your doctor.
        </Typography>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={SpeechRecognition.startListening}
          disabled={listening}
        >
          Start Recording
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={SpeechRecognition.stopListening}
          disabled={!listening}
        >
          Stop Recording
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={resetTranscript}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSend}
          endIcon={<Send />}
        >
          Send
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={RecordingImage} alt="Recording" width="50" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip
              icon={listening ? <Mic /> : <MicOff />}
              label={listening ? "Microphone: on" : "Microphone: off"}
              color={listening ? "success" : "default"}
              variant="outlined"
            />
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {transcript || 'Transcribed text will appear here...'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dictaphone;
