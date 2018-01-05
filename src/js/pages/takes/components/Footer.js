import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Menu, Button, Icon } from 'semantic-ui-react';
import AudioPlayer from './audioplayer/AudioPlayer';
import 'css/takes.css'
import Draggable from 'react-draggable';
import { resetAudioPlayer } from './../../../actions';


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialWidth: 0,
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        };

        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentWillUnmount() {
        this.props.resetAudioPlayer();
    }

    componentDidMount() {

        this.setState({ initialWidth: this.rangeInput.offsetWidth });
       // window.addEventListener("resize", this.updateDimensions.bind(this));

    }


    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        console.log( ui.deltaX);
        debugger;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    }

    onStart() {

        this.setState({activeDrags: ++this.state.activeDrags});
    }

    onStop() {
        this.setState({activeDrags: --this.state.activeDrags});
    }

    // For controlled component
    adjustXPos(e) {
        debugger;
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;

        this.setState({controlledPosition: {x: x - 10, y}});
    }


    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const maxMovement = this.state.initialWidth * .94 ;
        return (

            <Draggable axis="x" bounds={{left :0, right: maxMovement}}>
                <div className="footerStyle" ref={input => this.rangeInput = input} style={styles.stickyFooter}>
                    {this.props.playlist.length > 0 && this.props.playlistMode
                        ? <div style={{ width: '100%', backgroundColor: 'transparent', height: 20 }}>
                            {this.props.playlist.map((i) => {
                                return (

                                    <Button color='blue'>{i.chunk}</Button>
                                    //<button style={{backgroundColor: 'transparent', color: '3791D5'}} >{i.chunk}</button>
                                );
                            })}
                        </div>
                        : ""
                    }
                    <Menu inverted secondary>
                        {this.props.playlist.length > 0
                            ?

                            <div style={{ width: '100%' }}>
                                <AudioPlayer
                                />
                            </div>

                            : ""
                        }

                    </Menu>
                </div>
            </Draggable>
        );


    }

}


const styles = {
    stickyFooter: {
        width: '100%',
        direction: "ltr",
        backgroundColor: 'transparent',
        position: 'sticky',
        bottom: 0,
        padding: 0,
        textAlign: 'center'

    }

} ;

const mapStateToProps = state => {
    const { playlist, playlistMode, displayPlayer } = state.updatePlaylist;

    return { playlist, playlistMode, displayPlayer };
};

const mapDispatchToProps = dispatch => {

    return bindActionCreators({ resetAudioPlayer }, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(Footer);
