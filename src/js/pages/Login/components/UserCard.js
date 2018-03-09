import React from 'react';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
//import {Card} from 'semantic-ui-react';
//

export default class UserCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
  }

  componentDidMount() {
    jdenticon.update(`#canvas${this.props.id}` , this.props.hash);
  }

  play() {
    console.log('working')
    this.setState({playing: true})
  }

  ended() {
    this.setState({playing:false})
  }
  render() {
    var key= this.props.id? this.props.id: 0;
    const {recording} = this.props;
    const blob = recording ? recording : {blobUrl:'none'} ;
    console.log(blob)
    return (


      <div className="UserCard">
        <div style={styles.divStyle}>

          <div style={styles.imageDiv}>
            <svg id={`canvas${key}`} style={styles.imgStyle} data-jdenticon-value={this.props.hash} />

          </div>

          <div style={styles.cardOptions}>
            <button onClick={()=> this.play()} style={styles.playButton}> <i className="fa fa-play"  /> </button>
            <button style={styles.signOutButton}> <i className="fa fa-sign-out fa-lg"  /> </button>
            <ReactPlayer url={blob.blobURL} playing={this.state.playing} onEnded={this.ended()}  />
          </div>
        </div>

      </div>
    );
  }

}


const styles= {

  divStyle: {
    textAlign: 'center',
    height: '18vw',
    width: '15vw',
    borderRadius: '20px',
    boxShadow: '3px 4px 5px rgba(0,0,0,0.6)',
    overflow: 'hidden',
    backgroundColor: 'white',


  },

  imageDiv: {
    padding: '1.5vw 0.5vw',

  },

  imgStyle: {
    height: '10vw',
    width: '10vw',

  },

  playButton: {

    color: '#009CFF',
    border: 'none',
    height: '4.75vw',
    width: '7vw',
    marginLeft: '-1vw',
    marginTop: '-0.7vw',
    display: 'inline-block',
    backgroundColor: 'white',
    padding: '1vw 1.5vw',
    fontSize: '2vw', //in the font awesome library the font size ends up controlling the size of the icon
  },

  cardOptions: {

    background: '#009CFF',
    width: 'inherit',
    padding: '1vw',
    overflow: 'hidden',
    textAlign: 'left',
  },

  signOutButton: {
    display: 'inline-block',
    color: 'white',
    border: 'none',
    backgroundColor: '#009CFF',
    height: '3.5vw',
    width: '7vw',
    paddingLeft: '2vw',
    fontSize: '2vw', //in the font awesome library the font size ends up controlling the size of the icon




  },
};
