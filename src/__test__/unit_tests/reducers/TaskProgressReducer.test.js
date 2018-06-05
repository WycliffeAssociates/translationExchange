/* global expect describe it */
import reducer from '../../../js/reducers/TaskProgressReducer';

describe('TaskProgressReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      tasks: [],
    });
  });

  it('should handle FETCH_TASKS_SUCCESS', () => {
    expect(reducer([],{
      type: 'FETCH_TASKS_SUCCESS',
      tasks: ['array of tasks', 'task2', 'task3'],
    })).toEqual({
      tasks: ['array of tasks', 'task2', 'task3'],
    });
  });

});
