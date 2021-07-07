import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../router/AppRouter';

// jest.mock('../../../actions/events', () => ({
//    eventStartDelete: jest.fn(),
// }));

const middleware = [thunk];
const mockStore = configureStore(middleware);

// store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
   test('debe de mostrar el loader', () => {
      // para que la prueba pase, por el #root no dejaba pasar la prueba
      const initState = {
         auth: {
            checking: true,
         },
      };

      let store = mockStore(initState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );

      //   expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.loader').exists()).toBe(true);
   });

   test('debe de mostrar la ruta publica', () => {
      const initState = {
         auth: {
            checking: false,
            uid: null,
         },
      };

      let store = mockStore(initState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );

      //   expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.container').exists()).toBe(true);
   });

   test('debe de mostrar la ruta privada', () => {
      const initState = {
         calendar: {
            events: [],
         },
         ui: {
            modalOpen: false,
         },
         auth: {
            checking: false,
            uid: '1234',
            name: 'Jeral',
         },
      };

      let store = mockStore(initState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.calendar-screen').exists()).toBe(true);
   });
});
