import React from 'react';
import { shallow } from 'enzyme';
import ChunkListContainer from '../../../js/pages/takes/ChunkListContainer';

describe('ChunkListContainer', () => {
    const store = mockStore({
        geolocation: {},
        direction: {},
        chunkListContainer: {}
    });

    const wrapper = shallow(<ChunkListContainer store={store} />);
    it('should render', () => {

    });

});
