import { useCallback, useMemo } from 'react';
import { SocketContext } from './index';

const ApiProvider = ({ socket, children }) => {
  const sendMessage = useCallback(
    async (message) => {
      await socket.timeout(3000).emitWithAck('newMessage', message);
    },
    [socket],
  );

  const addChannel = useCallback(
    async (channel) => {
      const { data } = await socket.timeout(3000).emitWithAck('newChannel', channel);

      return data;
    },
    [socket],
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
