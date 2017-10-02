import React, { Component } from "react";
import MarkAsDone from "./MarkAsDone";
import SetSourceAudio from "./SetSourceAudio";
import PinkButton from "./comments/PinkButton";
import { Grid } from "semantic-ui-react";
import "css/takes.css";

class ChapterHeader extends Component {
	render() {
		return (
			<div>
				<div className="headerStyle">
					<Grid padded columns={2}>
						<Grid.Column width={11} style={{ paddingTop: 23 }}>
							{this.props.book.name} Chapter {this.props.chapter.number} ({this.props.language})
						</Grid.Column>

						<Grid.Column width={5} className="verticalLine">
							<MarkAsDone
								chapter={this.props.chapter}
								chunks={this.props.chunks}
								mode={this.props.mode}
								onMarkedAsPublish={this.props.onMarkedAsPublish}
							/>

							<PinkButton
								comments={this.props.chapter.comments}
								onClickSave={this.props.onClickSave}
								id={this.props.chapter.id}
								type={"chapter"}
								deleteComment={this.props.deleteComment}
								loadingActive={this.props.active}
								number={this.props.chapter.number}
								language={this.props.language}
							/>
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

export default ChapterHeader;
