import React from 'react';
import styled from 'styled-components';

export default class DragHereBox extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <DragBoxContainer>

        <div>
          <center>
            <label style={{display: 'block'}}> <i className = "material-icons">menu</i> </label>
            <br />
            <label style={{display: 'block'}}> {this.props.txt.get("dragHere")} </label>
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

DragBoxContainer.displayName = 'DragBoxContainer';
