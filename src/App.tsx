import Header from './components/header/Header';
import MainSection from './components/main-section/MainSection';
import UsersSection from './components/users-section/UsersSection';

import styles from './app.module.scss'
import SignUpSection from './components/sign-up-section/SignUpSection';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <MainSection />
      <UsersSection />
      <SignUpSection />
    </div>
  );
};

export default App;
