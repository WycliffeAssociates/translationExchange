import React from 'react';
import styled from 'styled-components';

export default class GotoProjectButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {history, txt} = this.props;

    const url = '/chapters?projectId=' + this.props.task.details.project_id +
      '&bookName=' + this.props.task.details.book_name +
      '&mode=' + this.props.task.details.mode;

    return (

      <Button onClick={()=> history.push(url)}>
        <span style={{verticalAlign: 'middle'}}>{txt.get("select")}</span>
        <i style={{verticalAlign: 'middle', marginLeft: '0.4vw'}} className="material-icons">touch_app</i>
      </Button>

    );
  }

}

const Button = styled.div`
  cursor: pointer;
  width: 20vw;
  height: 2.5vw;
  background: #00c43d;
  border-radius: 0.3vw;
  color: white;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.2vw 0.2vw 0.5vw #888888;
`;
Button.displayName = 'Button';
