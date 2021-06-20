import moment from 'moment';

import { types } from '../types/types';

const initialState = {
   events: [
      {
         id: new Date().getTime(),
         title: 'Cumpleaños',
         start: moment().toDate(), //new Date
         end: moment().add(2, 'hours').toDate(),
         bgcolor: '#fafafa',
         notes: 'Comprar pastel',
         user: {
            _id: '1234',
            name: 'Jeral',
         },
      },
   ],
   activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.eventSetActive:
         return {
            ...state,
            activeEvent: action.payload,
         };

      case types.eventAddNew:
         return {
            ...state,
            events: [...state.events, action.payload],
         };

      case types.eventClearActiveEvent:
         return {
            ...state,
            activeEvent: null,
         };

      case types.eventUpdated:
         return {
            ...state,
            events: state.events.map(
               (e) => (e.id === action.payload.id ? action.payload : e) //regresa el evento actualizado
            ),
         };

      case types.eventDeleted:
         return {
            ...state,
            events: state.events.filter(
               (e) => e.id !== action.activeEvent.id //eliminar el evento
            ),
            activeEvent: null,
         };

      default:
         return state;
   }
};
