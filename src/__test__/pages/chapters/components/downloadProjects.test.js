import React from 'react';
import { shallow } from 'enzyme';
import DownloadProjects from '../../../../js/pages/chapters/components/DownloadProjects';

describe('DownloadProjects', () => {
    const wrapper = shallow(<DownloadProjects />);
    const initialState = {
        loading: false
    };
    it('renders', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('has initial state', () => {
        expect(wrapper.instance().state).toEqual(initialState);
    });

    it('is defined', () => {
        expect(wrapper.instance().onDownloadProject).toBeDefined();
    });

    it('is defined', () => {
        expect(wrapper.find('Button')).toBeDefined();
    });

it('has property,click', () => {
    expect(wrapper.find('Button').simulate('clcik')).toHaveLength(1);
});


});
