import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import {selections, getChapters, getUserHash, resetSelected, downloadChapters, getDownloadProgress} from '../../actions';
import {ExportCard, CompletedCheckbox, Footer, ChapterSelected, ExportProject} from './components';
import styled from 'styled-components';
import QueryString from "query-string";



export class ExportPage extends Component {

  constructor(props) {
    super(props);
    this.state= {checked: null,
      readyToExport: false,
      downloading: false
    }

  }

  componentWillMount() {
    const {location, getChapters} = this.props;
    const query = QueryString.parse(location.search);
    getChapters(query.projectId);
  }

  toggleCheck = () => { this.setState({checked: !this.state.checked});}

  nextStep = () => { this.setState({readyToExport: true});}

  downloading = (type) => {
    const {downloadChapters, chaptersSelected} = this.props;
    downloadChapters(type, chaptersSelected);
    this.setState({downloading: true});

  }

  cancel = () => { this.setState({downloading: false});}

  goBack =() => {
    this.setState({readyToExport: false});
    this.props.resetSelected();

  }



  render() {
    const { checked, readyToExport, downloading } = this.state;
    const { chaptersSelected, chapters, numbersSelected, location, txt, taskId, downloadInProgress, progress } = this.props;
    const query = QueryString.parse(location.search);

    return (
      <ExportPageContainer>
        <NavBar chapterPage={true} kanban={false} {...this.props} />
        {downloading ? ''
          :
          <HeaderContainer>
            <p>{txt.exportProject}:</p>
            <h1>{query.bookName}</h1>
          </HeaderContainer>
        }
        {readyToExport ? '': <CompletedCheckbox txt={txt} toggleCheck = {this.toggleCheck} checked={checked} /> }

        {this.props.loading?
          <Loading txt={this.props.txt} height= "80vh" marginTop="2vw" />
          :
          downloading ? ''
            :
            <CardsContainer center={readyToExport}>
              {readyToExport ? numbersSelected.map(num => <ChapterSelected number={num} txt={txt} />)
                :
                chapters ? chapters.map((chp, index) => <ExportCard key={index} {...this.props} {...chp} />): ''
              }
            </CardsContainer>
        }

        {readyToExport ? <ExportProject
          getDownloadProgress={getDownloadProgress}
          taskId={taskId}
          progress={progress}
          txt={txt}
          downloadInProgress={downloadInProgress}
          cancel={this.cancel}
          goBack={this.goBack}
          downloading={this.downloading} /> : chaptersSelected? chaptersSelected.length > 0 ? <Footer txt={txt} nextStep={this.nextStep} /> : '' : ''}


      </ExportPageContainer>
    );
  }

}


const ExportPageContainer = styled.div`
    display: flex;
    position:absolute;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: auto;
    min-height: 850px;
    flex-direction: column;
    background-color: #FFF;
    overflow-y: scroll;
`;


const CardsContainer = styled.div`
    height:100%;
    width: 97%;
    flex-wrap: wrap;
    background: #FFF;
    align-self: center;
    display: flex;
    justify-content: ${props => props.center ? 'center': ''}
`;
CardsContainer.displayName = 'CardsContainer';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
  h1{
    margin-top: -15px;
  }
  p{
    font-size: 20px;

  }
`;


const mockup = (
<div>
  <ExportCard number={1} id ={1} {...this.props}  completedSelected={true} published={true} />
  <ExportCard number={2}  id ={2} {...this.props}   completedSelected={true} published={false} />
  <ExportCard number={3}  id ={3} {...this.props}   completedSelected={true} published={true} />
  <ExportCard number={4}  id ={4} {...this.props}   completedSelected={true} published={true} />
  <ExportCard number={5}  id ={5} {...this.props}  completedSelected={true} published={false} />
  <ExportCard number={6}  id ={6} {...this.props}  completedSelected={true} published={true} />
  <ExportCard number={7}  id ={7} {...this.props}   completedSelected={true} published={false} />
  <ExportCard number={8}  id ={8} {...this.props}   completedSelected={true} published={true} />
  <ExportCard number={9}  id ={9} {...this.props}   completedSelected={true} published={true} />
  <ExportCard number={10}  id ={10} {...this.props}  completedSelected={true} published={false} />
  <ExportCard number={11}  id ={11} {...this.props}  completedSelected={true} published={true} /> -->
  </div>
);




const mapDispatchToProps = dispatch => {

  return bindActionCreators({ getChapters, selections, getUserHash, resetSelected, downloadChapters, getDownloadProgress}, dispatch);

};

const mapStateToProps = state => {

  const {chapters, loading} =state.Chapters;
  const { chaptersSelected, numbersSelected, taskId, downloadInProgress, progress } = state.ExportPage;

  const {loggedInUser} =state.user;

  const {txt} = state.geolocation;

  return {chapters, loggedInUser, loading, txt, chaptersSelected, numbersSelected, taskId, downloadInProgress, progress };
};


export default connect(mapStateToProps,mapDispatchToProps)(ExportPage);
