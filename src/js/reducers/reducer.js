
import { combineReducers } from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
import homeRecentProjects from "./HomeRecentProjectsReducer";
import GeolocationReducer from './GeolocationReducer';
import UpdatePlaylistReducer from './UpdatePlaylistReducer';
<<<<<<< HEAD
import ChaptersContainerReducer from './ChaptersContainerReducer';
=======
import DirectionReducer from './DirectionReducer';



>>>>>>> 4bfa01de1385a861669889edff0105ef5e2e6639

export default combineReducers({
  setAudioPlayerState: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects,
  updatePlaylist: UpdatePlaylistReducer,
  geolocation: GeolocationReducer,
<<<<<<< HEAD
  chaptersContainer: ChaptersContainerReducer
=======
  direction: DirectionReducer



>>>>>>> 4bfa01de1385a861669889edff0105ef5e2e6639
});
