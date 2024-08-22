import { useState } from "react"

export const useForm = ({ initialState }) => {
  const [formState, setFormState] = useState(initialState);

  
  const onChangeManual = (value) => setFormState(t => ({...t, ...value}));
  const onChange = ({ target }) => {
    const { value, name } = target;
    onChangeManual({ [name] : value });
  }

  return ({
    formState,
    onChange,
    onChangeManual,
  })
}