import { useContext, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchUser, postUser } from '../../lib/apiFunctions';

import { UserContext } from '../../contexts/user/UserContext';

//Importing types
import { PostInputs, PostInputsKeys, InputField } from '../../lib/types';

import Input from '../input/Input';
import Button from '../button/Button';
import Typography from '../typography/Typography';
import PositionSelector from '../position-selector/PositionSelector';
import ImageInput from '../image-input/ImageInput';
import Success from '../success/Success';

import styles from './form.module.scss';

//Creting objects representing text input fields and their limitations

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
  // If isSuccess === true load Success component
  const { handleAddUser } = useContext(UserContext);
  const [isSuccess, setIsSuccess] = useState(false);

  // Setting 2 separate watchers to create text input fields and for isButtonEnabled
  const textInputFieldsValues = watch(['Your name', 'Email', 'Phone']);

  const otherInputFields = watch(['Position', 'Image']);

  // Control of disability of sign up button
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

  // Creating text input fields
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
    // Posting user
    const res = await postUser(data);
    // On success
    if (res.success && res.user_id) {
      setIsSuccess(res.success);
      // Grab new user
      const user = await fetchUser(res.user_id);
      // On success
      if (user !== null) {
        handleAddUser(user);
      }
    }
  };

  return (
    <>
      {isSuccess ? (
        <Success />
      ) : (
        <>
          <Typography type="heading">Working with POST request</Typography>
          <form
            className={styles['form--container']}
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
