import { UPDATE_DIRECTION} from '../reduxConstants';

export const updateDirection = (updateDirection) => {          // updates left to right direction for countries that read in that language

  return {
    type: UPDATE_DIRECTION,
    updateDirection,

  };
};
