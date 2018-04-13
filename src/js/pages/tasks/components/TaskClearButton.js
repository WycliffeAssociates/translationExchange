import React from 'react';
import styled from 'styled-components';

export default class TaskClearButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    const {task} = this.props;

    return (
      
      <Button onClick={() => this.props.clearTask(task.id)}>
        <i style={{verticalAlign: "middle", marginRight: "0.4vw", fontSize: "1.5vw"}} className="material-icons">close</i>
        <span style={{verticalAlign: "middle"}}>Clear</span>
      </Button>

    );
  }

}

const Button = styled.div`
  cursor: pointer;
  width: 8vw;
  height: 2.5vw;
  background: white;
  border: 0.1vw solid #e74c3c;
  border-radius: 1.5vw;
  color: #e74c3c;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  text-decoration: underline;
  padding-top: 0.4vw;
  margin-top: 2vw;
`;
