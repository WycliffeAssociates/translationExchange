import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";
import config from "config/config";
import { Grid, Segment } from "semantic-ui-react";
import TakeListenButton from "./AddTake";
import "css/takes.css";
import StitchTakesButton from "./StitchTakesButton";
import TakeCommentsButton from "./components/comments/TakeCommentsButton";
import { addToPlaylist, playTake, multipleTakes, clearPlaylist, removeTakeFromPlaylist, stopAudio, updateTime, playAudio } from './../../actions';

class Take extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true,
			addButtonIcon: "plus",
			showMarkers: false,
			showMarkersColor: "",
			playlist: [],
			clear: true

		};
		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
		// this.showMarker = this.showMarker.bind(this);
	}

	handleClick() {
		this.setState({ isToggleOn: !this.state.isToggleOn });
	}

	moveLeft() {
		if (this.props.take.published) {
			this.props.onMarkedForExportToggled();
		} else if (this.props.take.rating > 1) {
			this.props.onRatingSet(this.props.take.rating - 1);
		}
	}

	moveRight() {
		if (this.props.take.rating >= 3) {
			this.props.onMarkedForExportToggled();
		} else if (this.props.take.rating < 1) {
			this.props.onRatingSet(2);
		} else {
			this.props.onRatingSet(this.props.take.rating + 1);
		}
	}

	getTakeInfo() {
		const takeLoc = this.props.take.location;
		debugger;
		const takeNum = this.props.count;
		const startv = this.props.chunkNumber;
		const date = this.parseDate(this.props.take.date_modified);
		const markers = this.props.take.markers;

		let take = {
			src: config.streamingUrl + takeLoc,
			markers: markers,
			name: `${this.props.displayText.take} ${takeNum}, ${this.props.displayText.chunk} ${startv}  ( 'author' ${this.props.displayText.on} ${date})`,  // in case of other mode like chunk mode or verse mode verify this
			id: takeLoc,
			chunk: `${this.props.displayText.chunk} ${startv}`          // in case of a different mode like segment or verse here is assumed that only chunks will be used
		};
		console.log(config.streamingUrl + takeLoc);
		return take;
	}

	playTakeFromCard() {

		if (!this.props.playlistMode) {                           // checks if it is on playlist mode, so when is true it does not play audio from the card
			this.props.stopAudio();
			const take = this.getTakeInfo();
			this.props.playTake(take);

		}

	}

	removeFromPlaylist() {
		const takeLocation = this.props.take.location;

		this.props.playlist.map((i, index) => {         // loop inside the object to find an unique identifier in order to get the index of the object to proceed and delete it
			if (i.id === takeLocation) {
				this.props.stopAudio();       // solve bug of removing the take playing,
				this.props.removeTakeFromPlaylist(index);
				//this.props.playAudio();
			}
		})

	}


	addToPlaylist() {
		const take = this.getTakeInfo();

		if (!this.props.playlistMode) {                        // the first time called the function playlist mode is false so we clear the playlist info from the single take mode
			this.props.clearPlaylist();
		}

		if (this.state.addButtonIcon !== "plus") {
			this.setState({ addButtonIcon: "plus" });
			this.removeFromPlaylist();

			if (this.props.playlist.length < 1) {
				this.props.multipleTakes(false);
				this.props.playTake(take);          // add the last take played to the playlist
			}

		}
		else {
			this.props.stopAudio();
			this.setState({ addButtonIcon: "minus", clear: false });
			this.props.addToPlaylist(take);
			this.props.multipleTakes(true);         //used to check if there is a playlist so at the end of each take the audio keeps playing until
			// it reaches the last one

			if (this.props.playlist.length > 1) {   // conditional to do not play the take when it is added the first time to the playlist
				// this.props.playAudio();
			}



		}

	}


	render() {

		var file = [];
		file[0] = {

			src: config.streamingUrl + this.props.take.location
		};

		//console.log(this.props);

		return (
			<Segment>
				<Grid textAlign="left">
					<Grid.Row>
						<Grid.Column width={12}>
							<Grid.Row verticalAlign="top">
								<Grid>
									<Grid.Column width={11} floated="left">
										<font size="3">
											<strong>
												{this.props.displayText.take} {this.props.count} -{" "}
											</strong>
										</font>
										<font size="2" color="grey">
											{this.props.author
												? this.props.author.name
												: "Unknown Author"}
										</font>
									</Grid.Column>
									<Grid.Column floated="right">
										<StitchTakesButton
											onClick={() => this.addToPlaylist()}
											icon={this.state.addButtonIcon}
										/>
									</Grid.Column>
								</Grid>
							</Grid.Row>

							<Grid.Row>
								{this.parseDate(this.props.take.date_modified)}
							</Grid.Row>
							<Grid.Row className="centerPlayButton">
								<br />
								<TakeListenButton
									onClick={() => { this.playTakeFromCard(); }

									}
								/>
							</Grid.Row>
							<Grid.Row verticalAlign="bottom">
								<br />
								<TakeCommentsButton
									take={this.props.take}
									comments={this.props.comments}
									onClickSave={this.props.onClickSave}
									deleteComment={this.props.deleteComment}
									loadingActive={this.props.active}
									count={this.props.count}
									chunkNumber={this.props.chunkNumber}
								/>
							</Grid.Row>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		);
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

Take.propTypes = {
	count: PropTypes.number.isRequired,
	take: PropTypes.object.isRequired,
	author: PropTypes.string.isRequired,
	onRatingSet: PropTypes.func.isRequired,
	onMarkedForExportToggled: PropTypes.func.isRequired,
	takeId: PropTypes.number.isRequired
};


const mapStateToProps = state => {



	const { mode, playlist, playlistMode } = state.updatePlaylist;
	const { displayText } = state.geolocation;

	return { mode, playlistMode, playlist, displayText };

}

const mapDispatchToProps = dispatch => {

	return bindActionCreators({
		addToPlaylist,
		playTake,
		multipleTakes,
		clearPlaylist,
		removeTakeFromPlaylist,
		stopAudio,
		updateTime,
		playAudio
	}, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(Take);
