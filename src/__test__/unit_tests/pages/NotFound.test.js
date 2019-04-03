/* global it expect describe*/
import React from 'react';
import NotFound from '../../../js/pages/NotFound';
import renderer from 'react-test-renderer';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory('/notexist');

describe('NotFound Page', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Router history={history}>
        <div> <NotFound  />
        </div>
      </Router>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
