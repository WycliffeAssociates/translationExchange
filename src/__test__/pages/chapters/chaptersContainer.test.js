import React from "react";
import { shallow,mount } from "enzyme";
import ChaptersContainer from "../../../js/pages/chapters/ChaptersContainer";

describe("ChaptersContainer", () => {
	const wrapper = shallow(<ChaptersContainer />);
	const initialState = {
		chapters: [],
		book: {},
		language: {},
		project_id: -1,
		is_publish: false,
		filesData: null,
		loaded: false,
		error: "",
		publishError: "",
		downloadError: "",
		downloadSuccess: "",
		anthology: {},
		downloadLoading: false,
		version: {}
	};
	it("renders", () => {
		expect(wrapper).toHaveLength(1);
	});
	it("has initial state", () => {

		expect(wrapper.instance().state).toEqual(initialState);
	});

	it('is defined', () => {
		expect(wrapper.instance().publishFiles).toBeDefined();
	});

	it('changes state', () => {
		wrapper.instance().setState({ is_publish: true });
		expect(wrapper.instance().state).not.toEqual(initialState);
	});

	it('is defined', () => {
		expect(wrapper.instance().onDownloadProject).toBeDefined();
	});
	
	it('changes state', () => {
		wrapper.instance().onDownloadProject();
		expect(wrapper.instance().state.downloadLoading).toBeTruthy();
		expect(wrapper.instance().state.downloadError).toEqual('');
		expect(wrapper.instance().state.downloadSuccess).toEqual('');
	});
	
	it('is defined', () => {
		const wrapper=mount(<ChaptersContainer location={''}/>);
		expect(wrapper.find('DownloadTR')).toBeDefined();
		expect(wrapper.find('PublishButton')).toBeDefined();
		expect(wrapper.find('DownloadProjects')).toBeDefined();
	});
	
});
