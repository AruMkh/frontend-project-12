import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index';
import { actions as channelsActions } from '../slices/channelsSlice';

const ApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = useCallback(
    async (message) => {
      await socket.timeout(3000).emitWithAck('newMessage', message);
    },
    [socket],
  );

  const addChannel = useCallback(
    async (channel) => {
      const { data } = await socket.timeout(3000).emitWithAck('newChannel', channel);

      dispatch(channelsActions.addChannel(data));
      dispatch(channelsActions.switchChannel({ id: data.id }));
    },
    [socket, dispatch],
  );

  const removeChannel = useCallback(
    async (targetId) => {
      await socket.timeout(3000).emitWithAck('removeChannel', { id: targetId });
    },
    [socket],
  );

  const renameChannel = useCallback(
    async (updateChannelInfo) => {
      await socket.timeout(3000).emitWithAck('renameChannel', updateChannelInfo);
    },
    [socket],
  );

  const socketContext = useMemo(
    () => ({
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }),
    [
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    ],
  );

  return <SocketContext.Provider value={socketContext}>{children}</SocketContext.Provider>;
};

export default ApiProvider;
