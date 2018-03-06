/* eslint indent:["error", "tab"]*/
import React, { Component } from 'react';
import trap from 'images/trap.svg';
import logo from 'images/logo.png';
import { Image } from 'semantic-ui-react';
class LogoTitle extends Component {
	render() {
		return (
			<div>
				<Image fluid src={trap} />
				<div className="pageTitle">
					<font size="50">{this.props.titleText} </font>
				</div>

				<div className="logo">
					<Image src={logo} height="300vw" width="300vw"  />
				</div>
			</div>
		);
	}
}

export default LogoTitle;
