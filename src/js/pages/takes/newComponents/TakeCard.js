import React from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';

export default class TakeCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    jdenticon.update('randomhash4324');
  }

  handleClick() {

    this.setState(prevState => ({ showComments: !prevState.showComments}));
  }

  render() {

    return (
      <Container>
        <TopBar>
          <DragIcon>
            <i className = "fa fa-bars" />
          </DragIcon>

          <CardInfo>
            <h3 style={{alignSelf: 'center'}}> {`Take ${'01'}`} </h3>
            <p style={{color: 'lightgray', fontStyle: 'italic', fontWeight: '100', marginTop: '-0.8vw'}}> 03/13/17 </p>
          </CardInfo>

          <Icon data-jdenticon-value={'randomhash4324'} />
        </TopBar>


        <Waveform>
          <img src={require('../../../../assets/images/waveform-placeholder.png')}  style={{height: '7vw', width: '100%'}} />

        </Waveform>


        <BottomButtons>
          <CommentButton onClick={this.handleClick}>
            <span className="fa-layers fa-fw">
              <i className="fas fa-comment" />
              <span className="fa-layers-counter" style={{fontSize: '2.1vw'}}> 2,112 </span>
            </span>
          </CommentButton>


          <PlayTake>
            <i className="fa fa-play fas-space" /> 1:45
          </PlayTake>
        </BottomButtons>


        {this.state.showComments?
          <Comments>
            <CommentRow>
              <Icon data-jdenticon-value={'random-randomhash4324'} />
              <RowButton> <i className = "fa fa-trash" /> </RowButton>


            </CommentRow>

            <CommentRow>
              <Icon data-jdenticon-value={'random-randomhash4324'} />
              <RowButton> <i className = "fa fa-trash" /> </RowButton>
            </CommentRow>

            <MoreOptions>

              <LoadMore>
                <i className="fa fa-chevron-circle-down" />
                {`${' '}Load More`}
              </LoadMore>

              <RecordComment>
                <i className="fa fa-microphone" />
              </RecordComment>

            </MoreOptions>

          </Comments> :
          '' }



      </Container>

    );
  }

}

const Container = styled.div`
border-top: solid 0.04vw lightgray;
border-left: solid 0.04vw lightgray;
box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);
width: 25vw;
height: auto;
margin: 3vw;
border-radius: 0.3vw;
overflow: hidden;
border-bottom: none;

`;

const TopBar = styled.div`
  //height: 15%;
  display: flex;
  flex-direction: row;
  //align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

`;

const DragIcon = styled.button`
  border: none;
  font-size: 1.5vw;
  color: gray;
  background: none;

`;

const CardInfo = styled.div`
  margin-top: 0.8vw;
  text-align: center;
`;

const Icon = styled.svg`
  height: 2vw;
  width: 2w;
  `;


const Waveform = styled.div`
  `;

const BottomButtons = styled.div`
 display: flex;
 flex-direction: row;
 align-items: stretch;
`;

const Button = styled.label`
  font-size: 1.75vw;
  border: none;
  align-self: stretch;
  flex: 1;
  padding: 1.5vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
`;

const CommentButton = styled(Button)`
  color: #009CFF;
  background: white;
  text-decoration: underline;
`;

const PlayTake = styled(Button)`
  color: white;
  background: #009CFF;
  font-size: 1.2vw;
`;

const Comments = styled.div`
padding-left: 1vw;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: stretch;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.01vw lightgray;
`;

const RowButton = styled(Button)`
  flex:0;
  border-top: none;
  font-size: 1vw;
`;

const MoreOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`;

const LoadMore = styled.label`
  font-size: 1.2vw;
  text-decoration: underline;
  color: #009CFF;
`;

const RecordComment = styled(Button)`
  background: #E74C3C;
  color: white;
  flex: 0;
  font-size: 1.4vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  align-self: flex-end;
  border-top: none;

`;
