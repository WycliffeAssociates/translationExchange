import React from 'react';
import styled from 'styled-components';

export default class GotoProjectsButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    const {history, location}= this.props;

    return (
      
      <Button onClick={()=> history.push('/projects')}>
        <i style={{verticalAlign: "middle", marginRight: "0.4vw"}} className="material-icons">book</i>
        <span style={{verticalAlign: "middle"}}>Go to Projects</span>
      </Button>

    );
  }

}

const Button = styled.div`
  cursor: pointer;
  width: 15vw;
  height: 2.5vw;
  background: linear-gradient(#42a3fc, #58c5ff);
  border-radius: 1.5vw;
  margin: 2vw auto;
  color: white;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  text-decoration: underline;
  padding-top: 0.6vw;
`;
