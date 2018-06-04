import React from 'react';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import jdenticon from 'jdenticon';
import TakeCardTop from './Components/TakeCard';
import Comments from './Components/CommentsContainer';



export default class index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      pos: 0,
      width: 0,
      height: 0,
      onDeleteQueue: false,
    };

    this.expandComments = this.expandComments.bind(this);

  }

  componentDidMount() {
    const {takesToDelete, id, owner_icon_hash} = this.props;
    if (takesToDelete.includes(id)) {
      this.setState({ onDeleteQueue: true});
    }
    jdenticon.update(`#user${owner_icon_hash}`,owner_icon_hash? owner_icon_hash: 'null user');
  }

  componentDidUpdate() {
    const {takesToDelete, id,updateTake, removedTaketoDelete,owner_icon_hash} = this.props;
    const {onDeleteQueue} = this.state;
    if (takesToDelete.includes(id) && onDeleteQueue === false ) {
      this.setState({ onDeleteQueue: true});
    }
    if (!takesToDelete.includes(id) && onDeleteQueue === true) {
      this.setState({onDeleteQueue: false});
    }

    if (removedTaketoDelete) {
      updateTake();
    }
    jdenticon.update(`#user${owner_icon_hash}`,owner_icon_hash? owner_icon_hash: 'null user');

  }

  expandComments() {
    this.setState(prevState => ({ showComments: !prevState.showComments}));
  }

  render() {
    const {onDeleteQueue} = this.state;
    return  (
      <div>
        {
          onDeleteQueue? <TakeCardTop {...this.props} onDeleteQueue={onDeleteQueue} />:
            <Container>
              <TakeCardTop {...this.props} expandComments={this.expandComments} onDeleteQueue = {onDeleteQueue} />

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
