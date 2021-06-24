import Swal from 'sweetalert2';

import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
   return async (dispatch, getState) => {
      //    Obtener info del user desde el state
      const { uid, name } = getState().auth;

      try {
         const resp = await fetchConToken('events', event, 'POST');
         const body = await resp.json();

         if (body.ok) {
            event.id = body.evento.id;
            event.user = {
               _id: uid,
               name: name,
            };

            dispatch(eventAddNew(event));
         } else {
            Swal.fire('Error', body.msg, 'error');
         }
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se pudo crear la nota', 'error');
      }
   };
};

export const eventStartLoading = () => {
   return async (dispatch) => {
      try {
         const resp = await fetchConToken('events');
         const body = await resp.json();

         const events = body.eventos;

         dispatch(eventLoaded(events));
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se encontraron notas', 'error');
      }
   };
};

const eventAddNew = (event) => ({
   type: types.eventAddNew,
   payload: event,
});

export const eventSetActive = (event) => ({
   type: types.eventSetActive,
   payload: event,
});

export const eventClearActiveEvent = () => ({
   type: types.eventClearActiveEvent,
});

export const eventUpdated = (event) => ({
   type: types.eventUpdated,
   payload: event,
});

export const eventDeleted = (event) => ({
   type: types.eventDeleted,
   payload: event,
});

const eventLoaded = (events) => ({
   type: types.eventLoaded,
   payload: events,
});
