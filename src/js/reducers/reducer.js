import {combineReducers} from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
 import homeRecentProjects from "./home-recent-projects-reducer";

export default combineReducers({

  audioPlayer: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects

});
