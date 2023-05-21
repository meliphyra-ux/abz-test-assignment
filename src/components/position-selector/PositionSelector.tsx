import { useEffect, useState, useMemo } from 'react';

// Functions and Types
import { fetchPositions, Position } from '../../lib/apiFunctions';

import Typography from '../typography/Typography';
import RadioInput from '../radio-input/RadioInput';

import styles from './position-selector.module.scss'

const PositionSelector = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  // Creating RadioInputs
  const RadioInputs = useMemo(() => {
    if (positions.length >= 1) {
      return positions.map((position) => (
        <RadioInput key={position.id} position={position} />
      ));
    }
    return (
      <Typography type="body-text">An Error occured during request</Typography>
    );
  }, [positions]);

  useEffect(() => {
    // Fetching positions for position selector
    fetchPositions().then((data) => {
      setPositions(data);
    });
  }, []);

  return <div className={styles['radio-selector--container']}>{RadioInputs}</div>;
};

export default PositionSelector;
