
import { combineReducers } from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
import homeRecentProjects from "./HomeRecentProjectsReducer";
import GeolocationReducer from './GeolocationReducer';
import UpdatePlaylistReducer from './UpdatePlaylistReducer';
import ChaptersContainerReducer from './ChaptersContainerReducer';
import DirectionReducer from './DirectionReducer';
import ProjectsListContainerReducer from './ProjectsListContinerReducer';

export default combineReducers({
  setAudioPlayerState: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects,
  updatePlaylist: UpdatePlaylistReducer,
  geolocation: GeolocationReducer,
  chaptersContainer: ChaptersContainerReducer,
  direction: DirectionReducer,
  projectsListContainer: ProjectsListContainerReducer
});
