import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Redirect from "react-router-dom/es/Redirect";
import CircularProgressbar from 'react-circular-progressbar'
import {Table} from 'semantic-ui-react'
import 'css/chapters.css'
import CheckingLevel from "./CheckingLevel"
import ProjectContainer from "../ProjectContainer";
import axios from 'axios';
var bookTest;

class ChapterList extends Component {

    render () {

        return (

        <Table.Body>
            {this.props.chapters.map(this.createListItem.bind(this))}
        </Table.Body>

        );
    }

    createListItem (chapter) {
        return (

                <Table.Row onClick={() => this.props.navigateToChapter(chapter.chapter)} >

            <Table.Cell>{chapter.chapter}</Table.Cell>
            <Table.Cell><CircularProgressbar strokeWidth="20" percentage={chapter.percent_complete}/></Table.Cell>
            <Table.Cell className="dont-hide-overflow"><CheckingLevel num={chapter.checked_level}
                                                                      setCheckingLevel={this.props.setCheckingLevel}/></Table.Cell>
                <Table.Cell>{chapter.contributors}</Table.Cell>
                <Table.Cell>{this.props.version}</Table.Cell>
                <Table.Cell>{this.parseDate(chapter.timestamp)}</Table.Cell>
            </Table.Row>

        );
    }

    // getCheckingLevel(level){
    //     let params = {
    //         filter: {
    //             language: this.props.language,
    //             book: this.props.book,
    //             version: this.props.version,
    //             chapter: this.props.chapters
    //         },
    //         fields: {
    //             checked_level: level
    //         }
    //     };
    //
    //     axios.post("http://172.19.145.91:8000/api/update_project/", params);
    // }



//{chapter.checked_level /*this is the checking level*/}        //{chapter.checked_level}

    parseDate(date) {

        var noon = 'am';
        var dateArr = date.split('T');
        var date = dateArr[0]

        var time = dateArr[1].split('.')
        time = time[0].split(':')
        date = date.split('-')
        switch (date[1]) {
            case '01': date[1] = 'January';
                break;
            case '02': date[1] = 'February';
                break;
            case '03': date[1] = 'March';
                break;
            case '04': date[1] = 'April';
                break;
            case '05': date[1] = 'May';
                break;
            case '06': date[1] = 'June';
                break;
            case '07': date[1] = 'July';
                break;
            case '08': date[1] = 'August';
                break;
            case '09': date[1] = 'September';
                break;
            case '10': date[1] = 'October';
                break;
            case '11': date[1] = 'November';
                break;
            case '12': date[1] = 'December';
                break;
        }

        var hour = parseInt(time[0])
        if((hour / 12) > -1)
        {noon = 'pm'}

        if(!((hour % 12) === 0))
        {hour %= 12}

        return (date[1] + ' ' + date[2] + ', ' +  date[0] + ' at ' + hour + ':' + time[1] + noon);
    }

}

ChapterList.propTypes = {
    book: PropTypes.arrayOf(PropTypes.shape()),
    language: PropTypes.arrayOf(PropTypes.shape()),
    version: PropTypes.arrayOf(PropTypes.shape()),
    chapters: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
        percentFinished: PropTypes.number.isRequired,
        checkingLevel: PropTypes.number.isRequired,
        contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
        timestamp: PropTypes.string.isRequired
    })).isRequired,
    path: PropTypes.string.isRequired
};

export default ChapterList;