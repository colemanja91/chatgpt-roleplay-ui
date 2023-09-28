import * as React from 'react';
import CharacterForm from './CharacterForm';

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
    }
  }
`;

export default function Character({ id = null }) {
  const { loading, error, data } = useQuery(GET_CHARACTER, {variables: {id: id}});
  if (id == null) return <p>Select a character</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <CharacterForm data={data} />
  );
};