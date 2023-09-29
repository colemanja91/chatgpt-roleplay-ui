import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';

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
      }
    }
  }
`;

export default function CharacterCreateForm({ setActiveCharacterId }) {
  const [formState, setFormState] = useState({
    name: null,
    systemMessage: null,
    ttsEnabled: false
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
              ttsEnabled: formState.ttsEnabled
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
          checked={formState.ttsEnabled} 
          onChange={(e) =>
            setFormState({
              ...formState,
              ttsEnabled: e.target.value === "on" ? true : false
            })}
        />
      </FormControl>

      <Button type="submit" color="primary">Save</Button>
    </form>
  )
};
