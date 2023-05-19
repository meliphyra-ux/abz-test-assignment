import Button from '../button/Button';
import Typography from '../typography/Typography';

import styles from './main-section.module.scss';

const MainSection = () => {
  return (
    <section
      className={styles['main-section']}
    >
      <Typography type="heading">
        Test assignment for front-end developer
      </Typography>
      <Typography type="body-text">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </Typography>
      <Button>Sign up</Button>
    </section>
  );
};

export default MainSection;
