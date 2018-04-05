
import { combineReducers } from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
import homeRecentProjects from './HomeRecentProjectsReducer';
import GeolocationReducer from './GeolocationReducer';
import UpdatePlaylistReducer from './UpdatePlaylistReducer';
import ChaptersContainerReducer from './ChaptersContainerReducer';
import DirectionReducer from './DirectionReducer';
import ProjectsListContainerReducer from './ProjectsListContinerReducer';
import ChunkListContainerReducer from './ChunkListContainerReducer';
import SourceAudioReducer from './SourceAudioReducer';
import user from './UserReducer.js';
import comments from './CommentsReducer';
import kanbanPage from './KanbanPageReducer'
import taskProgress from './TaskProgressReducer';


export default combineReducers({
  setAudioPlayerState: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects,
  updatePlaylist: UpdatePlaylistReducer,
  geolocation: GeolocationReducer,
  chaptersContainer: ChaptersContainerReducer,
  direction: DirectionReducer,
  projectsListContainer: ProjectsListContainerReducer,
  chunkListContainer: ChunkListContainerReducer,
  sourceAudio: SourceAudioReducer,
  user,
  comments,
  kanbanPage,
  taskProgress,
});
