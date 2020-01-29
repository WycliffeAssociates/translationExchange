import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import BorderButton from '../../../components/BorderButton';
import DowloadingTransfer from './DownloadingTransfer';


class ExportModal extends Component {



  close = () => {
    const {resetExport, updateExportModal} = this.props;
    resetExport();
    updateExportModal('showModal', false);


  };


  goToExport = () => {
    const {history, bkName, projId, updateExportModal}= this.props;
    updateExportModal('showModal', false);

    history.push({
      pathname: './export',
      search: `?projectId=${projId}&&bookName=${bkName}`,
    });
  }




  render() {

    const { txt, taskId, transferProject, getTransferProgress, projId, bkName, showModal} = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          dimmer={true}
          open={showModal}
          onClose={this.close}
          size="mini"
          style={{ verticalAlign: 'middle', margin: 'auto', marginTop: '461px', width: '710px', height: '528px', position: 'initial'}}
        >
          <ModalContainer>

            <TopContainer>
              <Span onClick={()=>this.close()}>X</Span>
              <TextContainer>
                <p>{txt.get("exportProject")}:</p>
                <h1>{bkName}</h1>
              </TextContainer>

            </TopContainer>
            {taskId ? <DowloadingTransfer close={this.close} txt={txt} taskId={taskId} getTransferProgress={getTransferProgress} /> :

              <ButtonsContainer>
                <SingleButtonContainer color={'#E56060'}>
                  <BorderButton icon="share"  onClick={()=> {transferProject(projId);}} color={'#E56060'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} />
                  <p>{txt.get("transfer")}</p>
                </SingleButtonContainer>
                <SingleButtonContainer color={'#009CFF'}>
                  <BorderButton icon="get_app" onClick={this.goToExport} color={'#009CFF'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} />
                  <p>{txt.get("download")}</p>
                </SingleButtonContainer>

              </ButtonsContainer>

            }

          </ModalContainer>

        </Modal>

      </div>
    );
  }
}





const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

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
