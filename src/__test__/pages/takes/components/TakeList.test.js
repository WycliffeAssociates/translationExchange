import React from 'react';
import { shallow } from 'enzyme';
import TakeList from '../../../../js/pages/takes/components/TakeList.js';



describe('Test set rating function', () => {


    const wrapper = shallow(<TakeList />);

    const test = wrapper.instance().onDrop();

    ///console.log(test);

  //  expect(true).toEqual(true);

});
