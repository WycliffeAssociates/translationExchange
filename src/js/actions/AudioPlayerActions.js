import { UPDATE_AUDIOPLAYER} from './types';


export const updateAudioPlayer = ({props, value}) => {

  return{
     type: UPDATE_AUDIOPLAYER,
     payload: {props, value}

  };

};
