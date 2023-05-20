import { useState, useContext, useCallback } from 'react';

import { UserContext } from '../../contexts/user/UserContext';

import Typography from '../typography/Typography';
import Users from '../users/Users';
import Button from '../button/Button';
import Preloader from '../preloader/Preloader';

import styles from './users-section.module.scss';
import { fetchUsers } from '../../lib/apiFunctions';

const UsersSection = () => {
  const {
    handleAddPage,
    fetchParams: { next_url, current_page },
    visiblePages,
  } = useContext(UserContext);
  const [lastPage, setLastPage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchUsers = useCallback(async () => {
    setIsFetching(true);
    if (visiblePages >= current_page) {
      const {
        users,
        last_page,
        next_url: new_next_url,
        current_page,
      } = await fetchUsers(next_url);
      handleAddPage(users, new_next_url, current_page);
      setLastPage(last_page);
      setIsFetching(false);
    } else {
      handleAddPage([]);
      setIsFetching(false);
    }
  }, [current_page, handleAddPage, next_url, visiblePages]);

  return (
    <section id="users-section" className={styles['users-section--container']}>
      <Typography type="heading">Working with GET request</Typography>
      <Users />
      {isFetching && <Preloader />}
      {!lastPage && <Button onClick={handleFetchUsers}>Show more</Button>}
    </section>
  );
};

export default UsersSection;
