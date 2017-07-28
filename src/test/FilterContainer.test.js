import React from 'react'
import FilterContainer from '../js/pages/projects/FilterContainer'
import TestUtils from 'react-dom/test-utils'

describe('Filter Container', () => {
    it('is importable', () => {
        expect(FilterContainer).toBeDefined()
    })

    it('instantiate object', () => {
        const filCont = new FilterContainer()
        expect(typeof filCont.getFiltersFromProjects).toBe("function")
    })

    it('gets filters from project', async () => {
        var filCont = TestUtils.renderIntoDocument(<FilterContainer />)
        const fakeProjectData = {
            language :[
                {
                    slug: 'tst',
                    name: 'Testing'
                }
            ],

            book : [
                {
                    slug : 'tst',
                    name : 'Nick'
                }
            ],

            version : 'esv'
        }
        await filCont.getFiltersFromProjects(fakeProjectData)
        expect(filCont.state.loaded).toBe(true)
        expect(filCont.state.language[0].slug).toBe("")
    })

})