import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Header, Table } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import DownloadProjects from "./components/DownloadProjects";
import axios from "axios";
import config from "config/config";
import QueryString from "query-string";
import LoadingTinyGif from "images/loading-tiny.gif";
import "css/chapters.css";
import PublishButton from "./components/PublishButton";
import DownloadTR from "./components/DownloadTR";
import NotFound from "js/pages/NotFound";
import ErrorButton from '../../components/ErrorBytton';
import LoadingGif from '../../components/LoadingGif';
import { bindActionCreators } from 'redux';
import { fetchChaptersContainerData,setCheckingLevel } from '../../actions';

class ChaptersContainer extends Component {
	constructor() {
		super();
		this.state = {
			filesData: null,
			publishError: "",
			downloadError: "",
			downloadSuccess: "",
			anthology: {},
			downloadLoading: false,
		};
	}

	publishFiles() {
		let chapterID = this.props.project_id;
		let parameters = {
			is_publish: true
		};

		axios
			.patch(config.apiUrl + "projects/" + chapterID + "/", parameters)
			.then(response => {
				this.setState({ is_publish: true });
			})
			.catch(exception => {
				// TODO: modify for the error that occurs if the patch fails
				this.setState({ publishError: exception });
			});
	}

	setCheckingLevel(chapterId, level) {
		this.props.setCheckingLevel(chapterId,level);
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
		this.setState({
			downloadLoading: true,
			downloadError: "",
			downloadSuccess: ""
		});

		let params = {
			project: this.state.project_id
		};
		axios
			.post(config.apiUrl + "zip_files/", params, { timeout: 0 })
			.then(download_results => {
				window.location = config.streamingUrl + download_results.data.location;
				this.setState({
					downloadLoading: false,
					downloadSuccess: "Success. Check your downloads folder"
				});
			})
			.catch(exception => {
				this.setState({ downloadError: exception });
			})
			.catch(error => {
				this.setState({ downloadLoading: false, downloadError: error });
			});
	}

	componentDidMount() {
		this.getChapterData();
	}

	render() {
		if (this.props.loaded && !this.props.chapters) {
			return <NotFound />;
		} else if (this.state.error) {
			return (<ErrorButton error={this.state.error} />);
		} else if (!this.props.loaded) {
			return (
				<LoadingGif />
			);
		} else {
			return (
				<div className="chapters">
					<Container fluid>
						<h1>
							{this.props.book.name} ({this.props.language.name})
								<DownloadTR
								chapters={this.props.chapters}
								isPublish={this.props.is_publish}
								onPublish={this.publishFiles.bind(this)}
								project_id={this.state.project_id}
							/>
							<PublishButton
								chapters={this.props.chapters}
								isPublish={this.props.is_publish}
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
								projectIsPublish={this.props.is_publish}
							/>
						</Table>

						<DownloadProjects
							onDownloadProject={this.onDownloadProject.bind(this)}
						/>

						{this.state.downloadLoading
							? <img
								src={LoadingTinyGif}
								alt="Loading..."
								width="16"
								height="16"
							/>
							: ""}
						{this.state.downloadError
							? this.props.displayText.errorTryAgain
							: ""}
						<br />
					</Container>
				</div>
			);
		}
	}
}


const mapStateToProps = state => {

	const { displayText } = state.geolocation;
	const { chapters, book,project_id,is_publish,
		language,loaded } = state.chaptersContainer;
	return {
		displayText, chapters, book,project_id,
		is_publish,language,loaded
	};

};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchChaptersContainerData,
		setCheckingLevel
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ChaptersContainer);
