import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initStore = {};
let store = mockStore(initStore);

describe('Pruebas en las acciones Auth', () => {
   test('', () => {
      // inicalizamos todas las acciones que ese store va ejecutar
      beforeEach(() => {
         store = mockStore(initStore);
      });
   });
});
