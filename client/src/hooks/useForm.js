import {useState} from 'react'

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  return [
    values, e => {
    if (e && e.target) {
      setValues({...values,
        [e.target.name]: e.target.value
      });
    } else {
      return setValues(initialValues)
    }
   }
  ];
};