import { useEffect, useState, useMemo } from 'react';

// Functions and Types
import { UseFormRegister } from 'react-hook-form';
import { fetchPositions, Position } from '../../lib/apiFunctions';
import { PostInputs } from '../../lib/types';

import Typography from '../typography/Typography';
import RadioInput from '../radio-input/RadioInput';

const PositionSelector = ({
  register,
}: {
  register: UseFormRegister<PostInputs>;
}) => {
  const [positions, setPositions] = useState<Position[]>([]);

  // Creating RadioInputs
  const RadioInputs = useMemo(() => {
    if (positions.length >= 1) {
      return positions.map((position) => (
        <RadioInput key={position.id} register={register} position={position} />
      ));
    }
    return (
      <Typography type="body-text">An Error occured during request</Typography>
    );
  }, [positions, register]);

  useEffect(() => {
    // Fetching positions for position selector
    fetchPositions().then((data) => {
      setPositions(data);
    });
  }, []);

  return <>{RadioInputs}</>;
};

export default PositionSelector;
