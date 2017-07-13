import React, {Component} from 'react'
import Audio from 'translation-audio-player'

// requires a name (str) and src (str) when it is called
// name : name to display on take
// src  : url of file to be played in audio player
import CommentContainer from './comments/CommentContainer'

import * as ReactDOM from "react-dom";


import onClick from './comments/CommentContainer'



// requires a name (str) and src (str) when it is called
// name : name to display on take
// src  : url of file to be played in audio player

class AudioComponent extends Component {

    constructor(props){

        super(props);

        this.state = {
            RecordComponent: false,
            show : false,
            pause: false
        };

    }



    onClick = () => {                         // used when you click the microphone button in the player

        this.commentContainer.showModal();
        ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-pause'));


    }




    render() {

        var file = [];
        file[0] = {
            "name": this.props.name,
            "src": this.props.src
        }

        const pause = this.state.pause;
        console.log(pause);

        return(
            <div>
                <Audio

                    width={this.props.width}
                    height={150}
                    autoPlay={false}
                    playlist={file}
                    recordButton={() => {
                        this.onClick()

                    }}

                    // ref to pause the audio
                    ref={audioComponent => { this.audioComponent = audioComponent; }}

                />

                {/*used ref to call a method in child class and instance*/}
                <CommentContainer ref={instance => (this.commentContainer = instance)}/>



            </div>


        );
    }
}






export default AudioComponent