import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
// Importing types
import { InputField, PostInputsKeys } from '../../lib/types';

import styles from './input.module.scss';

type InputProps = {
  inputField: InputField;
  isLabelUpped: boolean;
};

const Input: FC<InputProps> = ({
  inputField,
  isLabelUpped,
}) => {
  const { register, formState: {errors} } = useFormContext()
  
  const { title } = inputField;
  const error = errors[title];

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
      <span>{error?.message as string ?? inputField.helper_text}</span>
    </div>
  );
};

export default Input;
