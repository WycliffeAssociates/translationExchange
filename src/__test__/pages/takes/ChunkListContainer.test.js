import React from 'react';
import { shallow } from 'enzyme';
import ChunkListContainer from '../../../js/pages/chunks/ChunkListContainer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('ChunkListContainer', () => {
    
    const store = mockStore({
        geolocation: {},
        direction: {},
        chunkListContainer: {}
    });

    const wrapper = shallow(<ChunkListContainer store={store} />);
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
});
