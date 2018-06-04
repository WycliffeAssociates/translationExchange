/* global describe it expect jest*/  /* eslint indent:[1, "tab", {SwitchCase: 1}]*/
import React from 'react';
import { shallow } from 'enzyme';
import Marker from '../../../../../../js/pages/takes/components/audioplayer/Markers';

describe('Marker', () => {
	it('postions the svg element correctly', () => {
		const position = 50;
		const marker = shallow(<Marker translate={position} text={'123'} />);
		const label = marker.find('label');

		const labelPosition = label.props().style.marginLeft;

		expect(labelPosition).toEqual('44%');
	});

	it('calls dragPosition prop when label is clicked', () => {
		const mockDragPosition = jest.fn();
		const marker = shallow(
			<Marker dragPosition={mockDragPosition} text={'fakeText'} />
		);

		marker.find('label').simulate('click');

		expect(mockDragPosition.mock.calls.length).toBe(1);
	});
});
