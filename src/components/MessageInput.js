import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function MessageInput({ characterId }) {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <Alert>Browser doesn't support speech recognition.</Alert>;
  }

  return (
    <div>
      <Textarea minRows={4} value={transcript} required />
      <Button color="neutral" variant="soft" onClick={SpeechRecognition.startListening}>Start</Button>
      <Button color="neutral" variant="soft" onClick={SpeechRecognition.stopListening}>Stop</Button>
      <Button color="neutral" variant="soft" onClick={resetTranscript}>Reset</Button>
    </div>
  );
};
