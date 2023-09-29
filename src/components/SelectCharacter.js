import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
    }
  }
`;

export default function SelectCharacter({ activeCharacterId, setActiveCharacterId }) {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleChange = (
    event,
    newValue,
  ) => {
    setActiveCharacterId(newValue === "new" ? null : newValue);
  };

  return (
    <Select defaultValue={activeCharacterId} onChange={handleChange}>
      <Option value="new" key="new">Create new...</Option>
      {data.characters.map(({ id, name }) => (
        <Option value={id} key={id}>{name}</Option>
      ))}
    </Select>
  );
};
