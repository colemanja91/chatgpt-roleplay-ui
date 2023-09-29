import {React, useState} from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Switch from '@mui/joy/Switch';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { gql, useMutation } from '@apollo/client';

const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      character {
        id
      }
    }
  }
`;

export default function MessageInput({ characterId }) {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, { 
    refetchQueries: ['GetMessages'],
    onCompleted: (data) => {
      resetTranscript()
    }
  });

  const [temperatureState, setTemperatureState] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <Alert>Browser doesn't support speech recognition.</Alert>;
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <form 
      onSubmit={e => {
        e.preventDefault();
        sendMessage({
          variables: {
            input: {
              characterId: characterId,
              message: transcript,
              variableTemp: temperatureState
            }
          }
        });
      }}
    >
      <Textarea minRows={4} value={transcript} required />
      <Button color="neutral" variant="soft" onClick={SpeechRecognition.startListening}>Start</Button>
      <Button color="neutral" variant="soft" onClick={SpeechRecognition.stopListening}>Stop</Button>
      <Button color="neutral" variant="soft" onClick={resetTranscript}>Reset</Button>
      <FormControl>
        <FormLabel>Enable random temperature?</FormLabel>
        <Switch checked={temperatureState} onChange={(event) => setTemperatureState(event.target.checked)}/>
      </FormControl>
      <Button type="submit" color="primary">Submit</Button>
    </form>
  );
};
