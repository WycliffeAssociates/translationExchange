import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
//import Marker from "../js/pages/takes/components/audioplayer/Markers";
import Marker from "../../js/pages/takes/components/audioplayer/Markers";
import Adapter from 'enzyme-adapter-react-15';

describe("Marker", () => {
	it("postions the svg element correctly", () => {
		const position = 2343423;
		const marker = shallow(<Marker translate={position} text={"123"} />);
		const svg = marker.find("svg");

		const svgPosition = svg.props().style.left;

		expect(svgPosition).toEqual(position);
	});

	it("calls dragPosition prop when svg is clicked", () => {
		const mockDragPosition = jest.fn();
		const marker = shallow(
			<Marker dragPosition={mockDragPosition} text={"fakeText"} />
		);

		marker.find("svg").simulate("click");

		expect(mockDragPosition.mock.calls.length).toBe(1);
	});
});
