import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import {selections, getChapters, getUserHash, resetSelected, downloadChapters, getDownloadProgress, removeUser} from '../../actions';
import {ExportCard, CompletedCheckbox, SelectAllCheckbox, Footer, ChapterSelected, ExportProject} from './components';
import styled from 'styled-components';
import QueryString from 'query-string';



export class ExportPage extends Component {

  constructor(props) {
    super(props);
    this.state= {
      checked: false,
      checkedAll: false,
      readyToExport: false,
      downloading: false,
      chapterComplete: 0,
    };
  }

  componentWillMount() {
    const {location, getChapters} = this.props;
    const query = QueryString.parse(location.search);
    getChapters(query.projectId);
  }

  componentWillUnmount() {
    this.props.resetSelected();
  }

  toggleCheck = () => { 
    this.setState( prevState => ({checked: !prevState.checked, checkedAll: false}));
  }

  toggleCheckAll = () => { 
    this.setState( prevState => ({checkedAll: !prevState.checkedAll, checked: false}));
  }

  nextStep = () => { this.setState({readyToExport: true});}

  downloading = (type) => {
    const {downloadChapters, chaptersSelected} = this.props;
    downloadChapters(type, chaptersSelected);
    this.setState({downloading: true});
  }

  cancel = () => { this.setState({downloading: false});}

  goBack =() => {
    this.setState({
      readyToExport: false, 
      checked: false, 
      checkedAll: false});
    this.props.resetSelected();

  }

  chapterComplete = () => {
    this.setState({chapterComplete: this.state.chapterComplete + 1});
  }



  render() {
    const { checked, checkedAll, readyToExport, downloading, chapterComplete } = this.state;
    const { chaptersSelected, chapters, location, txt, taskId, resetSelected } = this.props;
    const query = QueryString.parse(location.search);

    return (
      <ExportPageContainer addMargin = {checked || checkedAll}>
        <NavBar chapterPage={false} kanban={false} {...this.props} />
        {downloading ? ''
          :
          <HeaderContainer>
            <p>{txt.get("downloadProject")}:</p>
            <h1>{query.bookName}</h1>
          </HeaderContainer>
        }
        {readyToExport ? ''
          : 
          <CheckboxContainer>
            <CompletedCheckbox chapterComplete={chapterComplete} txt={txt} toggleCheck = {this.toggleCheck} checked={checked} />
            <SelectAllCheckbox txt={txt} toggleCheck = {this.toggleCheckAll} checked={checkedAll} />
          </CheckboxContainer>
        }

        {this.props.loading?
          <Loading txt={this.props.txt} height= "80vh" marginTop="2vw" />
          :
          downloading ? ''
            :
            <CardsContainer center={readyToExport}>
              {readyToExport ? <ChapterSelected number={chaptersSelected.length} txt={txt} />
                :
                chapters ? chapters.map((chp, index) => <ExportCard chapterComplete={this.chapterComplete} checked={checked} checkedAll={checkedAll} key={index} {...this.props} {...chp} />): ''
              }
            </CardsContainer>
        }

        {readyToExport ? <ExportProject
          getDownloadProgress={getDownloadProgress}
          taskId={taskId}
          resetSelected={resetSelected}
          txt={txt}
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
    height: 100%;
    flex-direction: column;
    background-color: #FFF;
`;

ExportPageContainer.displayName ='ExportPageContainer';


const CardsContainer = styled.div`
  padding-bottom: 100px;
    width: 97%;
    height: auto;
    flex-wrap: wrap;
    background: #FFF;
    align-self: center;
    display: flex;
    overflow-y: scroll;
    justify-content: ${props => props.center ? 'center': ''}
`;
CardsContainer.displayName = 'CardsContainer';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
  z-index: 2;
  h1{
    margin-top: -15px;
  }
  p{
    font-size: 20px;

  }
`;

HeaderContainer.displayName= 'HeaderContainer';

const CheckboxContainer = styled.div`
    display: flex;
    width: 100%;
`;

CheckboxContainer.displayName ='CheckboxContainer';

const mapDispatchToProps = dispatch => {

  return bindActionCreators({ getChapters,
    selections, getUserHash, resetSelected,
    downloadChapters, getDownloadProgress, removeUser}, dispatch);

};

const mapStateToProps = state => {

  const {chapters, loading} =state.Chapters;
  const { chaptersSelected, numbersSelected, taskId} = state.ExportPage;

  const {loggedInUser} =state.user;

  const {txt} = state.geolocation;

  return {chapters, loggedInUser, loading, txt, chaptersSelected, numbersSelected, taskId };
};


export default connect(mapStateToProps,mapDispatchToProps)(ExportPage);
