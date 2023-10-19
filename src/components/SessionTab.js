import React, { useState } from 'react';
import PlayTtsButton from './PlayTtsButton';
import StartSessionButton from './StartSessionButton';
import EndSessionButton from './EndSessionButton';

import { gql, useQuery } from '@apollo/client';

const GET_SESSION = gql`
  query GetSession {
    insultSession {
      id
      name
      game
      deathCounter
      characters {
        id
        description
        voice {
          id
          name
        }
      }
      lastMessage {
        id
        content
        ttsFilePath
      }
    }
  }
`;

export default function SessionTab() {
  const { loading, error, data } = useQuery(GET_SESSION, {pollInterval: 5000});
  const [lastPlayedId, setLastPlayedId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const ttsFilePath = data.insultSession.lastMessage?.ttsFilePath;
  const messageId = data.insultSession.lastMessage?.id;

  const notPlayed = (
    messageId && messageId !== lastPlayedId
  )

  return (
    <div>
      <StartSessionButton sessionId={data.insultSession.id} />
      <EndSessionButton sessionId={data.insultSession.id} />
      {ttsFilePath && notPlayed ? (
        <PlayTtsButton ttsFilePath={ttsFilePath} ended={(e) => {setLastPlayedId(messageId)}} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
