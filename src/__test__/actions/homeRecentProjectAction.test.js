// it returns a function
// the returned function returns a promise
// mock axios that has mock .post()
// axios.post() is called with mock.apiUrl + "all_projects"
// // axios.post() is called once
// the returned function can be called with a dispatch (mock)

import { fetchRecentProjects } from "../../js/actions/HomeRecentProjectAction";
import axios from "axios";
import config from "../../config/config";

const fakePost = jest.fn(() => {
	return new Promise(() => {
		return new Promise(() => {});
	});
});

jest.mock("axios");

axios.post = fakePost;

describe("fetchRecentProjects", () => {
	describe("returned value", () => {
		it("is a function", () => {
			var result = fetchRecentProjects();
			expect(typeof result).toBe("function");
		});

		it("returns a promise", () => {
			const returnedFunction = fetchRecentProjects();
			const result = returnedFunction();
			expect(typeof result.then).toBe("function");
		});
	});
	it('is called with following parameter :config.apiUrl + "all_projects/,{}"', () => {
		expect(fakePost).toBeCalledWith(config.apiUrl + "all_projects/", {});
		expect(fakePost.mock.calls.length).toBe(1);
	});
});
