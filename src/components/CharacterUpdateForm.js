import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DeleteCharacterButton from './DeleteCharacterButton';

import { gql, useMutation } from '@apollo/client';

const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($input: UpdateCharacterInput!) {
    updateCharacter(input: $input) {
      character {
        id
        name
        systemMessage
        systemMessageTokens
        createdAt
        updatedAt
      }
    }
  }
`;

export default function CharacterUpdateForm({ inputData, setActiveCharacterId }) {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER);

  const [formState, setFormState] = useState({
    id: inputData.character.id,
    name: inputData.character.name,
    systemMessage: inputData.character.systemMessage
  });

  return (
    <div>
      <form 
        onSubmit={e => {
          e.preventDefault();
          updateCharacter({
            variables: {
              input: {
                id: formState.id,
                name: formState.name,
                systemMessage: formState.systemMessage
              }
            }
          });
        }}
      >
        <FormControl>
          <FormLabel>ID</FormLabel>
          <Input value={inputData.character.id} disabled />
        </FormControl>
        <FormControl>
          <FormLabel>Created</FormLabel>
          <Input value={inputData.character.createdAt} disabled />
        </FormControl>
        <FormControl>
          <FormLabel>Updated</FormLabel>
          <Input value={inputData.character.updatedAt} disabled />
        </FormControl>
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
        <FormHelperText>{inputData.character.systemMessageTokens} tokens</FormHelperText>

        <Button type="submit" color="primary">Save</Button>
      </form>
      <Divider />
      <DeleteCharacterButton activeCharacterId={inputData.character.id} setActiveCharacterId={setActiveCharacterId} />
    </div>
  );
};
