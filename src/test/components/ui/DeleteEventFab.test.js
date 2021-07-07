import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

// mock para simular el evento startDelete
jest.mock('../../../actions/events', () => ({
   eventStartDelete: jest.fn(),
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <DeleteEventFab />
   </Provider>
);

describe('Pruebas en <DeleteEventFab />', () => {
   test('debe de mostrarse correctamente', () => {
      expect(wrapper).toMatchSnapshot();
   });

   test('debe de  llamar el evento al hacer click', () => {
      wrapper.find('button').prop('onClick')();

      expect(eventStartDelete).toHaveBeenCalled();
   });
});
