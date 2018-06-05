import { UPDATE_DIRECTION } from '../reduxConstants';

const INITIAL_STATE = {
  direction: 'ltr'};

export default (state = INITIAL_STATE, action ={}) => {

  switch (action.type) {
    case UPDATE_DIRECTION:
      return {
        ...state,
        direction: action.updateDirection,
      };

    default:
      return state;
  }
};
