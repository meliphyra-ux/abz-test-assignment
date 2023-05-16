import { User } from '../../lib/apiFunctions';
import Typography from '../typography/Typography';

import styles from './user-card.module.scss';

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className={styles['user-card']}>
      <img src={user.photo ?? '/images/photo-cover.svg'} alt={user.name} width={70} height={70} />
      <Typography type="body-text">{user.name}</Typography>
      <div className={styles['user-information']}>
        <Typography type="body-text">{user.position}</Typography>
        <Typography type="body-text">{user.email}</Typography>
        <Typography type="body-text">{user.phone}</Typography>
      </div>
    </div>
  );
};

export default UserCard;
