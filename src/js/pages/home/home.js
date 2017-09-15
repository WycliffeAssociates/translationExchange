import React, { Component } from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import "css/home.css";
import StartHere from "./StartHere";
import LogoTitle from "./LogoTitle";
import axios from "axios";
import config from "config/config";
import QueryString from "query-string";
import { connect } from "react-redux";
import { fetchRecentProjects } from "../../actions/HomeRecentProjectAction";
class Home extends Component {
	componentDidMount() {
		this.props.dispatch(fetchRecentProjects());
	}

	navigateToProject(language, book, version) {
		//make the query for the right project, using our current query as a base
		var projectQuery = QueryString.parse(this.props.homeRecentProjects);

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
		const { homeRecentProjects } = this.props;
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
							{homeRecentProjects.map((project, i) => {
								return this.createListItem(project, i);
							})}
						</Grid.Column>
					</Grid>
				</Container>
			</Container>
		);
	}

	createListItem(project, key) {
		return (
			<div>
				<Grid.Row
					divided
					className="hoverButton"
					key={key}
					onClick={() =>
						this.navigateToProject(
							project.language.slug,
							project.book.slug,
							project.version
						)}
				>
					<h4>
						<font color="white">
							{project.book.name + " "}
							{project.language.name + " "}
							{project.version}
						</font>
					</h4>
				</Grid.Row>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		homeRecentProjects: state.homeRecentProjects
	};
}
export default connect(mapStateToProps)(Home);
