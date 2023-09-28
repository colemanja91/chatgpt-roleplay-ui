import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import FormHelperText from '@mui/joy/FormHelperText';

export default function CharacterForm({ data = null }) {
  return (
    <FormControl>
      if (data) {
        <div>
          <FormLabel>ID</FormLabel>
          <Input value={data.character.id} disabled />
          <FormLabel>Created</FormLabel>
          <Input value={data.character.createdAt} disabled />
          <FormLabel>Updated</FormLabel>
          <Input value={data.character.updatedAt} disabled />
        </div>
      }
      <FormLabel required>Name</FormLabel>
      <Input value={data?.character?.name} required />
      <FormLabel required>System Prompt</FormLabel>
      <Textarea minRows={4} value={data?.character?.systemMessage} required />
      if (data) {
        <FormHelperText>{data.character.systemMessageTokens} tokens</FormHelperText>
      }
    </FormControl>
  );
};
