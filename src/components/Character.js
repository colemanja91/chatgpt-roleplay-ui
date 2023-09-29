import * as React from 'react';
import CharacterUpdateForm from './CharacterUpdateForm';
import CharacterCreateForm from './CharacterCreateForm';

import { gql, useQuery } from '@apollo/client';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      systemMessage
      systemMessageTokens
      createdAt
      updatedAt
      ttsEnabled
    }
  }
`;

export default function Character({ setActiveCharacterId, id }) {
  const { loading, error, data } = useQuery(GET_CHARACTER, {variables: {id: id}});

  if (id && loading) return <p>Loading...</p>;
  if (id && error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {
        id == null ? (
          <CharacterCreateForm 
            setActiveCharacterId={setActiveCharacterId} 
          />
        ) : (
          <CharacterUpdateForm 
            inputData={data} 
            setActiveCharacterId={setActiveCharacterId} 
          />
        )
      }
    </div>
  );
};