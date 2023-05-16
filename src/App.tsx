import Header from './components/header/Header';
import MainSection from './components/main-section/MainSection';
import UsersSection from './components/users-section/UsersSection';

import styles from './app.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <MainSection />
      <UsersSection />
    </div>
  );
};

export default App;
