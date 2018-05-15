import React from 'react';
import styled from 'styled-components';

export default class GotoProjectsButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {history, txt}= this.props;

    return (

      <Button onClick={()=> history.push('/projects')}>
        <span style={{verticalAlign: "middle"}}>{txt.goToProjects}</span>
        <i style={{verticalAlign: "middle", marginLeft: "0.4vw"}} className="material-icons">book</i>
      </Button>

    );
  }

}

const Button = styled.div`
  cursor: pointer;
  width: 20vw;
  height: 2.5vw;
  background: linear-gradient(#00b8ff, #2757ff);
  border-radius: 0.3vw;
  margin: 2vw auto;
  color: white;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.2vw 0.2vw 0.5vw #888888;
`;
Button.displayName = "Button";
