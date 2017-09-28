import React, { Component } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { Menu, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "css/home.css";
import user from "images/user.png";
import dots from "images/dots.png";
import nn from 'nearest-neighbor';
import countries from '../../languages/countries.json';
import languageAndCountry from '../../languages/languageAndCountry.json'

import {updateLanguage} from '../actions';

class Header extends Component {
	state = { activeItem: "home" };

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	};

	componentWillMount(){
		if (window.navigator.geolocation) {
				navigator.geolocation.getCurrentPosition( position =>{
					// Get the coordinates of the current position.

				 const lat = position.coords.latitude;
				 const lng = position.coords.longitude;
				 let country=''

				 const evaluate = {
				 "latitude": lat,
				 "longitude": lng }

				 const fields = [
					 {name: "latitude", measure: nn.comparisonMethods.number, max: 100 },
					 {name: "longitude", measure: nn.comparisonMethods.number, max: 100 }

				 ];

				 nn.findMostSimilar(evaluate, countries, fields, function(nearestNeighbor, probability) {
						// console.log(evaluate);
						// console.log(nearestNeighbor);
						// console.log(probability);
						country = nearestNeighbor.country;
						 //console.log(country);
					});



							for (const key in languageAndCountry) {
								 const lang = languageAndCountry[key];

								 for (const eachCountry in lang) {


											 if(lang[eachCountry] === country){

												const country = key ;

												 this.props.updateLanguage(key);


												}
											 }

							}


				});

	}
	else {
	 // geolocation is not supported
	}

	}


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

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
          updateLanguage

}, dispatch);

};


export default connect (mapStateToProps, mapDispatchToProps) (Header);
