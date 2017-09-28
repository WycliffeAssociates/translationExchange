import {DISPLAY_DIRECTION } from './types';


export const displayDirection = (display) => {
  return {
    type: DISPLAY_DIRECTION,
    display
  }
};
