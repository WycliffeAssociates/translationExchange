import React from "react";
import { shallow, render } from "enzyme";
//import LogoTitle from "../../../js/pages/home/LogoTitle";
import LogoTitle from "../../../../js/pages/home/LogoTitle";
import toJson from 'enzyme-to-json';

describe("Home Component, LogoTitle", () => {
	const wrapper = shallow(<LogoTitle />);
	const tree = toJson(wrapper);
	it("is rendered", () => {
		expect(wrapper).toHaveLength(1);
	});

	it('has no changes', () => {
		expect(tree).toMatchSnapshot();
	});
});
