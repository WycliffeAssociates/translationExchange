import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgressbar from "react-circular-progressbar";
import { Table, Icon } from "semantic-ui-react";
import "css/chapters.css";
import CheckingLevel from "./CheckingLevel";

class ChapterList extends Component {
	render() {
		return (
			<Table.Body>
				{this.props.chapters.map(this.createListItem.bind(this))}
			</Table.Body>
		);
	}

	createListItem(chapter) {
  
		return (
			<Table.Row onClick={() => this.props.navigateToChapter( chapter.number)}>
				<Table.Cell>
					{chapter.number}
				</Table.Cell>
				<Table.Cell>
					<CircularProgressbar
						strokeWidth="20"
						percentage={chapter.percent_complete}
					/>
				</Table.Cell>
				<Table.Cell className="dont-hide-overflow">
					{/*only allow checking level to be set if project is published*/}
					{this.props.projectIsPublish
						? <CheckingLevel
							num={chapter.checked_level}
							setCheckingLevel={this.props.setCheckingLevel}
							chapterId={chapter.id}
						/>
						: chapter.checked_level}
				</Table.Cell>
				<Table.Cell>
					{chapter.published
						? <Icon name="checkmark" color="green" />
						: <Icon name="remove" />}
				</Table.Cell>
				<Table.Cell>
					{"add contributor from backend"}
					{/* {this.getContributorText(chapter.contributors)} */}
				</Table.Cell>
				<Table.Cell>
					{this.props.version}
				</Table.Cell>
				<Table.Cell>
					{"Add date from chapter backend"}
					{/* {this.parseDate(chapter.date_modified)} */}
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
			default:
				break;
		}

		var hour = parseInt(time[0],10);
		if (hour / 12 > -1) {
			noon = "pm";
		}

		if (!(hour % 12 === 0)) {
			hour %= 12;
		}

		return (`${date[1]} ${date[2]}, ${date[0]} ${this.props.displayText.at} ${hour}:${time[1]}${noon}`);
	}
}

ChapterList.propTypes = {
	book: PropTypes.arrayOf(PropTypes.shape()),
	language: PropTypes.arrayOf(PropTypes.shape()),
	version: PropTypes.arrayOf(PropTypes.shape()),
	chapters: PropTypes.arrayOf(
		PropTypes.shape({
			number: PropTypes.number.isRequired,
			percentFinished: PropTypes.number.isRequired,
			checkingLevel: PropTypes.number.isRequired,
			timestamp: PropTypes.string.isRequired
		})
	).isRequired,
	path: PropTypes.string.isRequired
};

export default ChapterList;
