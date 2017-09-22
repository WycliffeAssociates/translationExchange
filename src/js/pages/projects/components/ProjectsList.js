/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Table, Icon } from "semantic-ui-react";
import CircularProgressbar from "react-circular-progressbar";
import "../../../../css/projects.css";

import { ReadMore } from "react-read-more";

class ProjectsList extends Component {
	/*
        Render data in props, passed to this component by its parent container component
     */
	render() {
		return (
			<div>
			<Container fluid>
				<Table selectable fixed color="grey">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Language</Table.HeaderCell>
							<Table.HeaderCell>Book</Table.HeaderCell>
							<Table.HeaderCell>Percent Complete</Table.HeaderCell>
							<Table.HeaderCell>More</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{this.props.projects.map(this.createListItem.bind(this))}
					</Table.Body>
				</Table>
			</Container>

			</div>
		);
	}

	/*
        Here's an example of how to create a link using React Router
     */
	/*{project.percentFinished}*/
	createListItem(project) {
		var navigateToProject = function() {
			this.props.navigateToProject(
				project.language.slug,
				project.book.slug,
				project.version
			);
		}.bind(this);

		return (
			<Table.Row>
				<Table.Cell onClick={navigateToProject}>
					{project.language.name}
				</Table.Cell>
				<Table.Cell onClick={navigateToProject}>
					{project.book.name}
				</Table.Cell>
				<Table.Cell onClick={navigateToProject}>
					<CircularProgressbar
						strokeWidth="20"
						percentage={project.completed}
					/>
				</Table.Cell>
				<Table.Cell>
					<ReadMore lines={1} onShowMore={this.props.onChange} text="more">
						<b>Date Modified</b>: {this.parseDate(project.date_modified)} <br />
						<b>Translation Type</b>: {project.version} <br />
						<b>Contributors</b>: {this.getContributorText(
							project.contributors
						)}{" "}
						<br />
						<b>Published</b>:
						{project.is_publish
							? <Icon name="checkmark" color="green" />
							: <Icon name="remove" />}
					</ReadMore>
				</Table.Cell>
			</Table.Row>
		);
	}

	getContributorText(contributors) {
		let contribText = "";
		for (let i = 0; i < contributors.length - 1; i++) {
			contribText += contributors[i] + ", ";
		}
		contribText += contributors[contributors.length - 1];
		return contribText;
	}

	parseDate(date) {
		var noon = "am";
		var dateArr = date.split("T");
		date = dateArr[0];

		var time = dateArr[1].split(".");
		time = time[0].split(":");
		date = date.split("-");
		switch (date[1]) {
			case "01":
				date[1] = "January";
				break;
			case "02":
				date[1] = "February";
				break;
			case "03":
				date[1] = "March";
				break;
			case "04":
				date[1] = "April";
				break;
			case "05":
				date[1] = "May";
				break;
			case "06":
				date[1] = "June";
				break;
			case "07":
				date[1] = "July";
				break;
			case "08":
				date[1] = "August";
				break;
			case "09":
				date[1] = "September";
				break;
			case "10":
				date[1] = "October";
				break;
			case "11":
				date[1] = "November";
				break;
			case "12":
				date[1] = "December";
				break;
		}

		var hour = parseInt(time[0]);
		if (hour / 12 > -1) {
			noon = "pm";
		}

		if (!(hour % 12 === 0)) {
			hour %= 12;
		}

		return (
			date[1] +
			" " +
			date[2] +
			", " +
			date[0] +
			" at " +
			hour +
			":" +
			time[1] +
			noon
		);
	}
}
/*
    Use PropTypes to define what props this component expects. If it's passed the wrong props,
    you'll get warnings while you're in development mode
 */
ProjectsList.propTypes = {
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			book: PropTypes.string.isRequired,
			language: PropTypes.string.isRequired,
			translationType: PropTypes.string.isRequired,
			percentFinished: PropTypes.number.isRequired,
			contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
			dateModified: PropTypes.string.isRequired
		})
	).isRequired
};

export default ProjectsList;
