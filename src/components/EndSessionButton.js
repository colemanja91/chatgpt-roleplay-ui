import React from 'react';
import IconButton from '@mui/joy/IconButton';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import { gql, useMutation } from '@apollo/client';

const END_SESSION = gql`
  mutation EndSession($input: EndInsultSessionInput!) {
    endInsultSession(input: $input) {
      insultSession {
        id
      }
    }
  }
`;

export default function EndSessionButton({ sessionId }) {
  const [endSession] = useMutation(END_SESSION, {
    refetchQueries: ['GetSession']
  });

  return (
    <FormControl>
      <FormLabel>End Session</FormLabel>
      <form 
        onSubmit={e => {
          endSession({
            variables: {
              input: {
                insultSessionId: sessionId
              }
            }
          });
        }}
      >
        <IconButton type="submit">
          <PauseCircleOutlineIcon />
        </IconButton>
      </form>
    </FormControl>
  );
};
