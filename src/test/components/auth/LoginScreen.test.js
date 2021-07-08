import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';

// mock para simular el evento startLogin
jest.mock('../../../actions/auth', () => ({
   startLogin: jest.fn(),
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <LoginScreen />
   </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
   test('debe de mostrarse correctamente', () => {
      expect(wrapper).toMatchSnapshot();
   });

   test('debe de llamar el dispatch del login', () => {
      wrapper.find('input[name="lEmail"]').simulate('change', {
         target: {
            name: 'lEmail',
            value: 'jeral@gmail.com',
         },
      });

      wrapper.find('input[name="lPassword"]').simulate('change', {
         target: {
            name: 'lPassword',
            value: '123456',
         },
      });

      wrapper.find('form').at(0).prop('onSubmit')({
         preventDefault() {},
      });

      expect(startLogin).toHaveBeenCalledWith('jeral@gmail.com', '123456');
   });
});
