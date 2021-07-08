import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';

// mock para simular el evento eventSetActive
jest.mock('../../../actions/events', () => ({
   eventSetActive: jest.fn(),
   eventStartLoading: jest.fn(),
}));

// mock del localStorage
Storage.prototype.setItem = jest.fn();

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

      calendar.prop('onDoubleClickEvent')();
      expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

      calendar.prop('onSelectEvent')({ start: 'Hola' });
      expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola' });

      //   Acción
      act(() => {
         calendar.prop('onView')('week');
         expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
      });
   });
});
