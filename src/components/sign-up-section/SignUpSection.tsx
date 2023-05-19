import Form from '../form/Form';
import styles from './sign-up-section.module.scss';

const SignUpSection = () => {
  return (
    <section className={styles['sign-up-section']}>
      <Form />
    </section>
  );
};

export default SignUpSection;
