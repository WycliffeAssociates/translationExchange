import {combineReducers} from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
import homeRecentProjects from "./home-recent-projects-reducer";
import UpdatePlaylistReducer from './UpdatePlaylistReducer';

export default combineReducers({

  setAudioPlayerState: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects,
  updatePlaylist: UpdatePlaylistReducer

});
