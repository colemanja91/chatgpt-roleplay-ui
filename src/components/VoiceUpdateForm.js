import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import VoiceInput from './VoiceInput';

import { gql, useMutation } from '@apollo/client';

const UPDATE_VOICE = gql`
  mutation UpdateVoice($input: UpdateVoiceInput!) {
    updateVoice(input: $input) {
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

export default function VoiceUpdateForm({ inputData, setActiveVoiceId }) {
  const [updateVoice] = useMutation(UPDATE_VOICE);

  const [formState, setFormState] = useState({
    id: inputData.voice.id,
    name: inputData.voice.name,
    xiVoiceId: inputData.voice.xiVoiceId,
    xiSimilarityBoost: inputData.voice.xiSimilarityBoost,
    xiStability: inputData.voice.xiStability,
    xiStyle: inputData.voice.xiStyle
  });

  return (
    <div>
      <form 
        onSubmit={e => {
          e.preventDefault();
          updateVoice({
            variables: {
              input: {
                id: formState.id,
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
      <Divider />
      
    </div>
  );
};
