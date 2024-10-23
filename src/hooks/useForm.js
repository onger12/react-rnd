import { useState } from "react"

export const useForm = (initialState, keys = []) => {
  const [formState, setFormState] = useState(initialState);
  const [disabledButtonSave, setDisabledButtonSave] = useState(true);
  
  const onChangeManual = (value) => setFormState(t => ({...t, ...value}));
  const onChange = ({ target }) => {
    const { value, name } = target;
    onChangeManual({ [name] : value });
  }
  const handleValidateDisableButtonSave = () => {
    const keys_ = keys?.length == 0 ? Object.keys(formState) : [...keys];
    for (const key in formState) {
      if(keys_.includes(key) && !formState[key]) {
        setDisabledButtonSave(true);
        return true;
      }
    }

    setDisabledButtonSave(false);
  }

  return ({
    formState,
    disabledButtonSave,
    onChange,
    onChangeManual,
    handleValidateDisableButtonSave,
  })
}