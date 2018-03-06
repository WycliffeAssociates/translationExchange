/* eslint indent:["error","tab"]*/
import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const StartHere = ({text}) => (
	<div className="start-here">
		<Link to="/projects">
			<Button
				style={{backgroundColor: '#14D159', color: 'white',
					padding: '1.5vw', fontSize: '20px',
					boxShadow: '3px 3px 3px rgba(0,0,0,0.6)'}}
				icon="right arrow"
				content={text}
				labelPosition="right"
			/>
		</Link>
	</div>

);

export default StartHere;
