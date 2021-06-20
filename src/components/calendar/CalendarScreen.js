import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; //Cambiar idioma al calendario(fechas)

moment.locale('es'); //Cambiar idioma al calendario(fechas)

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
   const dispatch = useDispatch();

   //    TODO: Leer los events del store
   const { events, activeEvent } = useSelector((state) => state.calendar);
   //    console.log(events);

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   const onDoubleClick = (e) => {
      //   console.log(e);
      dispatch(uiOpenModal());
   };

   const onSelectEvent = (e) => {
      dispatch(eventSetActive(e));
   };

   const onViewChange = (e) => {
      //al momento de hacer un cambio, guardar y decirle al calendario que inicie desde ahi
      setLastView(e);
      localStorage.setItem('lastView', e);
   };

   const eventStyleGetter = (event, start, end, isSelected) => {
      const style = {
         backgroundColor: '#367CF7',
         borderRadius: '0px',
         opacity: 0.8,
         display: 'block',
         color: 'white',
      };

      return {
         style,
      };
   };

   return (
      <div className='calendar-screen'>
         <Navbar />

         <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            messages={messages} //mensajes en español
            eventPropGetter={eventStyleGetter} //estilos del evento
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            view={lastView}
            components={{
               event: CalendarEvent,
            }}
         />

         <AddNewFab />

         {
            //  Si el evnto esta activo se muestra el componente(botón eliminar)
            activeEvent && <DeleteEventFab />
         }

         <CalendarModal />
      </div>
   );
};
