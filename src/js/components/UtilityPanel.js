import React from 'react';
import styled from 'styled-components';
import Toggle from 'react-toggle';

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


  render() {


    return (
      this.state.utilityPanel?
        <div style={{background: '#2D2D2D', padding: '1vw', flex: '0.18', height: '93vh', overflow: 'auto'}}>


          <UtilityNavigation>

            <Toggle defaultChecked= {false} icons ={{
              unchecked: <i className="fa fa-comment" />,
              checked: <img src={require('../../assets/images/Audio_Wave.svg')} />,
            }}  />

            <Hide onClick={this.toggleUtilityPanel}> Hide <i className= "fa fa-arrow-right fa-fw" /> </Hide>

          </UtilityNavigation>
          {this.props.chunks.map((chunk,index) => this.props.createChunkList(chunk, index))}

        </div>
        :

        <UtilityPanelNotVisible>
          <Show onClick= {this.toggleUtilityPanel}> <i className="fa fa-arrow-left fa-fw" /> Show </Show>
        </UtilityPanelNotVisible>

    );
  }

}
const UtilityPanelVisible = styled.div``;
const UtilityPanelNotVisible = styled.div`
margin-top: 1vw;
padding-top: 1vw;`;

const UtilityPanel = styled.div`
  background: #2D2D2D;
   padding: 1vw';
   flex: 0.18;
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

const Hide = styled.label`
  text-decoration: underline;
  color: #009CFF;
  cursor: pointer
`;

const Show = styled(Hide)`
  color: white;

`;
