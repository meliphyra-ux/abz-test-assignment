import Header from './components/header/Header';
import Main from './components/main/Main';
import SignUp from './components/sign-up-section/SignUp';
import UsersSection from './components/users-section/UsersSection';

import styles from './app.module.scss';
import UserProvider from './contexts/user/UserContext';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
      <UserProvider>
        <UsersSection />
        <SignUp />
      </UserProvider>
    </div>
  );
};

export default App;
