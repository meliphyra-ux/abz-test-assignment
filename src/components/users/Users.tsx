import { useContext } from 'react';

import UserCard from '../user-card/UserCard';

import styles from './users.module.scss';
import { UserContext } from '../../contexts/user/UserContext';

const Users = () => {
  const { users, visiblePages } = useContext(UserContext);
  const UsersCards = users.slice(0, visiblePages * 6).map((user) => (
    <UserCard key={user.id} user={user} />
  ));

  return <div className={styles['users--container']}>{UsersCards}</div>;
};

export default Users;
