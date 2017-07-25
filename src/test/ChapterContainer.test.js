import React from 'react'
import TestUtils from 'react-addons'
import ChapterContainer from "../js/pages/takes/ChapterContainer";

describe('findStartVerses', () => {

    it('should return an array', () => {
        var container = TestUtils.renderIntoDocument(<ChapterContainer/>)
        var NewArray = container.findStartVerses(container.state)
        expect(NewArray.length).toBe(1)
    })
})