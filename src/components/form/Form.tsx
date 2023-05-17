import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/Button';

import styles from './form.module.scss'

type Inputs = {
  'Your name': string;
  Email: string;
  Phone: string;
};

const INPUT_FIELDS = [
  {
    title: 'Your name',
    pattern: /a-zA-z/g,
    minLenght: 2,
    maxLenght: 60,
  },
  {
    title: 'Email',
    pattern:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    minLenght: 2,
    maxLenght: 100,
  },
  {
    title: 'Phone',
    pattern: /^[+]{0,1}380([0-9]{9})$/g,
    minLenght: 13,
    maxLenght: 13,
  },
];

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const inputFieldsValues = watch(['Your name', 'Email', 'Phone']);

  const InputFields = INPUT_FIELDS.map((inputField, index) => (
    <div
    key={inputField.title}
    className={styles['input-container']}
      aria-invalid={errors[inputField.title as keyof Inputs] ? 'true' : 'false'}
    >
      <label
      style={{
        top: inputFieldsValues[index].length > 0 ? '0' : '',
      }}
      >{inputField.title}</label>
      <input type="text" {...register(inputField.title as keyof Inputs, {
        pattern: inputField.pattern,
        minLength: inputField.minLenght,
        maxLength: inputField.maxLenght
      })} />
    </div>
  ));

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {InputFields}
      <Button>Submit</Button>
    </form>
  );
};

export default Form;
