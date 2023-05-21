import Form from '../form/Form';

import styles from './sign-up-section.module.scss';

const SignUp = () => {
  return (
    <section id="post-section" className={styles['sign-up--container']}>
      <Form />
    </section>
  );
};

export default SignUp;
