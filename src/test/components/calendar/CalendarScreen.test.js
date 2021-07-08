import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

// mock para simular el evento startDelete
// jest.mock('../../../actions/events', () => ({
//    eventStartDelete: jest.fn(),
// }));

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {
   calendar: {
      events: [],
   },
   auth: {
      uid: '123',
      name: 'Jeral',
   },
   ui: {
      openModal: false,
   },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <CalendarScreen />
   </Provider>
);

describe('Pruebas en <CalendarScreen />', () => {
   test('debe de mostrarse correctamente', () => {
      expect(wrapper).toMatchSnapshot();
   });
});
