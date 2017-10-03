import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
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
import ErrorButton from "../../components/ErrorButton";
import LoadingGif from "../../components/LoadingGif";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { publishFiles, fetchChapterData,setCheckingLevel } from '../../actions';

class ChaptersContainer extends Component {
	constructor() {
		super();
		this.state = {
			chapters: [],
			book: {},
			language: {},
			project_id: -1,
			is_publish: false,
			filesData: null,
			loaded: false,
			error: "",
			publishError: "",
			downloadError: "",
			downloadSuccess: "",
			anthology: {},
			downloadLoading: false,
			version: {}
		};
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
	// onDownloadProject() {
	// 	this.setState({
	// 		downloadLoading: true,
	// 		downloadError: "",
	// 		downloadSuccess: ""
	// 	});

	// 	let params = {
	// 		project: project_id
	// 	};
	// 	axios
	// 		.post(config.apiUrl + "zip_files/", params, { timeout: 0 })
	// 		.then(download_results => {
	// 			window.location = config.streamingUrl + download_results.data.location;
	// 			this.setState({
	// 				downloadLoading: false,
	// 				downloadSuccess: "Success. Check your downloads folder"
	// 			});
	// 		})
	// 		.catch(exception => {
	// 			this.setState({ downloadError: exception });
	// 		})
	// 		.catch(error => {
	// 			this.setState({ downloadLoading: false, downloadError: error });
	// 		});
	// }

	componentDidMount() {
		let query = QueryString.parse(this.props.location.search);
		this.props.fetchChapterData(query);
	}

	render() {
		const { book, chapters, is_publish, language, loaded, project_id, error } = this.props.chapterData;
		if (loaded && !chapters) {
			return <NotFound />;
		} else if (error) {
			return <ErrorButton error={error} />;
		} else if (!loaded) {
			return <LoadingGif />;
		} else {
			return (
				<div className="chapters">
					<Container fluid>
						<h1>
							{book.name} ({language.name})
							<DownloadTR
								chapters={chapters}
								isPublish={is_publish}
								onPublish={this.props.publishFiles}
								project_id={project_id}
							/>
							<PublishButton
								chapters={chapters}
								isPublish={is_publish}
								onPublish={this.props.publishFiles(project_id)}
							/>
						</h1>

						<Table selectable fixed color="grey">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Chapter</Table.HeaderCell>
									<Table.HeaderCell>Percent Complete</Table.HeaderCell>
									<Table.HeaderCell>Checking Level</Table.HeaderCell>
									<Table.HeaderCell>Ready to Publish</Table.HeaderCell>
									<Table.HeaderCell>Contributors</Table.HeaderCell>
									<Table.HeaderCell>Translation Type</Table.HeaderCell>
									<Table.HeaderCell>Date Modified</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<ChapterList
								chapters={chapters}
								version={QueryString.parse(this.props.location.search).version}
								navigateToChapter={this.navigateToChapter.bind(this)}
								setCheckingLevel={this.props.setCheckingLevel}
								projectIsPublish={is_publish}
							/>
						</Table>

						<DownloadProjects
						//onDownloadProject={this.onDownloadProject.bind(this)}
						/>

						{false ? (
							<img
								src={LoadingTinyGif}
								alt="Loading..."
								width="16"
								height="16"
							/>
						) : (
								""
							)}
						{false
							? "There was an error. Please try again"
							: ""}
						<br />
					</Container>
				</div>
			);
		}
	}
}
const mapStateToProps = (state) => {
	return {
		chapterData: state.chapterData
	}
}
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({
		publishFiles,
		fetchChapterData,
		setCheckingLevel
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ChaptersContainer);
