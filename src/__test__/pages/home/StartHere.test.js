import { shallow, mount, render } from "enzyme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import StartHere from "../../../js/pages/home/StartHere";
import toJson from 'enzyme-to-json';

describe("Home Component, StartHere", () => {
	const wrapper = shallow(<StartHere />);
	const tree = toJson(wrapper);
	
	it("is rendered", () => {
		expect(wrapper).toHaveLength(1);
	});
	it("has class, start-here", () => {
		expect(wrapper.hasClass("start-here")).toBe(true);
	});
	it("navigates to project page", () => {
		expect(wrapper.find("Link").props().to).toEqual("/projects");
	});
	it('has no changes', () => {
		expect(tree).toMatchSnapshot();
	});
});
