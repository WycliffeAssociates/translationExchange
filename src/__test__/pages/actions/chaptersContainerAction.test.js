
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllProjects } from '../../../js/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ChaptersContainerAction', () => {
    const store = mockStore();
    it('should behave...', () => {
        
    });

});
