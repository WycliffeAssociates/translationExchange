import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";


const StartHere = ({text}) => (
					<div className="start-here">
						<Link to="/projects">
							<Button
								icon="right arrow"
								content={text}
								labelPosition="right"
							/>
						</Link>
					</div>

);

export default StartHere;
