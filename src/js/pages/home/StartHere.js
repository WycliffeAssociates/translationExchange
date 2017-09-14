import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
class StartHere extends Component {
	render() {
		return (
			<div className="start-here">
				<Link to="/projects">
					<Button
						icon="right arrow"
						content="Start here"
						labelPosition="right"
					/>
				</Link>
			</div>
		);
	}
}
export default StartHere;
