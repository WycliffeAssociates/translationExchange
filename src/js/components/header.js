import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "css/home.css";
import user from "images/user.png";
import dots from "images/dots.png";

class Header extends Component {
	state = { activeItem: "home" };

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	};

	render() {
		var text = (
			<h1>
				<font color="#A8A8A8">Translation eXchange</font>
			</h1>
		);

		const { activeItem } = this.state;

		return (
			<div style={{ marginBottom: 10 }}>
				<Menu fluid secondary size="huge" compact>
					<Menu.Item position="left">
						<Link to="/">
							<Menu.Item>
								<Image src={dots} width="120" height="30" />
							</Menu.Item>
						</Link>
						<Link to="/">
							<Menu.Item content={text} />
						</Link>
					</Menu.Item>

					<Menu.Item position="right">
						<Link to="/">
							<Menu.Item
								position="right"
								name={this.props.language.home}
								active={activeItem === "Home"}
								onClick={this.handleItemClick}
							/>
						</Link>

						<Link to="/about">
							<Menu.Item
								name={this.props.language.about}
								active={activeItem === "About"}
								onClick={this.handleItemClick}
							/>
						</Link>

						<Link to="/projects">
							<Menu.Item
								name={this.props.language.projects}
								active={activeItem === "Projects"}
								onClick={this.handleItemClick}
							/>
						</Link>

						<Link to="/user">
							<Menu.Item>
								<Image src={user} size="mini" />
							</Menu.Item>
						</Link>
					</Menu.Item>
				</Menu>

				<Container className="redBar" fluid />
			</div>
		);
	}
}


const mapStateToProps = state => {

const{ language } = state.geolocation;

return{language};

};


export default connect (mapStateToProps) (Header);
