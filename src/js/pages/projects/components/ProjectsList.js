import React, { Component } from "react";
import { connect } from "react-redux";
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
			<div style ={{direction:`${this.props.direction}`}}>
			<Container fluid>
				<Table selectable fixed color="grey">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>{this.props.displayText.language}</Table.HeaderCell>
							<Table.HeaderCell>{this.props.displayText.book}</Table.HeaderCell>
							<Table.HeaderCell>{this.props.displayText.percentComplete}</Table.HeaderCell>
							<Table.HeaderCell>{this.props.displayText.more}</Table.HeaderCell>
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
	            project.version.slug
	            this.props.navigateToProject(
	                project.language,
	                project.book,
	                project.version,
	                project.published,
	                project.id

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
	                    <ReadMore lines={1} onShowMore={this.props.onChange} text={this.props.displayText.more}>

	                        <b>{this.props.displayText.dateModified}</b>: {this.parseDate(project.date_modified)} <br />
	                        <b>{this.props.displayText.translationType}</b>: {project.version.slug} <br />
	                        {/* {this.getContributorText(project.contributors)} */}
	                        <b>{this.props.displayText.contributors}</b>: {"Mr. Backend"}{" "}
	                        <br />
	                        <b>{this.props.displayText.published}</b>:
	                        {project.published
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
		var date = dateArr[0];

		var time = dateArr[1].split(".");
		time = time[0].split(":");
		date = date.split("-");
		switch (date[1]) {
			case "01":
				date[1] = this.props.displayText.month1;
				break;
			case "02":
				date[1] = this.props.displayText.month2;
				break;
			case "03":
				date[1] = this.props.displayText.month3;
				break;
			case "04":
				date[1] = this.props.displayText.month4;
				break;
			case "05":
				date[1] = this.props.displayText.month5;
				break;
			case "06":
				date[1] = this.props.displayText.month6;
				break;
			case "07":
				date[1] = this.props.displayText.month7;
				break;
			case "08":
				date[1] = this.props.displayText.month8;
				break;
			case "09":
				date[1] = this.props.displayText.month9;
				break;
			case "10":
				date[1] = this.props.displayText.month10;
				break;
			case "11":
				date[1] = this.props.displayText.month11;
				break;
			case "12":
				date[1] = this.props.displayText.month12;
				break;
		}

		var hour = parseInt(time[0]);
		if (hour / 12 > -1) {
			noon = "pm";
		}

		if (!(hour % 12 === 0)) {
			hour %= 12;
		}

		return (     `${date[1]} ${date[2]}, ${date[0]} ${this.props.displayText.at} ${hour}:${time[1]}${noon}`	);
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


const mapStateToProps = state => {

	const {direction} = state.direction;

const{ displayText } = state.geolocation;

return{displayText, direction};

};


export default connect (mapStateToProps) (ProjectsList);
