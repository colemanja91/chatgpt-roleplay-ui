import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Switch from '@mui/joy/Switch';
import DeleteCharacterButton from './DeleteCharacterButton';
import OpenaiModelSelect from './OpenaiModelSelect';
import XiModelInput from './XiModelInput';
import ContextSizeSelect from './ContextSizeSelect';

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
        ttsEnabled
        openaiModel
        xiVoiceId
        xiSimilarityBoost
        xiStability
        xiStyle
        contextSize
        variableTemperatureEnabled
        avatarUrl
      }
    }
  }
`;

export default function CharacterUpdateForm({ inputData, setActiveCharacterId }) {
  const [updateCharacter] = useMutation(UPDATE_CHARACTER);

  const [formState, setFormState] = useState({
    id: inputData.character.id,
    name: inputData.character.name,
    systemMessage: inputData.character.systemMessage,
    ttsEnabled: inputData.character.ttsEnabled,
    openaiModel: inputData.character.openaiModel,
    xiVoiceId: inputData.character.xiVoiceId,
    xiSimilarityBoost: inputData.character.xiSimilarityBoost,
    xiStability: inputData.character.xiStability,
    xiStyle: inputData.character.xiStyle,
    contextSize: inputData.character.contextSize,
    variableTemperatureEnabled: inputData.character.variableTemperatureEnabled,
    avatarUrl: inputData.character.avatarUrl
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
                systemMessage: formState.systemMessage,
                ttsEnabled: formState.ttsEnabled,
                openaiModel: formState.openaiModel,
                xiVoiceId: formState.xiVoiceId,
                xiSimilarityBoost: formState.xiSimilarityBoost,
                xiStability: formState.xiStability,
                xiStyle: formState.xiStyle,
                contextSize: formState.contextSize,
                variableTemperatureEnabled: formState.variableTemperatureEnabled,
                avatarUrl: formState.avatarUrl
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
          <FormLabel>Avatar URL</FormLabel>
          <Input 
            value={formState.avatarUrl}
            onChange={(e) =>
              setFormState({
                ...formState,
                avatarUrl: e.target.value
              })} 
          />
        </FormControl>
        <FormControl>
          <FormLabel>OpenAI Model</FormLabel>
          <OpenaiModelSelect formState={formState} setFormState={setFormState} />
        </FormControl>
        <FormControl>
          <FormLabel>Context Size</FormLabel>
          <ContextSizeSelect formState={formState} setFormState={setFormState} />
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
        <FormControl>
        <FormLabel required>Enable variable temperature?</FormLabel>
        <Switch 
          defaultChecked={formState.variableTemperatureEnabled}
          onChange={(e) =>
            setFormState({
              ...formState,
              variableTemperatureEnabled: e.target.checked
            })
          }
        />
      </FormControl>
        <FormControl>
        <FormLabel required>Enable TTS Generation?</FormLabel>
        <Switch 
          checked={formState.ttsEnabled} 
          onChange={(e) =>
            setFormState({
              ...formState,
              ttsEnabled: e.target.checked
            })}
        />
      </FormControl>
      <XiModelInput formState={formState} setFormState={setFormState} disabled={!formState.ttsEnabled} />

        <Button type="submit" color="primary">Save</Button>
      </form>
      <Divider />
      <DeleteCharacterButton activeCharacterId={inputData.character.id} setActiveCharacterId={setActiveCharacterId} />
    </div>
  );
};
