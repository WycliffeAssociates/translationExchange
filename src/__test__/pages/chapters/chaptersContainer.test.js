import React from 'react';
import { shallow } from 'enzyme';
import ChaptersContainer from '../../../js/pages/chapters/ChaptersContainer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('ChaptersContainer', () => {
    const store = mockStore({
        geolocation: {},
        chaptersContainer: {
        }
    });
    const wrapper = shallow(<ChaptersContainer store={store} />);
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });

});
