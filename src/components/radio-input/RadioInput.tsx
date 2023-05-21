// Importing types
import { useFormContext } from 'react-hook-form';
import { Position } from '../../lib/apiFunctions';

import Typography from '../typography/Typography';

import styles from './radio-input.module.scss';

const RadioInput = ({ position }: { position: Position }) => {
  const { register } = useFormContext()
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
