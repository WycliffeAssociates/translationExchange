import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import {selections, getChapters, getUserHash, selectedNumbers} from '../../actions';
import ExportCard from './components/ExportCard';
import Footer from './components/Footer';
import styled from 'styled-components';
import 'css/takes.css';





export class ExportPage extends Component {

  constructor(props) {
    super(props);
    this.state= {checked: null}
  }

  componentWillMount() {
    this.props.getChapters(1);
  }

  toggleCheck = () => {
    this.setState({checked: !this.state.checked});
  }

  render() {
    const { checked } = this.state;
    const { chaptersSelected, selections } = this.props;

    return (
      <ExportPageContainer>
        <NavBar chapterPage={true} kanban={false} {...this.props} />
        <HeaderContainer>
          <p>Export Project:</p>
          <h1>Genesis</h1>
        </HeaderContainer>
        <ButtonContainer>
          <CompletedButton checked={checked}>
            <CheckBox checked={checked} onClick={this.toggleCheck}>
              {checked ? <i class="material-icons">done</i> : ''}
              <input id="checkBox" type="checkbox" checked={checked}  />
            </CheckBox>
            completed
            <i class="material-icons">done</i>
          </CompletedButton>
        </ButtonContainer>

        {this.props.loading?
          <Loading txt={this.props.txt} height= "80vh" marginTop="5vw" />
          :

          <CardsContainer>
            {/* { chapters ? chapters.map(chp => <ExportCard {...chp} />): ''} */}
            <ExportCard number={1} id ={1} {...this.props}  completedSelected={checked} published={true} />
            <ExportCard number={2}  id ={2} {...this.props}   completedSelected={checked} published={false} />
            <ExportCard number={3}  id ={3} {...this.props}   completedSelected={checked} published={true} />
            <ExportCard number={4}  id ={4} {...this.props}   completedSelected={checked} published={true} />
            <ExportCard number={5}  id ={5} {...this.props}  completedSelected={checked} published={false} />
            <ExportCard number={6}  id ={6} {...this.props}  completedSelected={checked} published={true} />
            <ExportCard number={7}  id ={7} {...this.props}   completedSelected={checked} published={false} />
            <ExportCard number={8}  id ={8} {...this.props}   completedSelected={checked} published={true} />
            <ExportCard number={9}  id ={9} {...this.props}   completedSelected={checked} published={true} />
            <ExportCard number={10}  id ={10} {...this.props}  completedSelected={checked} published={false} />
            <ExportCard number={11}  id ={11} {...this.props}  completedSelected={checked} published={true} />



          </CardsContainer>


        }

        {chaptersSelected? chaptersSelected.length > 0 ? <Footer /> : '' : ''}


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


const ButtonContainer = styled.div`

`;

const CardsContainer = styled.div`
    height:100%;
    width: 97%;
    flex-wrap: wrap;
    background: #FFF;
    align-self: center;
    display: flex;
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


const DownloadBar = styled.div`
  width: 100vw;
  height: auto;
  background:#2D2D2D;
  position: absolute;
  top: 11vh;
  display: flex;
  padding: 0.5vh;
  flex-direction: column;
  z-index: 99;

`;
DownloadBar.displayName = 'DownloadBar';


const CompletedButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.2);
  text-align: center;
  height: 60px;
  width: 214px;
  border-radius: 1px;
  overflow: hidden;
  margin: 20px 20px 20px 35px;
  font-size: 16px;
  `;


const CheckBox = styled.span`
   display: inline-block;
   position: relative;
   top: 3px;
   width: 18px;
   height: 18px;
   margin: -1px 0px 0 0;
   vertical-align: middle;
   background: ${props => props.checked ? '#43B52F' :'#FFF' };
   border:${props => props.checked ? '2px solid #43B52F' :'2px solid #707070' };
   cursor: pointer;
   border-radius: 3px;

    input{
      display:none;
    }

    i{
      font-size: 18px;
      position: absolute;
      left:-2px;
      top: -2px;
      color: ${props => props.checked ? '#FFF' :'#EEEEEE' };
    }

  `;


const mapDispatchToProps = dispatch => {

  return bindActionCreators({ getChapters, selections, getUserHash, selectedNumbers}, dispatch);

};

const mapStateToProps = state => {

  const {chapters, loading} =state.Chapters;
  const { chaptersSelected } = state.ExportPage;

  const {loggedInUser} =state.user;

  const {txt} = state.geolocation;

  return {chapters, loggedInUser, loading, txt, chaptersSelected};
};


export default connect(mapStateToProps,mapDispatchToProps)(ExportPage);
