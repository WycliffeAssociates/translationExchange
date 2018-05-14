import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import BorderButton from '../../../components/BorderButton';


class ExportModal extends Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }



  componentWillReceiveProps(nextProps) {
    this.setState({showModal: nextProps.display});
  }



  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => {
    this.setState({showModal: false});
    //set timeout to ensure that state is reset to initial before the modal closes
    //setTimeout(() => this.props.closeModal(), 100);

  };


  goToExport = () => {
    const {history, bookName, projectId}= this.props;

    history.push({
      pathname: './export',
      search: `?projectId=${projectId}&&bookName=${bookName}`,
    });
  }






  render() {
    const { showModal } = this.state;
    const {bookName, txt} = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          dimmer={true}
          open={showModal}
          onClose={this.close}
          size="mini"
          style={{ verticalAlign: 'middle', margin: 'auto', marginTop: '461px', width: '710px', height: '528px'}}
        >
          <ModalContainer>
            <TopContainer>
              <Span onClick={()=>this.close()}>X</Span>
              <TextContainer>
                <p>Export Project:</p>
                <h1>{bookName}</h1>
              </TextContainer>

            </TopContainer>
            <ButtonsContainer>
              <SingleButtonContainer color={'#E56060'}>
                <BorderButton icon="share"  onClick={()=> this.download('wav')} color={'#E56060'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} />
                <p>Transfer</p>
              </SingleButtonContainer>
              <SingleButtonContainer color={'#009CFF'}>
                <BorderButton icon="get_app" onClick={this.goToExport} color={'#009CFF'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} />
                <p>Download</p>
              </SingleButtonContainer>

            </ButtonsContainer>

          </ModalContainer>

        </Modal>

      </div>
    );
  }
}



const CloseContainer= styled.div`

`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
`

const TopContainer = styled.div`
  margin-top: 5%;
`;

const Span = styled.span`
color:#009CFF;
font-size:1.8vw;
position:absolute;
top:0.3vw;
right:.6vw;
cursor:pointer;
`;

const Text = styled.p`
  font-size: 2vw;
  font-weight: bold;

`;

const TextContainer = styled.div`
`;

const SingleButtonContainer = styled.div`
  margin: 70px 40px 40px 40px;
  color: ${props => props.color}
  text-align: center;
`;


const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;




export default ExportModal;
