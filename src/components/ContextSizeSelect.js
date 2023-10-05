import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function ContextSizeSelect({ formState, setFormState }) {
  return (
    <Select 
      defaultValue={formState.contextSize} 
      onChange={(e, value) =>
        setFormState({
          ...formState,
          contextSize: value
        })}
    >
      <Option value={4096} key="4096">4096</Option>
      <Option value={16000} key="16000">16000</Option>
      <Option value={32000} key="32000">32000</Option>
    </Select>
  );
};
