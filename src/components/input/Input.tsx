import { FC } from 'react';
// Importing types
import { FieldError } from 'react-hook-form';
import { InputField, PostInputsKeys } from '../../lib/types';

import styles from './input.module.scss';

type InputProps = {
  inputField: InputField;
  error: undefined | FieldError;
  isLabelUpped: boolean;
  register: Function;
};

const Input: FC<InputProps> = ({
  inputField,
  error,
  isLabelUpped,
  register,
}) => {
  const { title } = inputField;

  return (
    <div
      key={title}
      className={styles['input-container']}
      // Color switcher if error
      aria-invalid={error ? 'true' : 'false'}
    >
      <label
        // Rules for label
        style={{
          top: isLabelUpped ? '0' : '',
        }}
      >
        {title}
      </label>
      <input
        type="text"
        {...register(title as PostInputsKeys, {
          // Writting validation rules
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
            message: 'Field is required',
          },
        })}
      />
      <span>{error?.message ?? inputField.helper_text}</span>
    </div>
  );
};

export default Input;
