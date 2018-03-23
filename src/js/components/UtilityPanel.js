import React from 'react';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import Comments from '../pages/chunks/components/Comments';

export default class ComponentName extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      utilityPanel: true,
    };

    this.toggleUtilityPanel = this.toggleUtilityPanel.bind(this);

  }

  toggleUtilityPanel() {
    this.setState(prevState => ({utilityPanel: !prevState.utilityPanel}));
  }

  componentDidMount() {
    const t = this.props;
    //debugger;

  }



  render() {

    const { takes } = this.props;
    const chunkNum = this.props.chunks.startv;
    const chapterNum = this.props.chapter.number;

    console.log(this.state.utilityPanel, 'UtilityPanel STATE');

    return (
      this.state.utilityPanel?
        <UtilityPanel >


          <UtilityNavigation>

            <Toggle
              onChange={e=>this.setState({commentsTab: e.target.checked})}
              defaultChecked= {false} icons ={{
                unchecked: <i className="fa fa-comment" />,
                checked: <img src={require('../../assets/images/Audio_Wave.svg')} />,
              }}  />

            <Hide onClick={this.toggleUtilityPanel}> Hide <i className= "fa fa-arrow-right fa-fw" /> </Hide>



          </UtilityNavigation>
          { !this.state.commentsTab ?
            <CommentsPanel>
              <Comments comments={this.props.chapterComments} text= {`Chapter ${chapterNum}`} />
              <Comments comments={this.props.chunkComments} text={`Chunk ${chunkNum}`} />
              {takes.map(tk=> <Comments comments={tk.comment} text={`Take ${tk.take_num}`} />) }
            </CommentsPanel>
            :
            this.props.chunks.map((chunk,index) => this.props.createChunkList(chunk, index))
          }

        </UtilityPanel>
        :

        <UtilityPanelNotVisible>
          <Show onClick= {this.toggleUtilityPanel}> <i className="fa fa-arrow-left fa-fw" /> Show </Show>
        </UtilityPanelNotVisible>

    );
  }

}
const CommentsPanel = styled.div`

`;
const UtilityPanelNotVisible = styled.div`
margin-top: 1vw;
padding-top: 1vw;`;

const UtilityPanel = styled.div`
  background: #2D2D2D;
   padding: 1vw;
   flex: 0.18;
   width: 26vw;
   height: 52.6vw;
   overflow: auto;
  border-bottom: 1px solid #969595;
`;

const UtilityNavigation = styled.div`
  display: flex;
  flex-direction: row ;
  justify-content: space-between;
  margin-top: 1vw;
`;

const Hide = styled.button`
  text-decoration: underline;
  color: #009CFF;
  cursor: pointer;
  border: none;
  background: none;
`;

const Show = styled(Hide)`
  color: white;

`;
