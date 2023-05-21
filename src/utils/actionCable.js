import { createConsumer } from '@rails/actioncable';

export const establishConnection = () => {
  const url = process.env.REACT_APP_WEBSOCKET_URL;
  const token = localStorage.getItem('token');
  const cable = createConsumer(`${url}?token=${token}`);
  return cable;
};
