// Importing types
import { UseFormRegister } from 'react-hook-form';
import { PostInputs } from '../../lib/types';
import { Position } from '../../lib/apiFunctions';

import Typography from '../typography/Typography';

import styles from './radio-input.module.scss';

const RadioInput = ({ register, position }: { register: UseFormRegister<PostInputs>, position: Position }) => {
  return (
    <div className={styles['radio--container']}>
      <input
        type="radio"
        {...register('Position')}
        value={position.id}
        required
      />
      <label>
        <Typography type="body-text">{position.name}</Typography>
      </label>
    </div>
  );
};

export default RadioInput;
