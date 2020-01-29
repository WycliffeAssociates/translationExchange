
import { combineReducers } from 'redux';
import AudioPlayerReducer from './AudioPlayerReducer';
import GeolocationReducer from './GeolocationReducer';
import DirectionReducer from './DirectionReducer';
import Projects from './ProjectsPageReducer';
import SourceAudioReducer from './SourceAudioReducer';
import user from './UserReducer.js';
import comments from './CommentsReducer';
import kanbanPage from './KanbanPageReducer'
import taskProgress from './TaskProgressReducer';
import Chapters from './ChapterPageReducer'
import ExportPage from './ExportPageReducer';
import ChapterReview from './ChapterReviewReducer';
import Downloads from './DownloadPageReducer';

export default combineReducers({
  setAudioPlayerState: AudioPlayerReducer,
  geolocation: GeolocationReducer,
  direction: DirectionReducer,
  sourceAudio: SourceAudioReducer,
  user,
  comments,
  kanbanPage,
  taskProgress,
  Projects,
  Chapters,
  ChapterReview,
  ExportPage,
  Downloads
});