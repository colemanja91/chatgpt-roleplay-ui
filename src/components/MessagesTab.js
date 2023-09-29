import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import MessageInput from './MessageInput';

import { gql, useQuery } from '@apollo/client';

const GET_MESSAGES = gql`
  query GetMessages($id: ID!) {
    character(id: $id) {
      id
      messages {
        id
        role
        content
      }
    }
  }
`;

export default function MessagesTab({ activeCharacterId }) {
  const { loading, error, data } = useQuery(GET_MESSAGES, {variables: {id: activeCharacterId}});
  if (activeCharacterId == null) return <p>Select a character</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return(
    <Stack spacing={2}>
      {data.character.messages.map(({ id, role, content }) => (
        <div key={id}>
          <Divider />
          <Card 
            variant="solid" 
            color={role === "user" ? "primary" : "success"}
            sx={{ textAlign: "right" }}
          >
            <CardContent>
              <Typography>{content}</Typography>
            </CardContent>
          </Card>
        </div>
      ))}
      <MessageInput characterId={activeCharacterId} />
    </Stack>
  );
}
