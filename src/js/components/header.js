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
import languageAndCountry from '../../languages/languageAndCountry.json';
import rtlLanguages from  '../../languages/rtlLanguages.json'
import {updateLanguage, updateDirection} from '../actions';
import ItemPreview from '../pages/takes/components/ItemPreview';

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

												 this.props.updateLanguage(key);

												 for (const rtl in rtlLanguages){                 // checks if it is an RTL language

					                     if( rtlLanguages[rtl] === country){

					 											this.props.updateDirection('rtl');

					 										}

													}
													break;
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
        <ItemPreview key="__preview" name="TakeContainer" />
				<Menu fluid secondary size="huge" compact>
					<div style = {{display: 'flex', flex: 1, justifyContent: 'space-between', direction:`${this.props.direction}` }}>
					<Menu.Item>
						<Link to="/">
							<Menu.Item>
								<Image src={dots} width="120" height="30" />
							</Menu.Item>
						</Link>
						<Link to="/">
							<Menu.Item content={text} />
						</Link>
					</Menu.Item>

					<Menu.Item>
						<Link to="/">
							<Menu.Item
								position="right"
								name={this.props.displayText.home}
								active={activeItem === "Home"}
								onClick={this.handleItemClick}
							/>
						</Link>

						<Link to="/about">
							<Menu.Item
								name={this.props.displayText.about}
								active={activeItem === "About"}
								onClick={this.handleItemClick}
							/>
						</Link>

						<Link to="/projects">
							<Menu.Item
								name={this.props.displayText.projects}
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
					 </div>
				</Menu>

				<Container className="redBar" fluid />
			</div>
		);
	}
}


const mapStateToProps = state => {

const{ displayText } = state.geolocation;
const {direction} = state.direction;

return{displayText, direction};

};

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
          updateLanguage,
					updateDirection

}, dispatch);

};


export default connect (mapStateToProps, mapDispatchToProps) (Header);
