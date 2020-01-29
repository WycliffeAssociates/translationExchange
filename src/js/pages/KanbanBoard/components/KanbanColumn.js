import React from 'react';
import styled from 'styled-components';
import TakeCard from '../../takes/TakeCard/';
import DragHereBox from '../../../components/DragHereBox';
import ReviewDialog from './ReviewDialog';
import QueryString from 'query-string';
import {DropTarget} from 'react-dnd';

class KanbanColumn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayModal: true,
    };

    this.makeChanges = this.makeChanges.bind(this);
    this.nextChunk = this.nextChunk.bind(this);
    this.nextChapter = this.nextChapter.bind(this);
    this.chapterPublished = this.chapterPublished.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({displayModal: false});
  }

  nextChunk() {

    const {activeChunkId, chunks, history, location} = this.props;
    const searchBar = QueryString.parse(location.search);
    let activeChunkIndex = null;

    chunks.map( (chk, index) => {
      if (chk.id == activeChunkId) {    // find the chunk that we are at
        activeChunkIndex = index;     // get the index in the array list
      }
    });

    if (chunks[activeChunkIndex+1]!== undefined) {
      const nextChunkId = chunks[activeChunkIndex+1].id;      // add + 1 to get the next item in the array
      const nextChunkNum = chunks[activeChunkIndex+1].startv;

      history.push({
        pathname: './kanban',
        search: `?chapterId=${searchBar.chapterId}`+
                `&chapterNum=${searchBar.chapterNum}`+
                `&startv=${nextChunkNum}`+
                `&bookName=${searchBar.bookName}`+
                `&projectId=${searchBar.projectId}`+
                `&mode=${searchBar.mode}`,
      });

      this.props.getTakes(nextChunkId, nextChunkNum );
    }

    else { //if last chunk and not all chunks completed, redirect to incomplete chunk
      chunks.map((chk, index) => {
        if (!chk.published_take) {
          activeChunkIndex = index;
          const nextChunkId = chunks[activeChunkIndex].id;      // add + 1 to get the next item in the array
          const nextChunkNum = chunks[activeChunkIndex].startv;

          history.push({
            pathname: './kanban',
            search: `?chapterId=${searchBar.chapterId}`+
                    `&chapterNum=${searchBar.chapterNum}`+
                    `&startv=${nextChunkNum}`+
                    `&bookName=${searchBar.bookName}`+
                    `&projectId=${searchBar.projectId}`+
                    `&mode=${searchBar.mode}`,
          });

          this.props.getTakes(nextChunkId, nextChunkNum );
        }

      });
    }

  }

  nextChapter(next_chapter_num) {
    const {history, chapters} = this.props;
    
    var nextChapter = chapters.find(function(chapter){
      return chapter.number == next_chapter_num
    })

    if(nextChapter == undefined) { // if nextChapter is undefined, it means we have reached the last chapter in the book
      this.props.history.push({pathname: '/projects'});
    } 
    else {
      var query = QueryString.parse(this.props.location.search);
      query.chapterId = nextChapter.id;
      query.chapterNum = next_chapter_num;
    
    this.props.history.push({
      pathname: '/kanban',
      search: `?chapterId=${nextChapter.id}`+
              `&chapterNum=${next_chapter_num}`+
              `&startv=1`+
              `&bookName=${query.bookName}`+
              `&projectId=${query.projectId}`+
              `&mode=${query.mode}`,
    });
    this.props.getChunks(nextChapter.id, 1, history);
    this.props.getComments(nextChapter.id, 'chapter_id');
    }
  }

  onDrop(published, newRating, take) {
    const query = QueryString.parse(this.props.location.search);
    const chapterId = query.chapterId;
    this.props.patchTake(
      take.id,
      { published: published, rating: newRating },
      () => {
      //success callback
        this.props.patchChapter(
          chapterId, 
          { published: this.chapterPublished() },
        )
      },
      this.props.takes,
      chapterId,
      take.rating,
      take.published
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
    var mode = query.mode;

    const { connectDropTarget, isOver, deleteTake, txt,
      getComments, publishedTake, saveComment,
      uploadingComments, activeChunkId, chunkNum,
      deleteComment, playingTakeId,
      playTake, takesToDelete,
      addTakeToDelete, removeTakeToDelete, removedTaketoDelete,
      updateTake, history} = this.props;
    const {search} = this.props.location;
    const {displayModal} = this.state;


    var icon;
    switch (this.props.icon) {

      case 1:
        icon= <label className="labelLines"> <i style={starSize} className="material-icons">star_border</i> </label>;
        break;

      case 2:
        icon = (
          <div className="labelLines">
            <label> <i style={starSize} className="material-icons">star_border</i> </label>
            <label> <i style={starSize}  className="material-icons">star_border</i> </label>
          </div>
        );
        break;

      case 3:
        icon = (
          <div className="labelLines">
            <label > <i style={starSize}  className="material-icons">star_border</i> </label>
            <label> <i style={starSize}  className="material-icons">star_border</i> </label>
            <label> <i style={starSize}  className="material-icons">star_border</i> </label>
          </div>
        );
        break;

      case 4:
        icon = <label className="labelLines"> <i style={starSize} className="material-icons">check</i> </label>;
        break;

      default:
        icon=  <label> <i style={starSize} className="material-icons">star_border</i> </label>;
        break;
    }
    return connectDropTarget(
      <div style={{height: 'min-content'}}>
        <Column published={this.props.icon ==4? true: false} isOver = {isOver}> {/* passing props into our styled component, if the icon ==4 then this is the publish column
                                                                  therefore render height accordingly*/}
        <div>
          <center> {icon} </center>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', overflow: 'auto'}}>
          {
            this.props.array? this.props.array.map((take, index) => {
              return (
                <TakeCard key={index} {...take} makeChanges= {this.makeChanges}

                  txt = {txt}
                  getComments ={getComments}
                  publishedTake = {publishedTake}
                  deleteTake = {deleteTake}
                  deleteComment ={deleteComment}
                  saveComment={saveComment}
                  uploadingComments={uploadingComments}
                  activeChunkId={activeChunkId} chunkNum={chunkNum}
                  playingTakeId={playingTakeId}
                  playTake={playTake}
                  takesToDelete={takesToDelete}
                  addTakeToDelete={addTakeToDelete}
                  removeTakeToDelete={removeTakeToDelete}
                  removedTaketoDelete={removedTaketoDelete}
                  updateTake={updateTake} /> ); /* published take passed down for react dnd */
            }) : ''

          }

          { this.props.publishedColumn? /* if publishedColumn column has 1 take card don't display DragHereBox*/
            '':
            <DragHereBox txt={this.props.txt} />
          }

        </div>

        </Column>

        {
          this.props.publishedColumn?
            this.chapterPublished()?

              <center>
                <VBox>
                  <ChapterReview onClick ={() => this.props.history.push(`/chapterReview${search}`)} >
                    {txt.get("goToChapterReview")}<i className="material-icons">done_all</i>
                  </ChapterReview>
                  {
                    displayModal?
                      <ReviewDialog nextChapter={() => this.nextChapter(Number(chapterNum) +1)}
                        closeModal={this.closeModal}
                        chapterNum = {chapterNum}
                        query={this.props.location.search}
                        history={history}
                        txt={txt}
                      />
                      :
                      ''
                  }
                  <NextChapter onClick ={() => this.nextChapter(Number(chapterNum) +1)} >{txt.get("goToNextChapter")} <i className="material-icons">arrow_forward</i> </NextChapter>
                </VBox>
              </center>
              :
              mode === 'Chunk' || mode === 'chunk'?
                <center> <NextChunk onClick ={() => this.nextChunk()}>{this.props.txt.get("goToNextChunk")} <i className= "material-icons">arrow_forward</i> </NextChunk> </center>
                :
                <center> <NextChunk onClick ={() => this.nextChunk()}>{this.props.txt.get("goToNextVerse")} <i className= "material-icons">arrow_forward</i> </NextChunk> </center>
            : ''
        }

      </div>


    );
  }

}

const starSize = {
  fontSize: '2.7vw',
};


const Column = styled.div`
  height: ${props => props.published? 'auto' : '75vh'};
  width: 20vw;
  background:${props => props.isOver? '#009CFF': 'rgba(45,45,45,0.5)'};
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
    font-size: 1em + 1vw;
    z-index: 99;
    i  {
      vertical-align: middle;
    }
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
font-size: 1em + 1vw;
z-index: 99;
i  {
  vertical-align: middle;
}
margin-top: 5px;

`;
NextChapter.displayName = 'NextChapter';

const ChapterReview = styled(NextChapter)`
  z-index: 99;
`;
ChapterReview.displayName = 'ChapterReview';

const VBox = styled.div`
display: flex;
flex-direction: column;
`;
VBox.displayName = 'VBox';

const takeTarget = {
  drop(props) {
    const { listId } = props;
    return { listId: listId };
  },
};


export default DropTarget('TakeCard', takeTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(KanbanColumn);
