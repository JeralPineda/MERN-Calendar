import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initStore = {};
let store = mockStore(initStore);

// mock del localstorage
Storage.prototype.setItem = jest.fn();

let token = '';

describe('Pruebas en las acciones Auth', () => {
   // inicalizamos todas las acciones que ese store va ejecutar
   beforeEach(() => {
      store = mockStore(initStore);
      jest.clearAllMocks(); //antes de que se ejecute limpiamos todo
   });

   test('startLogin correcto', async () => {
      await store.dispatch(startLogin('jeral@gmail.com', '123456'));

      const actions = store.getActions();

      expect(actions[0]).toEqual({
         type: types.authLogin,
         payload: {
            uid: expect.any(String),
            name: expect.any(String),
         },
      });

      //   Esperamos que se halla guardado el token
      expect(localStorage.setItem).toHaveBeenCalledWith('x-token', expect.any(String));

      //   evaluamos que se halla llamado con la fecha
      expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

      //   Si yo quiero extraer el token que fue llamado, argumento con el cual fue llamado un función de jest
      //   token = localStorage.setItem.mock.calls[0][1]
      //   console.log((token = localStorage.setItem.mock.calls[0][1]));
   });
});
