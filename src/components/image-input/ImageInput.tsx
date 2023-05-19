import { FieldError, UseFormRegister } from 'react-hook-form';
import { PostInputs } from '../form/Form';

import styles from './image-input.module.scss';

const ImageInput = ({
  register,
  error
}: {
  register: UseFormRegister<PostInputs>,
  error: FieldError | undefined
}) => {
  const validateFile = async (file: FileList) => {
    const uploadedFile = file[0];
    const { type, size } = uploadedFile;
    const { width, height } = await getImageDimensions(uploadedFile);

    if (!type.includes('jpg') && !type.includes('jpeg')) {
      return 'Please upload a JPG or JPEG image.';
    }

    if (size > 5 * 1024 * 1024) {
      return 'File size exceeds the maximum limit of 5MB.';
    }

    if (width < 70 || height < 70) {
      return 'Image dimensions must be at least 70x70 pixels.';
    }

    return true; // File is valid
  };


  const getImageDimensions = (file: File) => {
    return new Promise<{ width: number; height: number }>((resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };
      image.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className={styles['image-input-container']}>
      <label htmlFor="image-upload">
        Upload
      </label>
      <input
        id="image-upload"
        accept='image/*'
        required
        type="file"
        {...register('Image', {
          validate: validateFile,
        })}
      />
      <span>{error && error.message}</span>
    </div>
  );
};

export default ImageInput;
