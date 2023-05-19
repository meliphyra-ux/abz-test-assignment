import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../button/Button';
import Input, { InputField } from '../input/Input';

import styles from './form.module.scss';
import Typography from '../typography/Typography';
import PositionSelector from '../position-selector/PositionSelector';
import ImageInput from '../image-input/ImageInput';
import { useMemo, useState } from 'react';
import { postUser } from '../../lib/apiFunctions';
import Success from '../success/Success';

export type PostInputs = {
  'Your name': string;
  Email: string;
  Phone: string;
  Position: number;
  Image: FileList;
};

export type PostInputsKeys = keyof PostInputs;

const TEXT_INPUT_FIELDS: InputField[] = [
  {
    title: 'Your name',
    pattern: /[a-zA-Z]/g,
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
    helper_text: '+38(0xx)xxxxxxx',
  },
];

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostInputs>({
    defaultValues: {
      'Your name': '',
      Email: '',
      Phone: '',
      Position: 0,
    },
  });

  const [isSuccess, setIsSuccess] = useState(true);

  const textInputFieldsValues = watch(['Your name', 'Email', 'Phone']);

  const otherInputFields = watch(['Position', 'Image']);

  const isButtonEnabled = useMemo(() => {
    const allInputFields = [...textInputFieldsValues, ...otherInputFields];
    const FileListInstance = allInputFields[4] as FileList;
    if (
      allInputFields.includes('') ||
      allInputFields.includes(0) ||
      FileListInstance.length === 0
    ) {
      return false;
    }
    return true;
  }, [otherInputFields, textInputFieldsValues]);

  const TextInputFields = TEXT_INPUT_FIELDS.map((inputField, index) => (
    <Input
      key={inputField.title}
      inputField={inputField}
      error={errors[inputField.title as PostInputsKeys]}
      isLabelUpped={textInputFieldsValues[index].length > 0}
      register={register}
    />
  ));

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    const res = await postUser(data);
    console.log(res);
  };

  return (
    <>
      {isSuccess ? (
        <Success />
      ) : (
        <>
          <Typography type="heading">Working with POST request</Typography>
          <form
            className={styles['form-container']}
            onSubmit={handleSubmit(onSubmit)}
          >
            {TextInputFields}
            <Typography type="body-text">Select your position</Typography>
            <PositionSelector register={register} />
            <ImageInput register={register} error={errors.Image} />
            <Button disabled={!isButtonEnabled}>Sign up</Button>
          </form>
        </>
      )}
    </>
  );
};

export default Form;
