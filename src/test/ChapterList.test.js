import React from 'react'
import TestUtils from 'react-dom/test-utils'
import ChapterList from "../js/pages/chapters/components/ChapterList";

describe('Chapter List Tests', () => {

    it('is importable', () => {
        expect(ChapterList).toBeDefined()
    })

    it('instantiate object', () => {
        const chapList = new ChapterList()
        expect(typeof chapList.parseDate).toBe("function")
    })

    it('parseDate Test', () => {
        var testPath = "~/Desktop/Test"
        var testChapters = [{
            id : 1,
            chapter : 2,
            percent_complete : 45,
            checked_level : 2,
            is_publish : true,
            contributors : ["Juan"],
            date_modified : "2017-07-28T20:36:50.787372Z"
        }]
        var chapList = TestUtils.renderIntoDocument(<ChapterList path={testPath} chapters={testChapters}/>)
        var newDate = chapList.parseDate(testChapters[0].date_modified)
        expect(newDate).toBe("July 28, 2017 at 8:36pm")
    })

    it('handles errors related with improper date fields', () => {
        //this test verifies whether the function 'parseDate'
        //has error handling capabilities
        var testPath = "~/Desktop/Test"
        var testChapters = [{
            id : 1,
            chapter : 2,
            percent_complete : 45,
            checked_level : 2,
            is_publish : true,
            contributors : ["Juan"],
            date_modified : "2017-July-32T20:36:50.787372Z"
        }]
        var chapList = TestUtils.renderIntoDocument(<ChapterList path={testPath} chapters={testChapters}/>)
        expect(function() {chapList.parseDate(testChapters[0].date_modified)}).toThrow()
    })
})