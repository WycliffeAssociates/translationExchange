/*eslint indent:["error", "tab", {SwitchCase: 1}] */
import React, { Component } from 'react';
import QueryString from 'query-string';
import ProjectsList from './components/ProjectsList';
import { connect } from 'react-redux';
import '../../../css/projects.css';
import ProjectFilter from './ProjectFilter';
import NotFound from '../NotFound';
import ErrorButton from '../../../js/components/ErrorButton';
import LoadingGif from '../../../js/components/LoadingGif';
import { bindActionCreators } from 'redux';
import { fetchAllProjects, dispatchAllProjectsReset } from '../../actions';

class ProjectsListContainer extends Component {

	componentWillMount() {
		/*
		get projects if query string is blank
		 */


		if (this.props.location.search) {
			this.requestProjects(this.props.location.search);
		}
	}

	requestProjects(queryString) {
		debugger;
		this.props.fetchAllProjects(queryString);
	}

	//if the project query string has changed, request projects
	componentWillReceiveProps(nextProps) {
		if (!nextProps.location.search) {

		} else if (this.props.currentProjectQuery !== nextProps.location.search) {
			this.requestProjects(nextProps.location.search);
		}
	}

	setQuery(newQueryElement) {
		//merge together the current query with the new query element
		var currentQuery = QueryString.parse(this.props.currentProjectQuery);
		Object.assign(currentQuery, newQueryElement);

		//now turn the query into a query string and navigate to it
		var queryString = QueryString.stringify(currentQuery);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: '?' + queryString
		});
	}

	clearQuery() {
		/*empty the current query and projects,
		and after the state has been set,
		 navigate to a URL without the query
		*/

		/***
		 * TODO: Look out for better implemention way
		**/
		if (this.props.location.search) {
			this.props.history.push({ pathname: this.props.location.pathname });
		} else {
			this.props.dispatchAllProjectsReset();
		}
	}

	navigateToProject(language, book, version, published, project_id) {
		//make the query for the right project, using our current query as a base
		var projectQuery = QueryString.parse(this.props.currentProjectQuery);
		Object.assign(projectQuery, {
			language: language.name,
			book: book.slug,
			version: version.slug,
			published,
			project_id
		});

		var queryString = QueryString.stringify(projectQuery);
		this.props.history.push({
			pathname: '/chapters',
			search: '?' + queryString
		});
	}

	render() {
		const { loaded, error, projects } = this.props;
		const chooseAprojectText = this.props.displayText.ChooseProj;

		//if a list of projects was loaded, but it was empty, there is some problem with the query URL
		const projectsLoadedButEmpty =
			loaded &&
			projects.length === 0 &&
			this.props.location.search;

		if (projectsLoadedButEmpty) {
			return <NotFound />;
		} else if (error) {
			return (<ErrorButton displayText={this.props.displayText} error={error} />);
		} else if (!loaded) {
			return (
				<LoadingGif displayText={this.props.displayText.loading} />
			);
		} else {
			return (
				<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '2%' }}>
					<h1 style={{ fontSize: 35 }} >{chooseAprojectText}</h1>
					<ProjectFilter
						projects={projects}
						setQuery={this.setQuery.bind(this)}
						queryString={this.props.location.search}
						clearQuery={this.clearQuery.bind(this)}
						selectLanguage={this.props.displayText.selectLanguage}
						selectBook={this.props.displayText.selectBook}
						selectVersion={this.props.displayText.selectVersion}
						clearButton={this.props.displayText.clearButton}
						direction={this.props.direction}
					/>
					{this.props.projects.length > 0
						?
						<div style={{ marginTop: 10 }}>
							<ProjectsList
								projects={projects}
								navigateToProject={this.navigateToProject.bind(this)}
								displayText={this.props.displayText}
								direction={this.props.direction}
							/>
						</div>
						: ''}
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	const { direction = 'ltr' } = state.direction || {};
	const { displayText = '' } = state.geolocation;
	const { loaded = false, projects = [], error = '', currentProjectQuery = '' } = state.Projects;
	return { displayText, direction, loaded, projects, error, currentProjectQuery };
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchAllProjects, dispatchAllProjectsReset
	}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer);
