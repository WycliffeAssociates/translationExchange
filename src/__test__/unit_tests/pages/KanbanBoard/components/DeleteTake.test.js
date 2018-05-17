/* global it expect describe*/
import React from 'react';
import DeleteTake from '../../../../../js/pages/KanbanBoard/components/DeleteTake';
import renderer from 'react-test-renderer';



const OriginalDeleteTake = DeleteTake.DecoratedComponent;
const identity = el => el;

describe('DeleteTake DropTarget', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<OriginalDeleteTake connectDropTarget={identity} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
