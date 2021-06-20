import moment from 'moment';

import { types } from '../types/types';

const initialState = {
   events: [
      {
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
      default:
         return state;
   }
};
