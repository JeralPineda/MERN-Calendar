import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';

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

         const events = prepareEvents(body.eventos);

         //  Mandar los eventos al reducer para que los muestre
         dispatch(eventLoaded(events));
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se encontraron eventos', 'error');
      }
   };
};

export const eventStartUpdated = (event) => {
   return async (dispatch) => {
      try {
         const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
         const body = await resp.json();

         if (body.ok) {
            dispatch(eventUpdated(event));
         } else {
            Swal.fire('Error', body.msg, 'error');
         }
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se pudo actualizar el evento', 'error');
      }
   };
};

export const eventStartDelete = () => {
   return async (dispatch, getState) => {
      const { id } = getState().calendar.activeEvent;

      try {
         const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
         const body = await resp.json();

         if (body.ok) {
            dispatch(eventDeleted());
         } else {
            Swal.fire('Error', body.msg, 'error');
         }
      } catch (error) {
         console.log(error);
         Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
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

const eventUpdated = (event) => ({
   type: types.eventUpdated,
   payload: event,
});

const eventDeleted = () => ({
   type: types.eventDeleted,
});

const eventLoaded = (events) => ({
   type: types.eventLoaded,
   payload: events,
});

// acción para limpiar los eventos del store al hacer logout
// debido a que al activar una nota y salir y volver a entrar se mantenía activo el botón de eliminar
export const eventLogout = () => ({
   type: types.eventLogout,
});
