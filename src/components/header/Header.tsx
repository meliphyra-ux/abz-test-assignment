import Button from '../button/Button';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/images/Logo.svg" alt="Logo" width={104} height={26}/>
      <nav>
        <Button>Users</Button>
        <Button>Sign up</Button>
      </nav>
    </header>
  );
};

export default Header;
