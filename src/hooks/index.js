import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const inputProps = () => {
    return {
      type,
      value,
      onChange,
    }
  }

  return {
    value,
    inputProps,
    setValue,
  }
}
