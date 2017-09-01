import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AudioPlayer from '../js/pages/takes/components/audioplayer/AudioPlayer';


describe('Audio Player', () => {


    describe('render', () => {
        it('check the marker position', () => {

          const position = (2055736 / 44100) / (50)) * 1669;


            const marker = shallow(<Marker
              translate={position}
              text={key}

            />);
            const time = <span className="clock-text">01:03</span>;

            expect(clock.contains(time)).toEqual(true);
        });
    });
    //
    // describe('formatTime', () => {
    //     it('should format seconds', () => {
    //         const clock = shallow(<Clock/>);
    //         const seconds = 635;
    //         const expected = '10:35';
    //         const actual = clock.instance().formatTime(seconds);
    //
    //         expect(actual).toBe(expected);
    //     });
    //
    //     it('should format seconds when minutes or seconds are less than 10', () => {
    //         const clock = shallow(<Clock/>);
    //         const seconds = 65;
    //         const expected = '01:05';
    //         const actual = clock.instance().formatTime(seconds);
    //
    //         expect(actual).toBe(expected);
    //     });
    // });
});
