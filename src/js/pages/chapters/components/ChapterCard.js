import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components';
import {zoomIn} from 'react-animations';
import CircularProgressbar from 'react-circular-progressbar';
import QueryString from 'query-string';
import GradientSVG from './GradientSVG';
import Comments from './Comments.js';
import projectImg from '../../../../assets/images/project.svg'



export default class ChapterCard extends Component {

  constructor(props) {
    super(props);

    this.state ={
      numberInRow: '',
      width: '',
    };

    this.spaceCards = this.spaceCards.bind(this);
  }

    reviewChapter = () => {
      const {id, getChunks, history, number, getComments, location } = this.props;
      const searchBar = QueryString.parse(location.search);

      getChunks(id, searchBar.startv, history);     // chapter id
      getComments(id, 'chapter_id');

      history.push({
        pathname: './kanban',
        search: `?chapterId=${id}`+
                `&chapterNum=${number}`+
                `&startv=1`+
                `&bookName=${searchBar.bookName}`+
                `&projectId=${searchBar.projectId}`+
                `&mode=${searchBar.mode}`,
      });

    };

    componentWillMount() {
      this.spaceCards();
    }
    componentDidMount() {
      window.addEventListener('resize', () => {
        this.spaceCards();
      });
    }

    componentWillUnMount() {
      window.removeEventListener('resize', this.spaceCards);
    }


    spaceCards() {


      var width = window.innerWidth;
      width = width-(width*0.2); // takeaway 20% because of padding on parent container
      var numberInRow = (width/200) | 0;
      this.setState({
        numberInRow: numberInRow,
        width: width,
      });
    }

    render() {
      const { number, total_chunks, uploaded_chunks, published_chunks, txt, viewingComments, comments, deleteComment } = this.props;
      const {numberInRow, width, cardWidth} = this.state;

      let dangerSign = true;
      let checkLevel_1 = false;

      if (uploaded_chunks === total_chunks) {     // check if all the chunks uploaded matches wih the total chunks in that chapter
        dangerSign = false;
      }

      const chunksCompleted = `${published_chunks}/${total_chunks}`;
      const percentageCompleted = (published_chunks * 100)/ total_chunks;

      return (

        <CardContainer  numberInRow = {numberInRow} screenWidth={width}>
          <label><i className="material-icons">chrome_reader_mode</i> {number}</label>

          {
            viewingComments?
              <Card check ={checkLevel_1} >
                <Comments deleteComment={deleteComment} width={cardWidth} comments={comments} {...this.props} />
              </Card> :

              <Card check ={checkLevel_1} > <InformationContainer >
                {checkLevel_1 ?
                  <CheckTextContainer>
                    <CheckText>{txt.get("level")} 1</CheckText>
                  </CheckTextContainer>
                  :
                  ''
                }

              </InformationContainer>

              {checkLevel_1 ?
                <CircularProgressContainer check ={checkLevel_1}>

                  <i style={{fontSize: '58px'}} class="material-icons">star_border</i>

                </CircularProgressContainer>
                :
                <CircularProgressContainer>
                  <CircularTextContainer dangerSign={dangerSign}>
                    <i className="material-icons">warning</i>
                    <CircularText>{chunksCompleted}</CircularText>
                  </CircularTextContainer>

                  <GradientSVG startColor="#00C5FF" endColor= "#0076FF" rotation="90" idCSS="progress" />
                  <CircularProgressbar
                    percentage={percentageCompleted}
                    textForPercentage={null}
                    strokeWidth={13}
                  />

                </CircularProgressContainer>
              }

              <ButtonContainer>
                {checkLevel_1?
                  <ReviewButton check={checkLevel_1} onClick={this.reviewChapter}>
                    <i className="material-icons">done_all</i>
                    {txt.get("review")}
                  </ReviewButton>
                  :

                  <BoardButton check={checkLevel_1} onClick={this.reviewChapter}>
                    {txt.get("board")}
                    <img src={projectImg} />
                  </BoardButton>

                }
              </ButtonContainer>
              </Card>
          }
        </CardContainer>


      );
    }

}





const zoomInAnimation = keyframes `${zoomIn}`;

const CardContainer=styled.div`
text-align: center;
color: #3D3C3C;
font-size: 32px;
width: 200px;
margin: auto;
margin-top: 3vw;
i{
  vertical-align: middle;
  margin-right: 5px;
  font-size: 32px;
}
@media only screen and (max-width: 666px) {
     margin: auto;
     margin-top: 5%;
   }
@media only screen and (min-width: 667px) {
   :nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
   margin-left: ${props => props.screenWidth*0.125}px;
 }
   :nth-child(${props => (props.numberInRow*2)-1}n) {
   margin-right: ${props =>  props.screenWidth*0.125}px;
 }
 }

 @media only screen and (min-width: 950px) {
   :nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
   margin-left: ${props => props.screenWidth*0.15}px;
   }

 :nth-child(${props => (props.numberInRow*2)-1}n) {
 margin-right: ${props =>  props.screenWidth*0.15}px;
 }

@media only screen and (min-width: 1000px) {
  :nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
  margin-left: ${props => props.screenWidth*0.1}px;
  }

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.1}px;
}

@media only screen and (min-width: 1333px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.05}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.05}px;
}
}

@media only screen and (min-width: 1386px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.075}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.075}px;
}
}

@media only screen and (min-width: 1466px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.1}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.1}px;
}
}

@media only screen and (min-width: 1482px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.1}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.1}px;
}
}

@media only screen and (min-width: 1500px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.05}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.05}px;
}
}

@media only screen and (min-width: 1671px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.075}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.075}px;
}
}

@media only screen and (min-width: 1750px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.05}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.05}px;
}
}

@media only screen and (min-width: 1940px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.075}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.075}px;
}
}

@media only screen and (min-width: 2000px) {
:nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
margin-left: ${props => props.screenWidth*0.05}px;
}

:nth-child(${props => (props.numberInRow*2)-1}n) {
margin-right: ${props =>  props.screenWidth*0.05}px;
}
}
}

`;

const Card= styled.div`
    color: ${props=> props.check ? 'white': ''}
    text-align: center;
    height: 271px;
    width: 200px;
    border-radius: 15px;
    box-shadow: 0px 6px 6px rgba(0,0,0,0.5);
    overflow: hidden;
    background-color: white;
    background: ${props => props.check ? 'linear-gradient(to bottom, #0076FF, #00C5FF)':''};
    margin-top: 3vw;
    padding: 15px;
    margin: auto;
    margin-top: 1vw;
    animation: ${zoomInAnimation} .2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

`;
Card.displayName = 'Card';

const CircularTextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 50%;
    text-align: center;
    i {
      color: ${props=> props.dangerSign? '#FF9800': '#E9E9E9' }
    }
`;
CircularTextContainer.displayName = 'CircularTextContainer';

const CircularText = styled.p`
    font-size: 24px;
    font-weight: bold;
`;
CircularText.displayName = 'CircularText';

const CheckText = styled.p`
    font-size: 14px;
`;
CheckText.displayName = 'CheckText';

const ButtonContainer= styled.div`
    width: 190px;
    margin-top: 40px;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
    display: flex;
    justify-content:center;
    border-radius: 5px;
    min-height: 40px;
`;
ButtonContainer.displayName = 'ButtonContainer';

const ReviewButton= styled.button`
  display:flex;
  justify-content: center;
  color: ${props=> props.check ? '#009CFF': 'white'};
  background: linear-gradient(to top,${props => props.check ? '#FFF, #FFF': '#0076FF, #00C5FF'} );
  font-size: 16px;
  font-weight: 100;
  border: none;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
  margin: auto;
  text-align: center;
  min-height: 40px;
  width: inherit;

  i {
    vertical-align: middle;
    font-size: 16px;
    margin-left: 10px;
  }
`;
ReviewButton.displayName = 'ReviewButton';
const BoardButton = styled(ReviewButton)`
img{
  color: white;
  height: 25px;
  width: 25px;
  margin-left: 5px;
}
`;
BoardButton.displayName = 'BoardButton';

const CircularProgressContainer = styled.div`
    display: flex;
    justify-content:center;
    height: ${props=> props.check ? '68%': '75%'}
    align-items:center;
    flex-direction: column;
    position: relative;

`;
CircularProgressbar.displayName = 'CircularProgressbar';

const CheckTextContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 1vw;
`;
CheckTextContainer.displayName = 'CheckTextContainer';


const P = styled.p`
   font-size: 16px
   font-weight: bold;
   display: inline-block;
`;
P.displayName = 'P';

const InformationContainer = styled.div`
text-align: center;
width: 100%;
`;
InformationContainer.displayName = 'InformationContainer';


const TextContainer = styled.div`
  padding-top: .5vw;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  height: auto;

  i {
    vertical-align: middle;
    color: #FF9800;
    margin-left: 10%;
  }
`;
TextContainer.displayName = 'TextContainer';
