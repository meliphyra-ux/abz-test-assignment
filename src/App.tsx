import styles from './app.module.scss'
import UsersSection from './components/users-section/UsersSection';
import Header from './components/header/Header';
import MainSection from './components/main-section/MainSection';

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
