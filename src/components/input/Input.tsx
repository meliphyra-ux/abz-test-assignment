import { FC } from 'react'
import { FieldError } from 'react-hook-form';
import { PostInputsKeys } from '../form/Form'

import styles from './input.module.scss'

type InputProps ={
  inputField: InputField;
  error: undefined | FieldError
  isLabelUpped: boolean;
  register: Function
}

export type InputField = {
  title: string;
  pattern: RegExp;
  minLenght: number;
  maxLenght: number;
  helper_text?: string;
};

const Input: FC<InputProps> = ({ inputField, error, isLabelUpped, register}) => {
  const {title} = inputField

  return (
    <div
      key={title}
      className={styles['input-container']}
      aria-invalid={error ? 'true' : 'false'}
    >
      <label
        style={{
          top: isLabelUpped ? '0' : '',
        }}
      >
        {title}
      </label>
      <input
        type="text"
        {...register(title as PostInputsKeys, {
          pattern: { value: inputField.pattern, message: 'Pattern mismatch' },
          minLength: {
            value: inputField.minLenght,
            message: 'Value is too small',
          },
          maxLength: {
            value: inputField.maxLenght,
            message: 'Value is too big',
          },
          required: {
            value: true,
            message: 'Field is required'
          },
        })}
      />
        <span>{error?.message ?? inputField.helper_text}</span>
    </div>
  )
}

export default Input