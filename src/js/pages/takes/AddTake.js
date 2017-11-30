import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

class ButtonToggle extends Component {
	render() {
		return (
			<Button
				circular
				basic
				icon
				color="black"
				toggle
				active={this.props.active}
				onClick={this.props.onClick}
			>
				<Icon name="play" size="big" color="blue" />
			</Button>
		);
	}
}

export default ButtonToggle;
