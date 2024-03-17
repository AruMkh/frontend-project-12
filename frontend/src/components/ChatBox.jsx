import { useSelector } from 'react-redux';

import LoginPage from './LoginPage';
import ChannelsBox from './ChatChannelsBox';
import MessagesBox from './ChatMessagesBox';
import LoadingSpinner from './ChatLoadingSpinner';

const statuses = {
  loading: 'loading',
  loaded: 'loaded',
  loadError: 'loadError',
};

const ChatBox = () => {
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);

  switch (loadingStatus) {
    case statuses.loaded:
      return (
        <>
          <ChannelsBox />
          <MessagesBox />
        </>
      );

    case statuses.loadError:
      return <LoginPage />;

    case statuses.loading:
      return <LoadingSpinner />;

    default:
      return <LoginPage />;
  }
};

export default ChatBox;
