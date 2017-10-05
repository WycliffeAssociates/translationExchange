import { combineReducers } from "redux";
import AudioPlayerReducer from "./AudioPlayerReducer";
import homeRecentProjects from "./HomeRecentProjectsReducer";
import UpdatePlaylistReducer from "./UpdatePlaylistReducer";
import publishFilesReducer from './PublishFilesReducer';
import ChapterDataReducer from './ChapterDataReducer';
import SetCheckingLevelReducer from './SetCheckingLevelReducer';
import DownloadProjectReducer from './DownloadProjectReducer';

export default combineReducers({
	setAudioPlayerState: AudioPlayerReducer,
	homeRecentProjects: homeRecentProjects,
	updatePlaylist: UpdatePlaylistReducer,
	publishFilesReducer: publishFilesReducer,
	chapterData: ChapterDataReducer,
	setCheckingLevel: SetCheckingLevelReducer,
	downloadProject: DownloadProjectReducer
});
