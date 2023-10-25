import React from 'react';
import IconButton from '@mui/joy/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import { gql, useMutation } from '@apollo/client';

const START_SESSION = gql`
  mutation StartInsultSession($input: StartInsultSessionInput!) {
    startInsultSession(input: $input) {
      insultSession {
        id
      }
    }
  }
`;

export default function StartSessionButton({ sessionId }) {
  const [startSession] = useMutation(START_SESSION, {
    refetchQueries: ['GetSession']
  });

  return (
    <FormControl>
      <FormLabel>Start Session</FormLabel>
      <form 
        onSubmit={e => {
          startSession({
            variables: {
              input: {
                id: sessionId
              }
            }
          });
        }}
      >
        <IconButton type="submit">
          <PlayArrowIcon />
        </IconButton>
      </form>
    </FormControl>
  );
};
