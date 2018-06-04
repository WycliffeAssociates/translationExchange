import React, {Component} from 'react';
import styled from 'styled-components';

export default class Toggler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewingComments: props.viewingComments,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewingComments !== this.state.viewingComments) {
      this.setState({viewingComments: nextProps.viewingComments});
    }
  }


  render() {
    const {viewingComments} = this.state;
    const {onClick} = this.props;
    return (
      <ToggleContainer onClick={onClick} viewingComments={viewingComments}>
        <Toggle viewingComments={viewingComments}>
          {viewingComments?
            <i className="material-icons">chrome_reader_mode</i>
            :
            <i className="material-icons">forum</i>
          }
        </Toggle>
      </ToggleContainer>
    );
  }

}

const ToggleContainer = styled.div`
position: fixed;
bottom: 10vh;
right: 2.5vw;
height: 75px;
width: 75px;
text-align:center;
background: ${props=> props.viewingComments? 'white'  :'linear-gradient(to top, #0076FF, #00C5FF);'}
border-radius: 37.5px;
box-shadow: 2px 4px 4px rgba(0,0,0,0.5);
cursor:pointer;
`;
ToggleContainer.displayName= 'ToggleContainer';

const Toggle = styled.button`
  color: ${props=> props.viewingComments? '#009CFF'  : 'white'}
  margin-top: 15px;
  i{
    vertical-align: middle;
    font-size: 40px;
}
background: none;
border: none;
cursor:pointer;

`;
