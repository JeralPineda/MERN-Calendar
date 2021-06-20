import React from 'react';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {
   const dispatch = useDispatch();

   const handleDeleteEvent = () => {
      dispatch(eventDeleted()); //acción eliminar evento
   };

   return (
      <button className='btn btn-danger fab-danger' onClick={handleDeleteEvent}>
         <i className='fas fa-trash'></i>
      </button>
   );
};
