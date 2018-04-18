import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components';
import {zoomIn} from 'react-animations';
import CircularProgressbar from "react-circular-progressbar";
import QueryString from "query-string";



export default class ChapterCard extends Component {

  constructor() {
    super();

    this.state ={
      numberInRow: '',
    };

    this.spaceCards = this.spaceCards.bind(this);
  }

    reviewChapter = () => {
      const {id, getChunks, history, number, getComments, location } = this.props;
      const searchBar = QueryString.parse(location.search);

      getChunks(id, history);     // chapter id
      getComments(id, 'chapter_id');

      history.push({
        pathname: './kanban',
        search: `?chapterId=${id}&chapterNum=${number}&bookName=${searchBar.bookName}&projectId=${searchBar.projectId}&&mode=${searchBar.mode}`,
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

    spaceCards() {


      var width = window.innerWidth;
      width = width-(width*0.1); // takeaway 10% because of padding on parent container
      var numberInRow = (width/220) | 0;
      this.setState({
        numberInRow: numberInRow,
      });
    }

    render() {
      const { number, total_chunks, uploaded_chunks, published_chunks } = this.props;
      const {numberInRow} = this.state;

      let dangerSign = true;
      let checkLevel_1 = false;

      if (uploaded_chunks === total_chunks) {     // check if all the chunks uploaded matches wih the total chunks in that chapter
        dangerSign = false;
      }

      const chunksCompleted = `${published_chunks}/${total_chunks}`;
      const percentageCompleted = (published_chunks * 100)/ total_chunks;

        return (

                <Card check ={checkLevel_1} numberInRow = {numberInRow}>
                    <InformationContainer >
                        <TextContainer>
                            <P>Chapter {number}</P>
                            {dangerSign ? <i class="material-icons">warning</i>:''}
                        </TextContainer>
                        {checkLevel_1 ?
                            <CheckTextContainer>
                                <CheckText>Level 1</CheckText>
                            </CheckTextContainer>
                            :
                            ''
                        }

                    </InformationContainer>



                        {checkLevel_1 ?
                            <CircularProgressContainer check ={checkLevel_1}>

                                <i style={{fontSize: '9vw'}} class="material-icons">star_border</i>

                            </CircularProgressContainer>
                            :
                            <CircularProgressContainer>
                            <CircularTextContainer>
                                <CircularText>{chunksCompleted}</CircularText>
                            </CircularTextContainer>
                            <CircularProgressbar
                                percentage={percentageCompleted}
                                textForPercentage={null}
                            />
                            </CircularProgressContainer>
                        }



                    <ButtonContainer>
                        <ReviewButton check={checkLevel_1} onClick={this.reviewChapter}>
                            <i style={{fontSize: '16px'}} class="material-icons">done_all</i>
                            <p style={{fontSize: '16px', marginLeft: '5px'}}>  Review </p>
                        </ReviewButton>
                    </ButtonContainer>
                </Card>


        );
    }

}





const zoomInAnimation = keyframes `${zoomIn}`;

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
    margin-top: 2vw;
    animation: ${zoomInAnimation} .2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    @media only screen and (max-width: 733px) {
      margin: auto;
      margin-top: 5%;
    }
    @media only screen and (min-width: 734px) {
      :nth-child(${props => (props.numberInRow*2)-1}n-${props => props.numberInRow-2}) {
      margin-left: ${props => 90/(2+props.numberInRow)}%;
    }

    :nth-child(${props => (props.numberInRow*2)-1}n) {
    margin-right: ${props => 75/(2+props.numberInRow)}%;
  }
    }

`;

const CircularTextContainer = styled.div`
    position: absolute;
`;

const CircularText = styled.p`
    font-size: 18px;
`;

const CheckText = styled.p`
    font-size: 14px;
`;


const ReviewButton= styled.button`
  display:flex;
  color: ${props=> props.check ? '#009CFF': 'white'};
  background: linear-gradient(to bottom,${props => props.check ? '#FFF, #FFF': '#0076FF, #00C5FF'} );
  font-size: 12px;
  font-weight: 100;
  border: none;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
  margin: auto;
  padding: 10px 35px;
  min-height: 40px;
  width: inherit;

  i {
    vertical-align: middle;
    text-decoration: none;
  }

  p {
    text-decoration: underline;
  }
`;

const CircularProgressContainer = styled.div`
    display: flex;
    justify-content:center;
    height: ${props=> props.check ? '68%': '75%'}
    align-items:center;
    flex-direction: column;
    position: relative;

`;

const CheckTextContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 1vw;
`;


const P = styled.p`
   font-size: 16px
   font-weight: bold;
   display: inline-block;
`;

const InformationContainer = styled.div`
text-align: center;
width: 100%;
`;


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

const ButtonContainer= styled.div`
    width: 150px;
    margin-top: 10px;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
    display: flex;
    justify-content:center;
    border-radius: 25px;

  `;
