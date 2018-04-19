import React from 'react';
import styled from 'styled-components';

export default class DrageHereBox extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <DragBoxContainer>

        <div>
          <center>
            <label style={{display: 'block'}}> <i className = "fa fa-bars" /> </label>
            <br />
            <label style={{display: 'block'}}> {this.props.txt.dragHere} </label>
          </center>
        </div>

      </DragBoxContainer>
    );
  }

}




const DragBoxContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 13vw;
	border: dashed 1.6px white;
	width: 15vw;
	color: white;
	margin-top: 1vw;
	font-size: 1.1vw;
	`;
