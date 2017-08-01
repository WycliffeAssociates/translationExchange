import React, {Component} from 'react';
import TakePropTypes from "./components/TakePropTypes";
import Take from "./components/Take";


class TakeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            ratingLoading: false
        };
    }

    onMarkedForExportToggled() {
        let markedForExport = !this.props.take.take.is_publish;
        this.props.patchTake(this.props.take.take.id,
            {is_publish: markedForExport},
            (updatedTake) => { //success callback
                if (markedForExport) {
                    this.props.updateChosenTakeForChunk(updatedTake.id);
                }
            });
    }

    onRatingSet(newRating) {
        this.setState({ratingLoading: true});
        this.props.patchTake(this.props.take.take.id,
            {rating: newRating},
            () => {
                this.setState({ratingLoading: false});
            });
    }

    onDeleteTake() {
        this.props.deleteTake(this.props.take.take.id);
    }

    render() {

        return (
            <Take count={this.props.count}
                  take={this.props.take.take}
                  author={this.props.take.user}
                  chunkNumber={this.props.chunkNumber}
                  ratingLoading={this.state.ratingLoading}
                  onRatingSet={this.onRatingSet.bind(this)}
                  onMarkedForExportToggled={this.onMarkedForExportToggled.bind(this)}
                  source={this.props.source}
                  comments={this.props.take.comments}
                  addToListenList={this.props.addToListenList}
                  onDeleteTake={this.onDeleteTake.bind(this)}
                  onClickSave={this.props.onClickSave}
                  deleteComment={this.props.deleteComment}
                  playTake={this.props.playTake}
                  active={this.props.active}
                  mode={this.props.mode}
            />
            //other events that require requesting the server would go here
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;