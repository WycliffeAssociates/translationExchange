import {combineReducers} from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
 import homeRecentProjects from "./home-recent-projects-reducer";

export default combineReducers({

  setAudioPlayerState: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects

});
