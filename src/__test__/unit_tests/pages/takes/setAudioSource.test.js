import React from 'react'
import { shallow } from 'enzyme'
import SetAudioSource from '../../../../js/pages/takes/components/SetSourceAudio'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('SetAudioSource', () => {
    const store = mockStore({
        sourceAudio: {}
    });
    const wrapper = shallow(<SetAudioSource store={store} />);
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
});
