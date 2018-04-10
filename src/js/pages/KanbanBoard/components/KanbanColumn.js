import React from 'react';
import styled from 'styled-components';

import TakeCard from '../../takes/newComponents/TakeCard/TakeCard';
import DragHereBox from '../../../components/DragHereBox';
import QueryString from 'query-string';
import {DropTarget} from 'react-dnd';

class KanbanColumn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //take: this.props,
    };

    this.makeChanges = this.makeChanges.bind(this);
    this.nextChunk = this.nextChunk.bind(this);
    this.navigateToChapter = this.navigateToChapter.bind(this);
    this.chapterPublished = this.chapterPublished.bind(this);
  }

  nextChunk() {

    const {activeChunkId, chunks} = this.props;


    let activeChunkIndex = null;

    chunks.map( (chk, index) => {
      if (chk.id == activeChunkId) {    // find the chunk that we are at
        activeChunkIndex = index;     // get the index in the array list
      }
    });

    const nextChunkId = chunks[activeChunkIndex+1].id;      // add + 1 to get the next item in the array
    const nextChunkNum = chunks[activeChunkIndex+1].startv;

    this.props.getTakes(nextChunkId, nextChunkNum );
  }


  navigateToChapter(chapter_num, chapterId) {

    var query = QueryString.parse(this.props.location.search);
    console.log(query, 'QUERY');
    query.chapterId = chapterId;
    query.chapterNum = chapter_num;
    const queryString  = QueryString.stringify(query);
    console.log(queryString);

    this.props.history.push({
      pathname: '/kanban',
      search: `?chapterId=${chapterId}&chapterNum=${chapter_num}&bookName=${query.bookName}&projectId=${query.projectId}`,
    });

    this.props.getChunks(chapter_num+1);
    this.props.getComments(chapterId+1, 'chapter_id');

  }

  onDrop(published, newRating, take) {
    const query = QueryString.parse(this.props.location.search);
    const chapterId = query.chapterId;
    this.props.patchTake(
      take.id,
      { published: published, rating: newRating },
      updatedTake => {
      //success callback
        if (published) {
          this.props.updateChosenTakeForChunk(updatedTake.id);
        }
      },
      this.props.takes,
      chapterId
    );
  }

  makeChanges(isPublish, newRating, take) {
    switch (newRating) {
      // the cases line up with the list id's specified in KanbanBoard.js 0/1 is 1 star, 2 is 2 star, 3 is 3 star, 4 is publised
      // problem is that the max for ratings is 3. differntiation between 3 star and published is a boolean flag
      case 0:
        return this.onDrop(false, 1, take);

      case 1:

        return this.onDrop(false, 1, take);

      case 2:
        return this.onDrop(false, 2, take);

      case 3:
        return this.onDrop(false, 3, take);

      case 4:
        return this.onDrop(true, 3, take);

      default:
        return null;

    }
  }

  chapterPublished() {
    const {chunks} = this.props;
    var chapterPublished = true;

    for (var x=0; x< chunks.length; x++) {
      if (chunks[x].published_take == null) {
        chapterPublished = false;
        break;
      }
    }
    return chapterPublished;

  }


  render() {
    var query = QueryString.parse(this.props.location.search);
    var chapterNum = query.chapterNum;
    var chapterId = query.chapterId;

    const { connectDropTarget, isOver} = this.props;
    const { saveComment, uploadingComments, activeChunkId, chunkNum} = this.props;

    var icon;
    switch (this.props.icon) {

      case 1:
        icon= <label className="labelLines"> <i className="far fa-star fa-2x" /> </label>;
        break;

      case 2:
        icon = (
          <div className="labelLines">
            <label> <i className="far fa-star fa-2x" /> </label>
            <label> <i className="far fa-star fa-2x" /> </label>
          </div>
        );
        break;

      case 3:
        icon = (
          <div className="labelLines">
            <label > <i className="far fa-star fa-2x" /> </label>
            <label > <i className="far fa-star fa-2x" /> </label>
            <label > <i className="far fa-star fa-2x" /> </label>
          </div>
        );
        break;

      case 4:
        icon = <label className="labelLines"> <i className="fas fa-check fa-2x" /> </label>;
        break;

      default:
        icon= <label className="labelLines"> <i className="far fa-star fa-2x" /> </label>;
        break;
    }
    return connectDropTarget(
      <div style={{background: isOver? '#009CFF': ''}}>
        <Column published={this.props.icon ==4? true: false} > {/* passing props into our styled component, if the icon ==4 then this is the publish column
                                                                  therefore render height accordingly*/}
        <div>
          <center> {icon} </center>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', overflow: 'auto'}}>
          {
            this.props.array? this.props.array.map((take, index) => {
              return (
                <TakeCard key={index} {...take} makeChanges= {this.makeChanges}
                  displayText = {this.props.displayText}
                  getComments ={this.props.getComments}
                  publishedTake = {this.props.publishedTake}
                  saveComment={saveComment}
                  uploadingComments={uploadingComments}
                  activeChunkId={activeChunkId} chunkNum={chunkNum}  /> ); /* published take passed down for react dnd */
            }) : ''

          }

          { this.props.publishedColumn? /* if publishedColumn column has 1 take card don't display DragHereBox*/
            '':
            <DragHereBox />
          }

        </div>

        </Column>

        {
          this.props.publishedColumn?
            this.chapterPublished()?
              <center> <NextChapter onClick ={() => this.navigateToChapter(Number(chapterNum) +1 ,Number(chapterId) +1)} >Go To Next Chapter <i className="fa fa-arrow-right" /> </NextChapter> </center> :
              <center> <NextChunk onClick ={() => this.nextChunk()}>Go To Next Chunk <i className="fa fa-arrow-right" /> </NextChunk> </center>
            : ''
        }

      </div>


    );
  }

}



const Column = styled.div`
  height: ${props => props.published? 'auto' : '75vh'};
  width: 20vw;
  background: rgba(45,45,45,0.5);
  padding: 2vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
  border-radius: 1vw;
  flex: 0.2;
  align-self: center;
  justify-self: center;
  overflow: auto;


  /* width */
  ::-webkit-scrollbar {
    width: 0.2vw;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #969595
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {

    background: #F6F9FE;
  }


  /* Handle on hover*/

  ::-webkit-scrollbar-thumb: hover {
      background: #00C5FF;
  }

`;
Column.displayName = 'Column';

const NextChunk = styled.button`
  	color: white;
  	background: linear-gradient(to right, #0076FF, #00C5FF  );
  	border: none;
  	border-radius: 2vw;
  	padding: 0.75vw;
  	cursor: pointer;
  	outline:none;
  `;
NextChunk.displayName = 'NextChunk';

const NextChapter  = styled.button`
color: white;
background: linear-gradient(to right, #0076FF, #00C5FF  );
border: none;
border-radius: 2vw;
padding: 0.75vw;
cursor: pointer;
outline:none;
`;
NextChapter.displayName = 'NextChapter';


const takeTarget = {
  drop(props, monitor, component) {
    const { listId } = props;
    const sourceObj = monitor.getItem();
    if (listId !== sourceObj.listId) {
      //component.pushTake(sourceObj.take);
    }
    return { listId: listId };
  },
};


export default DropTarget('TakeCard', takeTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(KanbanColumn);
