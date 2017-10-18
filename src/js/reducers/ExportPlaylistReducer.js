import { UPDATE_EXPORT_PLAYLIST } from '../actions/types';

const INITIAL_STATE = { exportPlaylist: []
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case UPDATE_EXPORT_PLAYLIST:
          return {
            state,
            exportPlaylist: action.playlist
          };

       default:
               return state;

    }



}
