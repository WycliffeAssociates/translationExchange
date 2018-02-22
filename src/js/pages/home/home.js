import React, { Component } from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import "css/home.css";
import StartHere from "./StartHere";
import LogoTitle from "./LogoTitle";
import QueryString from "query-string";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchRecentProjects, initSocket } from "../../actions";

class Home extends Component {

	componentDidMount() {
		this.props.fetchRecentProjects();

		 this.props.initSocket('ws://te.loc:8001/websocket/');

	}

	navigateToProject(language, book, version, published, project_id) {
		//make the query for the right project, using our current query as a base
		var projectQuery = QueryString.parse(this.props.homeRecentProjects);
		Object.assign(projectQuery, {
			lang: language,
			book: book,
			version: version,
			published,
			project_id
		});

		var queryString = QueryString.stringify(projectQuery);
		this.props.history.push({
			pathname: "/chapters",
			search: "?" + queryString
		});
	}
	render() {
		const { homeRecentProjects } = this.props;
		const recentProjects = this.props.displayText.recentProjects;
		const title = this.props.displayText.mainPage;
		const btnText = this.props.displayText.startHere;
		return (
			<Container fluid className="background">
				<Container fluid>
					<LogoTitle titleText={title} />
					<StartHere text={btnText} />
				</Container>

				{homeRecentProjects&&homeRecentProjects.length > 0 ? (
					<Container fluid>
						<Grid padded textAlign="center">
							<Grid.Column width={3}>
								<Grid.Row height={1}>
									<h2>
										<font color="white">{recentProjects}</font>
									</h2>
								</Grid.Row>
								<Divider />
								{homeRecentProjects.splice(0,4).map((project, i) => {
									return this.createListItem(project, i);
								})}
							</Grid.Column>
						</Grid>
					</Container>
				) : (
						""
					)}
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
							project.version.slug,
							project.published,
							project.id
						)}
				>
					<h4>
						<font color="white">
							{project.book.name + " "}
							{project.language.name + " "}
							{project.version.slug}
						</font>
					</h4>
				</Grid.Row>
			</div>
		);
	}
}

const mapStateToProps = state => {

	const { displayText } = state.geolocation;
	const { homeRecentProjects } = state.homeRecentProjects;

	return { displayText, homeRecentProjects };

};


const mapDispatchToProps = dispatch => {

	return bindActionCreators({
		fetchRecentProjects,
		initSocket

	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
