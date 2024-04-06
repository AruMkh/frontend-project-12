import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary as ErrorBoundaryProvider } from '@rollbar/react';

import App from './components/App';
import AuthProvider from './contexts/AuthProvider';
import ApiProvider from './contexts/ApiProvider';
import FilterProvider from './contexts/FilterProvider';
import resources from './locales';
import store from './slices/store';
import rollbarConfig from './configs/rollbarConfig';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';

const init = async () => {
  const socket = io.connect();

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsActions.renameChannel({
      id: channel.id,
      changes: { name: channel.name },
    }));
  });

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundaryProvider>
        <StoreProvider store={store}>
          <ApiProvider socket={socket}>
            <AuthProvider>
              <FilterProvider>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </FilterProvider>
            </AuthProvider>
          </ApiProvider>
        </StoreProvider>
      </ErrorBoundaryProvider>
    </RollbarProvider>
  );
};

export default init;
