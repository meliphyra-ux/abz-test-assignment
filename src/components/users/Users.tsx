import { User } from '../../lib/apiFunctions';
import UserCard from '../user-card/UserCard';

import styles from './users.module.scss';

const Users = ({ users }: { users: User[] }) => {
  const UsersCards = users.map((user) => (
    <UserCard key={user.id} user={user} />
  ));

  return <div className={styles.users}>{UsersCards}</div>;
};

export default Users;
