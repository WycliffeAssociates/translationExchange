import React, { Component } from "react";
import { connect } from "react-redux";
import MarkAsDone from "./MarkAsDone";
import SetSourceAudio from "./SetSourceAudio";
import RecordButton from "./comments/RecordButton";
import { Grid } from "semantic-ui-react";
import "css/takes.css";

class ChapterHeader extends Component {
	render() {
		return (
			<div style = {{display:'flex', justifyContent: 'space-between'}}>
				<div className="headerStyle">
					<Grid padded columns={2}>
						<Grid.Column width={11} style={{ paddingTop: 23 }}>
							{this.props.book.name} {this.props.displayText.chapter} {this.props.chapter.number} ({this.props.language})
						</Grid.Column>

						<Grid.Column width={5} className="verticalLine">
							<div style = {{display:'flex', justifyContent: 'space-between'}}>
							<MarkAsDone
								chapter={this.props.chapter}
								chunks={this.props.chunks}
								mode={this.props.mode}
								onMarkedAsPublish={this.props.onMarkedAsPublish}
							/>

							<RecordButton
								comments={this.props.chapter.comments}
								onClickSave={this.props.onClickSave}
								id={this.props.chapter.id}
								type={"chapter"}
								deleteComment={this.props.deleteComment}
								loadingActive={this.props.active}
								number={this.props.chapter.number}
								languagefrmAPI={this.props.language}
								onClick={()=> console.log('clicked')}
							/>
							</div>
						</Grid.Column>
					</Grid>
				</div>
				<div className="source">
					<SetSourceAudio
						selectedSourceProject={this.props.selectedSourceProject}
						setSourceProject={this.props.setSourceProject}
						book={this.props.book.slug}
						projectId={this.props.projectId}
					/>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => {

const{ displayText } = state.geolocation;

return{displayText};

};


export default connect (mapStateToProps) (ChapterHeader);
