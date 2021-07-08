import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';

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

   test('pruebas con las interacciones del calendario', () => {
      const calendar = wrapper.find('Calendar');

      const calendarMessages = calendar.prop('messages');

      expect(calendarMessages).toEqual(messages);
   });
});
