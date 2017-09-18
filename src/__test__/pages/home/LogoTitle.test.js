import React from "react";
import { shallow, render } from "enzyme";
import LogoTitle from "../../../js/pages/home/LogoTitle";

describe("Home Component, LogoTitle", () => {
	const wrapper = shallow(<LogoTitle />);
	it("is rendered", () => {
		expect(wrapper).toHaveLength(1);
	});
});
