import Button from '../button/Button';

import styles from './header.module.scss';

const Header = () => {
  // Functions to scroll to corresponding blocks
  const scrollToUserSection = () => {
    const element = document.getElementById('users-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPostSection = () => {
    const element = document.getElementById('users-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <img src="/images/Logo.svg" alt="Logo" width={104} height={26} />
      <nav>
        <Button onClick={scrollToUserSection}>Users</Button>
        <Button onClick={scrollToPostSection}>Sign up</Button>
      </nav>
    </header>
  );
};

export default Header;
