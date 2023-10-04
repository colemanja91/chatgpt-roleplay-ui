import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import OpenaiModelSelect from './OpenaiModelSelect';
import XiModelInput from './XiModelInput';

import { gql, useMutation } from '@apollo/client';

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($input: CreateCharacterInput!) {
    createCharacter(input: $input) {
      character {
        id
        name
        systemMessage
        systemMessageTokens
        createdAt
        updatedAt
        ttsEnabled
        openaiModel
        xiVoiceId
        xiSimilarityBoost
        xiStability
        xiStyle
      }
    }
  }
`;

export default function CharacterCreateForm({ setActiveCharacterId }) {
  const [formState, setFormState] = useState({
    name: null,
    systemMessage: null,
    ttsEnabled: false,
    openaiModel: null,
    xiVoiceId: null,
    xiSimilarityBoost: 0,
    xiStability: 0,
    xiStyle: 0
  });

  const [createCharacter, { loading, error }] = useMutation(CREATE_CHARACTER, { 
    refetchQueries: ['GetCharacters'],
    onCompleted: (data) => {
      setActiveCharacterId(data.createCharacter.character.id)
    }
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <form 
      onSubmit={e => {
        e.preventDefault();
        createCharacter({
          variables: {
            input: {
              name: formState.name,
              systemMessage: formState.systemMessage,
              ttsEnabled: formState.ttsEnabled,
              openaiModel: formState.openaiModel,
              xiVoiceId: formState.xiVoiceId,
              xiSimilarityBoost: formState.xiSimilarityBoost,
              xiStability: formState.xiStability,
              xiStyle: formState.xiStyle
            }
          }
        });
      }}
    >
      <FormControl>
        <FormLabel required>Name</FormLabel>
        <Input 
          value={formState.name}
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value
            })} 
          required />
      </FormControl>
      <FormControl>
          <FormLabel>OpenAI Model</FormLabel>
          <OpenaiModelSelect formState={formState} setFormState={setFormState} />
        </FormControl>
      <FormControl>
        <FormLabel required>System Prompt</FormLabel>
        <Textarea 
          minRows={4} 
          value={formState.systemMessage} 
          onChange={(e) =>
            setFormState({
              ...formState,
              systemMessage: e.target.value
            })}
          required />
      </FormControl>
      <FormControl>
        <FormLabel required>Enable TTS Generation?</FormLabel>
        <Switch 
          defaultChecked={formState.ttsEnabled}
          onChange={(e) =>
            setFormState({
              ...formState,
              ttsEnabled: e.target.checked
            })
          }
        />
      </FormControl>
      <XiModelInput formState={formState} setFormState={setFormState} disabled={!formState.ttsEnabled} />

      <Button type="submit" color="primary">Save</Button>
    </form>
  )
};
