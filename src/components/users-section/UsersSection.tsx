import { useState, useEffect } from 'react';

import { User, fetchUsersWrapper } from '../../lib/apiFunctions';

import Typography from '../typography/Typography';
import Users from '../users/Users';
import Button from '../button/Button';

import styles from './users-section.module.scss';
import Preloader from '../preloader/Preloader';

const fetchUsers = fetchUsersWrapper();

const UsersSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [lastPage, setLastPage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchUsers = async () => {
    setIsFetching(true);
    const { users, lastPage } = await fetchUsers();
    setUsers((prevUsers) => [...prevUsers, ...users]);
    setLastPage(lastPage);
    setIsFetching(false);
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <section className={styles['users-section']}>
      <Typography type="heading">Working with GET request</Typography>
      <Users users={users} />
      {isFetching && <Preloader />}
      {!lastPage && <Button onClick={handleFetchUsers}>Show more</Button>}
    </section>
  );
};

export default UsersSection;
