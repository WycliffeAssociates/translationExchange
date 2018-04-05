
import { combineReducers } from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
import homeRecentProjects from './HomeRecentProjectsReducer';
import GeolocationReducer from './GeolocationReducer';
import UpdatePlaylistReducer from './UpdatePlaylistReducer';
import ChaptersContainerReducer from './ChaptersContainerReducer';
import DirectionReducer from './DirectionReducer';
import Projects from './ProjectsPageReducer';
import ChunkListContainerReducer from './ChunkListContainerReducer';
import SourceAudioReducer from './SourceAudioReducer';
import user from './UserReducer.js';
import comments from './CommentsReducer';
import kanbanPage from './KanbanPageReducer'


export default combineReducers({
  setAudioPlayerState: AudioPlayerReducer,
  homeRecentProjects: homeRecentProjects,
  updatePlaylist: UpdatePlaylistReducer,
  geolocation: GeolocationReducer,
  chaptersContainer: ChaptersContainerReducer,
  direction: DirectionReducer,
  chunkListContainer: ChunkListContainerReducer,
  sourceAudio: SourceAudioReducer,
  user,
  comments,
  kanbanPage,
  Projects
});
