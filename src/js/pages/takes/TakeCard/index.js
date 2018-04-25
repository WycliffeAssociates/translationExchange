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

    return  (
      <div>

        <Container>
          <TakeCardTop {...this.props} expandComments={this.expandComments} />

          {this.state.showComments? <Comments  {...this.props} /> : '' }
        </Container>

      </div>
    );

  }

}

function getStyles(props) {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
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

//
// const takeSource = {
//   beginDrag(props, monitor, component) {
//
//     return { index: props.id, rating: props.rating, take: props, active: props.active, publishedTake: props.publishedTake };
//   },
//   endDrag(props, monitor) {
//     const item = monitor.getItem();
//     const dropResult = monitor.getDropResult();
//     if (dropResult && dropResult.listId !== item.rating) {
//
//       if (dropResult.listId == 4) {
//         if (item.take.published == false && props.publishedTake == true) {
//           notify.show('🚫 You can only have ONE published take, Unpublish first 🚫 ', 'warning', 5000);
//         }
//
//         else {
//           props.makeChanges(
//             item.take.published,
//             dropResult.listId,
//             item.take
//           );
//         }
//       }
//
//       else {
//         props.makeChanges(
//           item.take.published,
//           dropResult.listId,
//           item.take
//         );
//       }
//     }
//
//     else if (dropResult && dropResult.listId == 3 && item.rating == 3) {
//
//       props.makeChanges(
//         item.take.published,
//         dropResult.listId,
//         item.take
//       );
//     }
//
//   },
//
// };
//
//
// export default
// DragSource('TakeCard', takeSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
//   connectDragPreview: connect.dragPreview(),
// }))(TakeCard);
