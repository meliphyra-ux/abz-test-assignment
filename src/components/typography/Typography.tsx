import { FC, ReactNode } from 'react';
import styles from './typography.module.scss';

type TypographyProps = {
  type: 'heading' | 'body-text';
  children: ReactNode;
};

const Typography: FC<TypographyProps> = ({ type, children }) => {
  let Element;
  switch (type) {
    case 'heading': {
      Element = <h2 className={styles[type]}>{children}</h2>;
      break;
    }
    case 'body-text': {
      Element = <p className={styles[type]}>{children}</p>;
      break;
    }
  }
  return Element;
};

export default Typography;
