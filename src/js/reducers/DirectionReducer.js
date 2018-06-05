import { UPDATE_DIRECTION } from '../reduxConstants';

const INITIAL_STATE = {
  direction: 'ltr'};

export default (state = INITIAL_STATE, action ={}) => {

  if (action.type === UPDATE_DIRECTION) {
    return {
      ...state,
      direction: action.updateDirection,
    };
  }

  else  {
    return state;
  }

};
