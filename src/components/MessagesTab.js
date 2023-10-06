import * as React from 'react';
import Stack from '@mui/joy/Stack';
import MessageInput from './MessageInput';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import ClearMessageHistoryButton from './ClearMessageHistoryButton';

import { gql, useQuery } from '@apollo/client';
import MessageCard from './MessageCard';

const GET_MESSAGES = gql`
  query GetMessages($id: ID!) {
    character(id: $id) {
      id
      avatarUrl
      messages {
        id
        role
        content
        ttsFilePath
      }
    }
  }
`;

export default function MessagesTab({ activeCharacterId }) {
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {variables: {id: activeCharacterId}, pollInterval: 750});
  if (activeCharacterId == null) return <p>Select a character</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return(
    <Stack spacing={2}>
      {data.character.messages.map(({ id, role, content, ttsFilePath }) => (
        <MessageCard id={id} role={role} content={content} ttsFilePath={ttsFilePath} avatarUrl={data.character.avatarUrl} />
      ))}
      <MessageInput characterId={activeCharacterId} />
      <Button color="neutral" variant="soft" onClick={() => refetch()}>Refresh</Button>
      <Divider />
      <Divider />
      <ClearMessageHistoryButton activeCharacterId={activeCharacterId} />
    </Stack>
  );
}
