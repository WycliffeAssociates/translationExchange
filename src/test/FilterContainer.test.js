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
        const fakeProjectData = [{
            language :
                {
                    slug: 'tst',
                    name: 'Testing'
                },

            book :
                {
                    slug: 'tst',
                    name: 'Nick'
                },

            version : 'esv'
        }]
        await filCont.getFiltersFromProjects(fakeProjectData)
        expect(filCont.state.loaded).toBe(true)
        expect(filCont.state.languages[0].key).toBe('tst')
        expect(filCont.state.books[0].key).toBe('tst')
        expect(filCont.state.versions[0].key).toBe('esv')
    })

    it('errors are thrown when invalid data is passed', async () => {
        //this test verifies whether the function 'getFiltersFromProjects'
        //has error handling capabilities
        var filCont = TestUtils.renderIntoDocument(<FilterContainer />)
        const badData = [{
            speech :{
                slug : 'english',
                name : 'eng'
            },

            novel : {
              slug : 'none',
              name : 'Test'
            },

            version : 'esv'
        }]
        await expect(function() {filCont.getFiltersFromProjects(badData)}).toThrow("Error: Improper Data")
    })
})