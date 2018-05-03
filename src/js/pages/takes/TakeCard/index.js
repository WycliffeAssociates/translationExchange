import React from 'react';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import jdenticon from 'jdenticon';
import TakeCardTop from './Components/TakeCard';
import Comments from './Components/Comments';



export default class index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      pos: 0,
      width: 0,
      height: 0,
    };

    this.expandComments = this.expandComments.bind(this);

  }

  componentDidMount() {
    jdenticon.update('#user',this.props.loggedInUser? this.props.loggedInUser: 'no author info');
  }

  expandComments() {
    this.setState(prevState => ({ showComments: !prevState.showComments}));
  }

  render() {
    const {takesToDelete, id} = this.props;
    let onDeleteQueue = false;

    if (takesToDelete.includes(id)) {
      onDeleteQueue = true;
    }

    return  (
      <div>
        {
          onDeleteQueue? '':
            <Container>
              <TakeCardTop {...this.props} expandComments={this.expandComments} />

              {this.state.showComments? <Comments  {...this.props} /> : '' }
            </Container>

        }
      </div>
    );

  }

}

const fadeInAnimations =keyframes`${fadeIn}`;

const Container = styled.div`
background: white;
border-top: solid 0.04vw lightgray;
border-left: solid 0.04vw lightgray;
box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);
width: 15.5vw;
height: inherit;
border-radius: 0.8vw;
overflow: hidden;
border-bottom: none;
text-align: left;
margin-top: 1vw;
animation: ${fadeInAnimations} 1s ease-in;
transform: translateZ(0);

`;
