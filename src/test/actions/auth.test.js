import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

// mock para asegurarnos que el sweetalert se halla llamado
jest.mock('sweetalert2', () => ({
   fire: jest.fn(),
}));

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

   test('startLogin incorrecto', async () => {
      await store.dispatch(startLogin('jera@gmail.com', '123456'));
      let actions = store.getActions();

      expect(actions).toEqual([]);

      expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario o la contraseña es incorrecto', 'error');

      //   Con la contraseña incorrecta
      await store.dispatch(startLogin('jeral@gmail.com', '12345678'));
      actions = store.getActions();

      expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario o la contraseña es incorrecto', 'error');
   });

   test('startRegister correcto', async () => {
      //    mock para simular el login al momento de registrarse, solo en esta prueba
      fetchModule.fetchSinToken = jest.fn(() => ({
         json() {
            return {
               ok: true,
               uid: '123',
               name: 'test2',
               token: 'ABC123ABC',
            };
         },
      }));

      await store.dispatch(startRegister('test@test.com', '123456', 'Test'));

      const actions = store.getActions();

      expect(actions[0]).toEqual({
         type: types.authLogin,
         payload: {
            uid: '123',
            name: 'test2',
         },
      });

      //   Esperamos que se halla guardado el token
      expect(localStorage.setItem).toHaveBeenCalledWith('x-token', 'ABC123ABC');

      //   evaluamos que se halla llamado con la fecha
      expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
   });
});
