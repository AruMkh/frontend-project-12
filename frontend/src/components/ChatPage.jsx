import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';

import getModalComponent from './Modals';
import ChatBox from './ChatBox';
import fetchDataThunk from '../slices/thunks';
import { useAuth, useSocket } from '../hooks';
import { selectors as modalsSelectors } from '../slices/modalSlice';

const getAuthHeader = (currentUser) => {
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

const ChatPage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const modalType = useSelector(modalsSelectors.selectModalType);
  const { currentUser, logOut } = useAuth();
  const authHeaders = useMemo(() => ({ headers: getAuthHeader(currentUser) }), [currentUser]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchDataThunk(authHeaders));

      if (res.payload.errorCode === 401) {
        toast.error(t('errors.invalidFeedback'));
        logOut();
      }
    };

    fetchData();
  }, [dispatch, socket, t, authHeaders, logOut]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatBox />
      </Row>
      {getModalComponent(modalType)}
    </Container>
  );
};

export default ChatPage;
