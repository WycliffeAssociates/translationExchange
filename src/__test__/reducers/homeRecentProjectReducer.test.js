import reducer from "../../js/reducers/HomeRecentProjectsReducer";
describe("Home Recent Projects Reducer", () => {
	it("returns a function", () => {
		expect(typeof reducer).toBe("function");
	});
	it("is defined", () => {
		expect(
			reducer(
				{},
				{
					type: "HOME_RECENT_PROJECTS_RECEIVED",
					payload: ["somedata"]
				}
			)
		).toBeDefined();
	});
});
