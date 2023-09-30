import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { gql, useQuery } from '@apollo/client';

const GET_MODELS = gql`
  query GetOpenaiModels {
    openaiModels {
      id
    }
  }
`;

export default function OpenaiModelSelect({ formState, setFormState }) {
  const { loading, error, data } = useQuery(GET_MODELS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Select 
      defaultValue={formState.openaiModel} 
      onChange={(e, value) =>
        setFormState({
          ...formState,
          openaiModel: value
        })}
    >
      {data.openaiModels.map(({ id }) => (
        <Option value={id} key={id}>{id}</Option>
      ))}
    </Select>
  );
};
