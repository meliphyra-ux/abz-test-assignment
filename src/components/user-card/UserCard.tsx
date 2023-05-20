import { User } from '../../lib/apiFunctions';

import Tooltip from '../tooltip/Tooltip';
import Typography from '../typography/Typography';

import styles from './user-card.module.scss';

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className={styles['user-card--container']}>
      <img
        src={user.photo ?? '/images/photo-cover.svg'}
        alt={user.name}
        width={70}
        height={70}
      />
      <Tooltip text={user.name}>
        <Typography type="body-text">
          {user.name.length > 26 ? user.name.slice(0, 26) + '...' : user.name}
        </Typography>
      </Tooltip>
      <div className={styles['user-information']}>
        <Tooltip text={user.position}>
          <Typography type="body-text">{user.position}</Typography>
        </Tooltip>
        <Tooltip text={user.email}>
          <Typography type="body-text">
            {user.email.length > 26
              ? user.email.slice(0, 26) + '...'
              : user.email}
          </Typography>
        </Tooltip>
        <Tooltip text={user.phone}>
          <Typography type="body-text">{user.phone}</Typography>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserCard;
