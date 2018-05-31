import React from 'react';
import styled from 'styled-components';
import SetUndo from './SetUndo';

export default class ListView extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      placeHolderCount: 0,
      alternateTakesFetched: false,
    };

    this.renderList = this.renderList.bind(this);
    this.getPlaceholders = this.getPlaceholders.bind(this);
  }
  componentDidUpdate() { //use the following code to render place holders
    const {alternateTakes, chunkId} = this.props;
    const {alternateTakesFetched} = this.state;
    if (alternateTakes.length!==0 &&  alternateTakesFetched === false) {
      for (var x=0; x<alternateTakes.length; x++) {
        if (alternateTakes[x].chunkId === chunkId) {
          let num = alternateTakes[x].takes.length;
          this.setState({placeHolderCount: num, alternateTakesFetched: true});
        }
      }
    }
  }
  renderList(array, active, index) {

    return (
      array.takes.length >1?
        array.takes.map((take) => {
          return (

            <ListItem active={active} key={take.id}>
              <TakeNum> Take {take.take_num}</TakeNum>

              <TouchTarget onClick ={() => this.props.swapTake(take,index)} > <i className="material-icons">touch_app</i> </TouchTarget>

              <Rating>
                <label > <i className="material-icons">star_border</i> </label>
                <label> <i  className="material-icons">star_border</i> </label>
                <label> <i  className="material-icons">star_border</i> </label>
              </Rating>
            </ListItem>

          );
        })
        :
        <ListItem active={active} key={array.takes[0].id}>
          <TakeNum> Take {array.takes[0].take_num}</TakeNum>

          <TouchTarget onClick ={() => this.props.swapTake(array.takes[0],index)}> <i className="material-icons">touch_app</i> </TouchTarget>

          <Rating>
            <label > <i className="material-icons">star_border</i> </label>
            <label> <i  className="material-icons">star_border</i> </label>
            <label> <i  className="material-icons">star_border</i> </label>
          </Rating>
        </ListItem>
    );

  }
  getPlaceholders(active) {
    let array = [];
    let {placeHolderCount} = this.state;
    if (placeHolderCount<4) {
      while (placeHolderCount < 4) {
        placeHolderCount++;
        array.push(
          <div key={Math.random()}>
            <ListItem active={active} style={{height: '7.5vh'}} />
          </div>
        );
      }
    }

    return array;
  }


  render() {

    const {alternateTakes, index, chunkId, active,txt,saveComment,
      tempTakes, undoSwapTake, take, setTake, location} = this.props;
    let numPlaceHolders = this.getPlaceholders();
    return (
      <Container>
        {
          tempTakes[index] && tempTakes[index] !== null?
            <SetUndo undoSwapTake={undoSwapTake} index={index}
              tempTakes={tempTakes} take={take} txt={txt}
              alternateTakes={alternateTakes} saveComment={saveComment}
              setTake={setTake} chunkId={chunkId} location={location} />
            :
            alternateTakes.map((array) => {
              if (array.chunkId === chunkId) {
                return this.renderList(array, active, index); //, this.renderPlaceholder(array.takes.length, active);
              }
            })
        }

        {
          numPlaceHolders.map((placeholder)=> {
            return placeholder;
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
Container.displayName='Container';

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
ListItem.displayName='ListItem';

const TakeNum = styled.label`
`;
TakeNum.displayName='TakeNum';
const TouchTarget = styled.button`
  border: none;
  min-height: 40px;
  min-width: 40px;
  border-radius: 100%;
  cursor: pointer;

`;
TouchTarget.displayName='TouchTarget';

const Rating = styled.div`
  font-size: 12px;
`;
Rating.displayName='Rating';
