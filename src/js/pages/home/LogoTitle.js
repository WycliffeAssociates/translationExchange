import React, { Component } from "react";
import trap from "images/trap.svg";
import logo from "images/logo.png";
import { Image } from "semantic-ui-react";
class LogoTitle extends Component {
	render() {
		return (
			<div>
				<Image fluid src={trap} />
				<div className="pageTitle">
					<font size="50">{this.props.text} </font>
				</div>

				<div className="logo">
					<Image src={logo} className="logoterra" />
				</div>
			</div>
		);
	}
}

export default LogoTitle;
