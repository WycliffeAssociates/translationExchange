import React, { Component } from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import "css/home.css";
import StartHere from "./StartHere";
import LogoTitle from "./LogoTitle";
import axios from "axios";
import config from "config/config";
import QueryString from "query-string";
import { connect } from "react-redux";
import { fetchRecentProjects } from "../../actions/home-recent-projects-actions";
class Home extends Component {

	constructor() {
		super();
		this.state = {
			projects: []
		};
	}
	componentDidMount() {
		this.getRecentProjects();
		this.props.dispatch(fetchRecentProjects());
	}
	getRecentProjects() {
		axios
			.post(config.apiUrl + "all_projects/", {})
			.then(results => {
				this.setState({ projects: results.data });
				this.limitProjects();
			})
			.catch(exception => {
				this.setState({ error: exception });
			});
	}

	//limits the number of projects to show
	limitProjects() {
		if (this.state.projects.length > 4) {
			this.setState({
				projects: this.state.projects.splice(0, 5)
			});
		}
	}

	navigateToProject(language, book, version) {
		//make the query for the right project, using our current query as a base
		var projectQuery = QueryString.parse(this.state.currentProjectQuery);
		Object.assign(projectQuery, {
			language: language,
			book: book,
			version: version
		});

		var queryString = QueryString.stringify(projectQuery);
		this.props.history.push({
			pathname: "/chapters",
			search: "?" + queryString
		});
	}
	render() {
		return (
			<Container fluid className="background">
				<Container fluid>
					<LogoTitle />
					<StartHere />
				</Container>
				<Container fluid>
					<Grid padded textAlign="center">
						<Grid.Column width={3}>
							<Grid.Row height={1}>
								<h2>
									<font color="white">Recent Projects</font>
								</h2>
							</Grid.Row>
							<Divider />
							{this.state.projects.map(this.createListItem.bind(this))}
						</Grid.Column>
					</Grid>
				</Container>
			</Container>
		);
	}

	createListItem(projects) {
		var navigateToProject = function() {
			this.navigateToProject(
				projects.language.slug,
				projects.book.slug,
				projects.version
			);
		}.bind(this);

		var str = "";
		str += projects.book.name + " ";
		str += projects.language.name + " ";
		str += projects.version;

		return (
			<div>
				<Grid.Row divided onClick={navigateToProject} className="hoverButton">
					<h4>
						<font color="white">{str}</font>
					</h4>
				</Grid.Row>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		homeRecentProjects: state.props
	};
}
export default connect(mapStateToProps)(Home);

