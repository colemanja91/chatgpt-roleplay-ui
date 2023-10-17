import * as React from 'react';
import VoiceCreateForm from './VoiceCreateForm';
import VoiceUpdateForm from './VoiceUpdateForm';

import { gql, useQuery } from '@apollo/client';

const GET_VOICE = gql`
  query GetVoice($id: ID!) {
    voice(id: $id) {
      id
      name
      xiVoiceId
      xiSimilarityBoost
      xiStability
      xiStyle
    }
  }
`;

export default function Voice({ id, setActiveVoiceId }) {
  const { loading, error, data } = useQuery(GET_VOICE, {variables: {id: id}});

  if (id && loading) return <p>Loading...</p>;
  if (id && error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {
        id == null ? (
          <VoiceCreateForm 
            setActiveVoiceId={setActiveVoiceId} 
          />
        ) : (
          <VoiceUpdateForm 
            inputData={data} 
            setActiveVoiceId={setActiveVoiceId} 
          />
        )
      }
    </div>
  );
};