import React from 'react';
import styled from 'styled-components';
import DragTarget from './DragTarget';
export default class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      date: '',
    };

    this.convertUTC = this.convertUTC.bind(this);
  }

  componentDidMount() {
    const {date_modified} = this.props;
    this.convertUTC(date_modified);

  }

  convertUTC(date_modified) {
    let date = new Date(date_modified);
    let convertedDate= '';
    convertedDate = date.getUTCDate()+ '/';
    convertedDate = convertedDate + (date.getUTCMonth()+1)+ '/';
    convertedDate = convertedDate+ date.getUTCFullYear();

    this.setState({date: convertedDate});
  }


  render() {
    const {owner_icon_hash} = this.props;
    const {date} = this.state;

    return  (
      <TopBarContainer>

        <DragTarget {...this.props} />

        <CardInfo>
          <h3 style={{alignSelf: 'center'}}> {this.props.txt.get("take")} {this.props.take_num} </h3>
          <p style={{color: 'lightgray', fontStyle: 'italic', fontWeight: '100', marginTop: '-0.8vw'}}> {date}  </p>
        </CardInfo>

        <Icon  id={`user${owner_icon_hash}`} data-jdenticon-hash={owner_icon_hash? owner_icon_hash: 'null user'} />
      </TopBarContainer>

    );
  }

}

const TopBarContainer = styled.div`
  //height: 15%;
  display: flex;
  flex-direction: row;
  //align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

`;
TopBarContainer.displayName = 'TopBarContainer';


const CardInfo = styled.div`
  margin-top: 0.8vw;
  text-align: center;
`;
CardInfo.displayName = 'CardInfo';

const Icon = styled.svg`
  height: 2vw;
  width: 2w;
  margin-top: 0.6vw;
  cursor: pointer;
  `;
Icon.displayName = 'Icon';
