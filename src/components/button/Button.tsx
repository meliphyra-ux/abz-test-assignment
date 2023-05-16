import { FC, MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = ({ disabled, children, onClick }) => {
  const classNames = disabled ? styles.disabled : styles.normal;
  return (
    <button className={`${styles.button} ${classNames}`} onClick={onClick}>{children}</button>
  );
};

export default Button;
