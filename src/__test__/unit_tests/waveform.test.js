import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import WaveForm from "../../js/pages/takes/components/audioplayer/Waveform";
import Wavesurfer from "react-wavesurfer";

describe.skip("Waveform", () => {
	// it('Crashes when there is not valid audio file', () => {
	//    const src= 5454
	//
	//    expect(() => {
	//      const waveform = mount(<Waveform audioFile={src} />);
	//    }).toThrow();
	//
	//
	//
	// });

	it("Passes through audioFile prop to Wavesurfer", () => {

		const waveform = shallow(<WaveForm audioFile={"something"}  store={store}/>);

		expect(waveform.props().audioFile).toEqual("something");
	});
});
