import { combineReducers } from "redux";
import AudioPlayerReducer from "./AudioPlayerReducer";
import homeRecentProjects from "./HomeRecentProjectsReducer";
import UpdatePlaylistReducer from "./UpdatePlaylistReducer";
import publishFilesReducer from './PublishFilesReducer';
import ChapterDataReducer from './ChapterDataReducer';
import SetCheckingLevelReducer from './SetCheckingLevelReducer';
export default combineReducers({
	setAudioPlayerState: AudioPlayerReducer,
	homeRecentProjects: homeRecentProjects,
	updatePlaylist: UpdatePlaylistReducer,
	publishFilesReducer: publishFilesReducer,
	chapterData: ChapterDataReducer,
	setCheckingLevel:SetCheckingLevelReducer
});
