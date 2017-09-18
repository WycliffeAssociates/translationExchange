import React from "react";
import { shallow, render } from "enzyme";
import Home from "../../../js/pages/home/home";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("Home Component, home", () => {
	const store = mockStore();
	const wrapper = shallow(<Home store={store} />);
	it("is rendered", () => {
		expect(wrapper).toHaveLength(1);
	});
});
