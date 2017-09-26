import React, { Component } from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import nn from 'nearest-neighbor';
import "css/home.css";
import StartHere from "./StartHere";
import LogoTitle from "./LogoTitle";
import axios from "axios";
import config from "config/config";
import QueryString from "query-string";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {updateLanguage} from '../../actions';
import { fetchRecentProjects } from "../../actions/home-recent-projects-actions";
import countries from '../../../languages/countries.json';
import languageAndCountry from '../../../languages/languageAndCountry.json'


class Home extends Component {

	constructor() {
		super();
		this.state = {
			projects: []
		};
	}

	componentWillMount(){
		if (window.navigator.geolocation) {
				navigator.geolocation.getCurrentPosition( position =>{
					// Get the coordinates of the current position.

				 const lat = position.coords.latitude;
				 const lng = position.coords.longitude;
				 let country=''

				 const evaluate = {
				 "latitude": lat,
				 "longitude": lng }

				 const fields = [
					 {name: "latitude", measure: nn.comparisonMethods.number, max: 100 },
					 {name: "longitude", measure: nn.comparisonMethods.number, max: 100 }

				 ];

				 nn.findMostSimilar(evaluate, countries, fields, function(nearestNeighbor, probability) {
						// console.log(evaluate);
						// console.log(nearestNeighbor);
						// console.log(probability);
						country = nearestNeighbor.country;

					});



							for (const key in languageAndCountry) {
				         const lang = languageAndCountry[key];

								 for (const eachCountry in lang) {


									     if(lang[eachCountry] === country){

												const country = key ;

                        //  console.log(lang[eachCountry]);
                         this.props.updateLanguage(key);

												}
											 }

							}


				});

	}
	else {
	 // geolocation is not supported
	}

	}
	componentDidMount() {
		this.getRecentProjects();

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
		const recentProjects = this.props.language.recentProjects;
		const title = this.props.language.mainPage;
		const btnText = this.props.language.startHere;

		return (
			<Container fluid className="background">
				<Container fluid>
					<LogoTitle text = {title} />
					<StartHere text= {btnText} />
				</Container>
				<Container fluid>
					<Grid padded textAlign="center">
						<Grid.Column width={3}>
							<Grid.Row height={1}>
								<h2>
									<font color="white">{recentProjects}</font>
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


const mapStateToProps = state => {
// const{ play, updatedTime } = state.homeRecentProjects;
const{ language } = state.geolocation;

return{language};

};

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
          updateLanguage

}, dispatch);

};





export default connect(mapStateToProps,mapDispatchToProps)(Home);
