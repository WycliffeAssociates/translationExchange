import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import DownloadProjects from "./components/DownloadProjects";
import QueryString from "query-string";
import LoadingTinyGif from "images/loading-tiny.gif";
import "css/chapters.css";
import PublishButton from "./components/PublishButton";
import DownloadSourceAudio from "./components/DownloadSourceAudio";
import NotFound from "js/pages/NotFound";
import ErrorButton from '../../components/ErrorButton';
import LoadingGif from '../../components/LoadingGif';
import { bindActionCreators } from 'redux';
import { fetchChaptersContainerData, setCheckingLevel, publishFiles, downloadProject, downloadSourceAudio } from '../../actions';

class ChaptersContainer extends Component {
	publishFiles() {
		this.props.publishFiles(this.props.project_id);
	}

	setCheckingLevel(chapterId, level) {
		this.props.setCheckingLevel(chapterId, level);
		var query = QueryString.parse(this.props.location.search);
		this.props.fetchChaptersContainerData(query);
	}

	getChapterData() {
		var query = QueryString.parse(this.props.location.search);
		this.props.fetchChaptersContainerData(query);
	}

	navigateToChapter(chNum) {
		var query = QueryString.parse(this.props.location.search);
		query.chapter = chNum;
		this.props.history.push({
			pathname: "/takes",
			search: QueryString.stringify(query)
		});
	}

	// Minimal parameters saves on server query time
	onDownloadProject() {
		this.props.downloadProject(this.props.project_id);
	}
	onDownloadSourceAudio() {
		this.props.downloadSourceAudio(this.props.project_id);
	}
	componentWillMount() {
		this.getChapterData();
	}

	render() {
		if (this.props.loaded && !this.props.chapters) {
			return <NotFound />;
		} else if (this.props.error) {
			return (<ErrorButton error={this.props.error} />);
		} else if (!this.props.loaded) {
			return (
				<LoadingGif />
			);
		} else {
			return (
				<div className="chapters" style={{ direction:`${this.props.direction}` }} >
					<Container fluid>
						<h1>
							{this.props.book.name} ({this.props.language.name})
								<DownloadSourceAudio
								published={this.props.published}
								downloadLoadingSourceAudio={this.props.downloadLoadingSourceAudio}
								onDownloadSourceAudio={this.onDownloadSourceAudio.bind(this)}
								displayText={this.props.displayText}
							/>
							<PublishButton
								chapters={this.props.chapters}
								published={this.props.published}
								displayText={this.props.displayText}
								onPublish={this.publishFiles.bind(this)}
							/>
						</h1>

						<Table selectable fixed color="grey">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>{this.props.displayText.chapter}</Table.HeaderCell>
									<Table.HeaderCell>{this.props.displayText.percentComplete}</Table.HeaderCell>
									<Table.HeaderCell>{this.props.displayText.checkLevel}</Table.HeaderCell>
									<Table.HeaderCell>{this.props.displayText.readyToPublish}</Table.HeaderCell>
									<Table.HeaderCell>{this.props.displayText.contributors}</Table.HeaderCell>
									<Table.HeaderCell>{this.props.displayText.translationType}</Table.HeaderCell>
									<Table.HeaderCell>{this.props.displayText.dateModified}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<ChapterList
								chapters={this.props.chapters}
								version={
									QueryString.parse(this.props.location.search).version
								}
								navigateToChapter={this.navigateToChapter.bind(this)}
								setCheckingLevel={this.setCheckingLevel.bind(this)}
								projectIsPublish={this.props.published}
								displayText={this.props.displayText}
							/>
						</Table>

						<DownloadProjects
							onDownloadProject={this.onDownloadProject.bind(this)}
							displayText={this.props.displayText}
						/>

						{this.props.downloadLoading &&
							<img
								src={LoadingTinyGif}
								alt="Loading..."
								width="16"
								height="16"
							/>
						}

						{this.props.downloadError
							? this.props.displayText.errorTryAgain
							: null
						}

						<br />
					</Container>
				</div>
			);
		}
	}
}


const mapStateToProps = state => {

const {direction} = state.direction;
	const { displayText } = state.geolocation;
	const { chapters, book, project_id, published,
		language, loaded, downloadLoading,
		downloadError, downloadSuccess, downloadLoadingSourceAudio,
		downloadErrorAudioSource } = state.chaptersContainer;
	return {
		displayText, chapters, book,
		project_id, published, language,
		loaded, downloadLoading,
		downloadError, downloadSuccess,
		downloadLoadingSourceAudio,
		downloadErrorAudioSource,
		direction
	};

};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchChaptersContainerData,
		setCheckingLevel, publishFiles
		, downloadProject, downloadSourceAudio
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ChaptersContainer);
