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

class ProjectContainer extends Component {
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

	publishFiles() {
		let chapterID = this.state.project_id;
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
		axios.patch(config.apiUrl + "chapters/" + chapterId + "/", {
			checked_level: level
		});
	}

	getChapterData() {
		var query = QueryString.parse(this.props.location.search);

		this.setState({ error: "" });
		axios
			.post(config.apiUrl + "get_chapters/", query)
			.then(results => {
				this.setState({
					chapters: results.data.chapters,
					book: results.data.book,
					project_id: results.data.project_id,
					is_publish: results.data.is_publish,
					language: results.data.language,
					loaded: true,
					version: results.data.version
				});
			})
			.catch(exception => {
				this.setState({ error: exception });
			});
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
		if (this.state.loaded && !this.state.chapters) {
			return <NotFound />;
		}else if(this.state.error){
			return(<ErrorButton error={this.state.error}/>);
		}else if(!this.state.loaded){
			return(
				<LoadingGif />
			);
		} else {
			return (
				<div className="chapters">
					<Container fluid>
							<h1>
								{this.state.book.name} ({this.state.language.name})
								<DownloadTR
									chapters={this.state.chapters}
									isPublish={this.state.is_publish}
									onPublish={this.publishFiles.bind(this)}
									project_id={this.state.project_id}
								/>
								<PublishButton
									chapters={this.state.chapters}
									isPublish={this.state.is_publish}
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
									chapters={this.state.chapters}
									version={
										QueryString.parse(this.props.location.search).version
									}
									navigateToChapter={this.navigateToChapter.bind(this)}
									setCheckingLevel={this.setCheckingLevel.bind(this)}
									projectIsPublish={this.state.is_publish}
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

const{ displayText } = state.geolocation;

return{displayText};

};


export default connect (mapStateToProps) (ProjectContainer);
