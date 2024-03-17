// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import { useFilter } from '../hooks';

const Message = ({ message, currentUser }) => {
  const filterProfanity = useFilter();
  const userNameClass = cn({
    'text-decoration-underline': message.user === currentUser.username,
  });

  return (
    <div className="text-break mb-2">
      <b className={userNameClass}>{message.user}</b>
      {': '}
      {filterProfanity(message.body)}
    </div>
  );
};

export default Message;
