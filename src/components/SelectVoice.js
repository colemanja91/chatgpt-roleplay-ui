import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { gql, useQuery } from '@apollo/client';

const GET_VOICES = gql`
  query GetVoices {
    voices {
      id
      name
    }
  }
`;

export default function SelectVoice({ activeVoiceId, setActiveVoiceId, disabled }) {
  const { loading, error, data } = useQuery(GET_VOICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleChange = (
    event,
    newValue,
  ) => {
    setActiveVoiceId(newValue === "new" ? null : newValue);
  };

  return (
    <Select defaultValue={activeVoiceId} onChange={handleChange} disabled={disabled}>
      <Option value="new" key="new">Create new...</Option>
      {data.voices.map(({ id, name }) => (
        <Option value={id} key={id}>{name}</Option>
      ))}
    </Select>
  );
};
