import { CONNECTING, OPENED, MESSAGED, ERROR, CLOSED} from './types';
import { NotificationManager} from 'react-notifications';


export const initSocket = (uri) => {

  return dispatch => {

    if (!('WebSocket' in window)) {
        dispatch(error('WebSocket is not supported by your browser'));
        return;
    }
    const socket = new WebSocket(uri);
    dispatch(connect());

    socket.onopen = () => dispatch(open(socket));
    socket.onerror = () => dispatch(error(true));
    socket.onmessage = evt => {
     dispatch(message(evt.data));


   };

    socket.onclose = () => dispatch(close());
  }
};


export const connect = () => {
  return {
    type: CONNECTING
  }
};

export const open = (instance) => {
  return {
    type: OPENED,
    instance
  }
};


export const message = (message) => {
  NotificationManager.info(message, 'Success!');
  return{
     type: MESSAGED,
     message
  }

};

export const error = (error) => {

  return{
     type: ERROR,
     error
  }

};

export const close = () => {

  return{
     type: CLOSED
  }

};
