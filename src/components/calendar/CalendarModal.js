import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdated } from '../../actions/events';

// Las constantes o variables afuera, es para que no se vuelva a generar cada vez que hay un cambio

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};

if (process.env.NODE_ENV !== 'test') {
   Modal.setAppElement('#root');
}

// hora inicio
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:45:50

// hora fin, 1 hora mas
const after = now.clone().add(1, 'hours'); // 3:45:50

const initEvent = {
   title: '',
   notes: '',
   start: now.toDate(),
   end: after.toDate(),
};

export const CalendarModal = () => {
   const { modalOpen } = useSelector((state) => state.ui);
   const { activeEvent } = useSelector((state) => state.calendar);

   const dispatch = useDispatch();

   const [dateStart, setDateStart] = useState(now.toDate()); //fecha inicio
   const [dateEnd, setDateEnd] = useState(after.toDate()); //fecha fin

   const [titleValid, setTitleValid] = useState(true); //validaciones

   const [formValues, setFormValues] = useState(initEvent);

   const { notes, title, start, end } = formValues;

   useEffect(() => {
      if (activeEvent) {
         setFormValues(activeEvent);
      } else {
         setFormValues(initEvent); //limpiar modal
      }
   }, [activeEvent, setFormValues]);

   //    efecto para mostrar la info del evento al dar doble click en el
   const handleInputChange = ({ target }) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value,
      });
   };

   const closeModal = () => {
      dispatch(uiCloseModal());
      dispatch(eventClearActiveEvent()); //acción limpiar activeEvent
      setFormValues(initEvent); //limpiar el form del modal
   };

   const handleStartDateChange = (e) => {
      setDateStart(e);

      setFormValues({
         ...formValues,
         start: e,
      });
   }; //fecha inicio

   const handleEndDateChange = (e) => {
      setDateEnd(e);

      setFormValues({
         ...formValues,
         end: e,
      });
   }; //fecha fin

   const handleSubmitEvent = (e) => {
      e.preventDefault();

      const momentStart = moment(start);
      const momentEnd = moment(end);

      // Validaciones formulario
      if (momentStart.isSameOrAfter(momentEnd)) {
         //   si la fecha de inicio es igual o esta después es error
         return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
      }

      if (title.trim().length < 2) {
         return setTitleValid(false);
      }

      if (activeEvent) {
         //   si el evento esta activo se actualiza
         dispatch(eventStartUpdated(formValues));
      } else {
         //   Si el evento esta en null se crea el evento
         dispatch(eventStartAddNew(formValues));
      }

      setTitleValid(true);
      closeModal();
   };

   return (
      <Modal
         isOpen={modalOpen}
         onRequestClose={closeModal} //close
         style={customStyles}
         closeTimeoutMS={200}
         className='modal'
         overlayClassName='modal-fondo'
         ariaHideApp={!process.env.NODE_ENV === 'test'}
      >
         <h1 className='modal-h1'> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>

         <hr />

         <form className='container' onSubmit={handleSubmitEvent}>
            <div className='form-group'>
               <label>Fecha y hora inicio</label>

               <DateTimePicker
                  onChange={handleStartDateChange} //
                  value={dateStart}
                  className='form-control'
               />
            </div>

            <div className='form-group'>
               <label>Fecha y hora fin</label>

               <DateTimePicker
                  onChange={handleEndDateChange} //
                  value={dateEnd}
                  minDate={dateStart} // date fin >  inicio
                  className='form-control'
               />
            </div>

            <hr />

            <div className='form-group'>
               <label>Titulo y notas</label>

               <input
                  type='text' //
                  className={`form-control ${!titleValid && 'is-invalid'}`}
                  placeholder='Título del evento'
                  name='title'
                  autoComplete='off'
                  value={title}
                  onChange={handleInputChange}
               />

               <small id='emailHelp' className='form-text text-muted'>
                  Una descripción corta
               </small>
            </div>

            <div className='form-group'>
               <textarea
                  type='text' //
                  className='form-control'
                  placeholder='Notas'
                  rows='5'
                  name='notes'
                  value={notes}
                  onChange={handleInputChange}
               ></textarea>

               <small id='emailHelp' className='form-text text-muted'>
                  Información adicional
               </small>
            </div>

            <button type='submit' className='btn btn-outline-primary btn-block'>
               <i className='far fa-save'></i>

               <span> Guardar</span>
            </button>
         </form>
      </Modal>
   );
};
