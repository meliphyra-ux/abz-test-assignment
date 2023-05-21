import { FC, MouseEventHandler, ReactNode } from 'react';

import styles from './button.module.scss';

type ButtonProps = {
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = ({ disabled, children, onClick }) => {
  const style = disabled ? styles.disabled : styles.normal;
  return (
    <button className={`${styles.button} ${style}`} 
    onClick={onClick}
    disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
