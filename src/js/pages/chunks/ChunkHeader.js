import React, { Component } from "react";
import ExportTakesButton from "../takes/components/ExportTakesButton";
import SetSourceAudio from "../takes/components/SetSourceAudio";
import RecordButton from "../takes/components/comments/RecordButton";
import { Grid } from "semantic-ui-react";
import "css/takes.css";

class ChunkHeader extends Component {
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
							<ExportTakesButton
								chapter={this.props.chapter}
								chunks={this.props.chunks}
								mode={this.props.mode}
								chapterNum = {this.props.chapterNum}
							/>

							<RecordButton
								comments={this.props.chapter.comment}
								onClickSave={this.props.onClickSave}
								id={this.props.chapter.id}
								type={"chapter"}
								deleteComment={this.props.deleteComment}
								loadingActive={this.props.active}
								number={this.props.chapter.number}
								languagefrmAPI={this.props.language}
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
export default ChunkHeader;
