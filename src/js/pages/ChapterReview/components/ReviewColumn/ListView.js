import React from 'react';
import styled from 'styled-components';

export default class ListView extends React.Component {

  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
  }

  renderList(array, active) {
    let placeHolderCount = 0;

    return (
      array.takes.length >1?
        array.takes.map((take) => {
          return (

            <ListItem active={active}>
              <TakeNum> Take {take.take_num}</TakeNum>

              <TouchTarget> <i className="material-icons">touch_app</i> </TouchTarget>

              <Rating>
                <label > <i className="material-icons">star_border</i> </label>
                <label> <i  className="material-icons">star_border</i> </label>
                <label> <i  className="material-icons">star_border</i> </label>
              </Rating>
            </ListItem>

          );
        })
        :
        <ListItem active={active}>
          <TakeNum> Take {array.takes[0].take_num}</TakeNum>

          <TouchTarget> <i className="material-icons">touch_app</i> </TouchTarget>

          <Rating>
            <label > <i className="material-icons">star_border</i> </label>
            <label> <i  className="material-icons">star_border</i> </label>
            <label> <i  className="material-icons">star_border</i> </label>
          </Rating>
        </ListItem>
    );

  }
  renderPlaceholder(length, active) {
    if (length<4) {
      let count = 4-length;
      let array = new Array(count);
      return array.map(() => {
        return  (
          <div>
            <ListItem active={active} style={{height: '7.5vh'}} />
          </div>
        );
      });
    }
  }


  render() {

    const {alternateTakes, index, chunkId, active} = this.props;
    return (
      <Container>
        {
          alternateTakes.map((array) => {
            if (array.chunkId === chunkId) {
              return this.renderList(array, active); //, this.renderPlaceholder(array.takes.length, active);
            }
          })
        }

      </Container>
    );
  }

}

const Container = styled.div`
  height: 30.5vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    color: white;
  }
`;

const ListItem = styled.div`
  height: 7.5vh;
  background: ${props => props.active? '#0D4E78' :'#1B2633'};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 2.5px;
  color: ${props => props.active? 'white' :'rgba(255,255,255,0.5)'};
  border-radius: 5px;

`;

const TakeNum = styled.label`
`;

const TouchTarget = styled.button`
  border: none;
  min-height: 40px;
  min-width: 40px;
  border-radius: 100%;
  cursor: pointer;

`;

const Rating = styled.div`
  font-size: 12px;
`;
