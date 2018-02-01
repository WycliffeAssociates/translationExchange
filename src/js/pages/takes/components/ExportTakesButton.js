import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { browserHistory } from 'react-router'
import CommentsPlayer from '../components/comments/commentsPlayer.js'
import config from "config/config";
import { notify } from "react-notify-toast";
import {
	markedAsPublished,
	getTakesToExport
} from "../../../actions";

// this is the page for one chapter

class ExportTakesButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            playList: [],
            pointer: 0,

        };
        this.playNext = this.playNext.bind(this);
    }

		componentWillMount(){
			const published = this.props.chapter.published;
			const {chapterId} = this.props;
			if(published){
				this.props.getTakesToExport(chapterId);
			}
		}


    createExportPlaylist() {
        let length = this.props.chunks.length;
        const {takes, takesToExport, chunks} = this.props;

				let selectedTakes = takes;
				 if(takes.length < chunks.length ){
					selectedTakes = takesToExport;
				 }


        let playlist = [];
        let i=0;
        selectedTakes.map((take) => {
                    if(take.published) {
                        playlist.push({
                                "src": config.streamingUrl + take.location,
                                "name": this.props.mode.name + ' ' + this.props.chunks[i].startv + ' (' + (playlist.length + 1) + '/' + length + ')'
                            }
                        );
                        i++;
                    }
                return null; // added to satisfy warning of return expected on arrow function
                }

        );
          return playlist

    }

    finishExportingChapter() {
        const {chapterId} = this.props;
        this.props.markedAsPublished(() => {
            this.handleClose();
        }, chapterId, true);
    }

    handleOpen = () => {
        const playList = this.createExportPlaylist();
        this.setState({ playList, modalOpen: true });
    }

    handleClose = () => {
			this.setState({ modalOpen: false })
			

		};

    playNext(check) {
        if (check) {
            const playlistLength = this.state.playList.length;
            const pointer = this.state.pointer;

            if (playlistLength > 1 && pointer < playlistLength - 1) {
                this.setState({ pointer: this.state.pointer + 1 });

            } else {
                this.setState({ pointer: 0 })
            }
        }
    }



    audioPlayer() {
        if (this.state.modalOpen) {
            return (
                <div style={{ display: 'flex' }}>
                    <div style={styles.audioPlayer}>
                        <CommentsPlayer
                            audioFile={this.state.playList[this.state.pointer].src}
                            playNext={this.playNext}
                            loop={true}
                            pointer={this.state.pointer}
                            length={this.state.playList.length}
                        />
                    </div>
                    <div style={styles.nameContainer}>
                        {this.state.playList[this.state.pointer].name}
                    </div>
                </div>);
        }
        else {
            return ''
        }
    }


    exportButton() {
      let enableBtn = this.props.chapter.published;
			const {takes, chunks} = this.props;


       if(takes.length >= chunks.length ){
         let takesPublishedChunkId = [];
         takes.map(tk => {
            if(tk.published){
              takesPublishedChunkId.push(tk.chunkId);           // create a list of all the published takes
            }
            return null; // added to satisfy warning of return expected on arrow function
                });

       const checkPublishedStatus =  chunks.map(chnk => {                       //check every chunk to see if it contains a published take
                       if( takesPublishedChunkId.includes(chnk.id)){
                          return true;
                       }else{
                       		return false;
                       }
             });

       enableBtn = checkPublishedStatus.every(val => val ===true);              // verify all the published takes
			 }


        return( <Button onClick={this.handleOpen}
                color={"green"}
                disabled={!enableBtn}
                className="icon"
                icon="share"
                floated="right">
                <Icon color="white" name="sidebar" />
            </Button> );
    }


    render() {

        return (
            <Modal trigger={this.exportButton()}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon="close">
                <Modal.Header style={styles.modal}>You are ready to mark Chapter {this.props.chapterNum} as finished!</Modal.Header>
                <Modal.Content style={styles.modal}>
                    <Modal.Description style={styles.modal}>
                        <p>Here is a preview of the takes you have selected to export. This may take a few seconds to
                                load.</p>
                            <p>To mark as done, click on 'Finish'.</p>
                             {this.state.playList.length > 0 ? this.audioPlayer() : ''}

                        </Modal.Description>

                    </Modal.Content>
                    <Modal.Actions>
                        {/*this button will do a call to database to change chapter.exportready to true */}
                        <Button content="Finish" onClick={this.finishExportingChapter.bind(this)} />

                    </Modal.Actions>
                </Modal>
                );
    }
}



const styles = {
    modal: {
        backgroundColor: '#000',
        color: '#fff'

    },
    audioPlayer: {
        border: '1px solid white',
        borderRadius: 5,
        display: 'inline-block',
        width: '80%'
    },
    nameContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'

    }
}


const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{	markedAsPublished,
			getTakesToExport
		}, dispatch);
};


const mapStateToProps = state => {
    const { takes, chapterId, takesToExport } = state.chunkListContainer;

  return{ takes, chapterId, takesToExport }
}


export default connect(mapStateToProps, mapDispatchToProps) (ExportTakesButton);
