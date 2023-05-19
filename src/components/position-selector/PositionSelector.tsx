import { useEffect, useState, useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { fetchPositions, Position } from '../../lib/apiFunctions';

import { PostInputs } from '../form/Form';
import Typography from '../typography/Typography';

import RadioInput from '../radio-input/RadioInput';

const PositionSelector = ({
  register,
}: {
  register: UseFormRegister<PostInputs>;
}) => {
  const [positions, setPositions] = useState<Position[]>([]);

  const RadioInputs = useMemo(() => {
    if (positions.length >= 1) {
      return positions.map((position) => (
        <RadioInput key={position.id} register={register} position={position} />
      ));
    }
    return (
      <Typography type="body-text">An Error occured during request</Typography>
    );
  }, [positions, register])

  useEffect(() => {
    fetchPositions().then((data) => {
      setPositions(data);
    });
  }, []);

  return <>{RadioInputs}</>;
};

export default PositionSelector;
