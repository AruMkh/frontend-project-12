import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

import Message from './ChatMessage';
import MessageForm from './ChatMessageForm';

import { useFilter, useAuth } from '../hooks';

const MessagesBox = ({ channel, messages }) => {
  const { t } = useTranslation();
  const messagesRef = useRef(null);
  const filterProfanity = useFilter();
  const { currentUser } = useAuth();

  const channelName = filterProfanity(channel.name);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channelName}
            </b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: messages.length })}
          </span>
        </div>

        <div ref={messagesRef} className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <Message key={message.id} message={message} currentUser={currentUser} />
          ))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default MessagesBox;
