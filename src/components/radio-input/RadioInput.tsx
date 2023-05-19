import { UseFormRegister } from 'react-hook-form';
import { PostInputs } from '../form/Form';

import styles from '../position-selector/position-selector.module.scss';
import { Position } from '../../lib/apiFunctions';
import Typography from '../typography/Typography';

const RadioInput = ({ register, position }: { register: UseFormRegister<PostInputs>, position: Position }) => {
  return (
    <div className={styles['radio-container']}>
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
