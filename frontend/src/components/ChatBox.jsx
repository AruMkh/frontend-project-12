import { useSelector } from 'react-redux';

import ChannelsBox from './ChatChannelsBox';
import MessagesBox from './ChatMessagesBox';
import LoadingSpinner from './ChatLoadingSpinner';

import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';

const statuses = {
  loading: 'loading',
  loaded: 'loaded',
  loadError: 'loadError',
};

const ChatBox = () => {
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const currentMessages = useSelector(messagesSelectors.selectById);

  switch (loadingStatus) {
    case statuses.loaded:
      return (
        <>
          <ChannelsBox channels={channels} currentChannelId={currentChannel.id} />
          <MessagesBox channel={currentChannel} messages={currentMessages} />
        </>
      );

    default:
      return <LoadingSpinner />;
  }
};

export default ChatBox;
