import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import VoiceInput from './VoiceInput';

import { gql, useMutation } from '@apollo/client';

const CREATE_VOICE = gql`
  mutation CreateVoice($input: CreateVoiceInput!) {
    createVoice(input: $input) {
      voice {
        id
        name
        xiVoiceId
        xiSimilarityBoost
        xiStability
        xiStyle
      }
    }
  }
`;

export default function VoiceCreateForm({ setActiveVoiceId }) {
  const [formState, setFormState] = useState({
    name: null,
    xiVoiceId: null,
    xiSimilarityBoost: 0,
    xiStability: 0,
    xiStyle: 0
  });

  const [createVoice, { loading, error }] = useMutation(CREATE_VOICE, { 
    refetchQueries: ['GetVoices'],
    onCompleted: (data) => {
      setActiveVoiceId(data.createVoice.voice.id)
    }
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <form 
      onSubmit={e => {
        e.preventDefault();
        createVoice({
          variables: {
            input: {
              name: formState.name,
              xiVoiceId: formState.xiVoiceId,
              xiSimilarityBoost: formState.xiSimilarityBoost,
              xiStability: formState.xiStability,
              xiStyle: formState.xiStyle
            }
          }
        });
      }}
    >
      <VoiceInput formState={formState} setFormState={setFormState} />

      <Button type="submit" color="primary">Save</Button>
    </form>
  )
};
