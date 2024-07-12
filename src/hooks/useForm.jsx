import { useState } from "react";

const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const reset = () => setFormValues(initialState);
  return [formValues, handleInputChange, reset];
};

export default useForm;
