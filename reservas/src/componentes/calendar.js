import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { Dialog } from 'primereact/dialog';
import { formatDate } from '@fullcalendar/core'

export default class DemoApp extends React.Component {
  calendarRef = React.createRef()

  componentDidMount() {
    /* Realiza una solicitud a la API de reservas */
    fetch('http://localhost:3001/reservas')
      .then((response) => response.json())
      .then((data) => {
        /* Obtiene la instancia de FullCalendar */
        const calendarApi = this.calendarRef.current.getApi();
        /* Limpia el calendario antes de agregar nuevos eventos */
        calendarApi.removeAllEvents();
        /* Formatea los datos de la API y agrega los eventos */
        data.forEach((reserva) => {
          calendarApi.addEvent({
            title: reserva.nombre,
            start: reserva.fecha,
            end: reserva.fecha,
            salon: reserva.salon,
          });
        });
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API de reservas:', error);
      });
  }

  handleDateClick = (arg) => {
    alert(arg.dateStr);
  }

  handleEventClick = (info) => {
    info.el.style.borderColor = 'green';

    return (
      <Dialog>

      </Dialog>
    )

  }

  render() {
    return (
      <div className='demo-app'>
        {/* <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <h2>Reservas</h2>
            <ul key={reserva.id}>
              {reserva &&
                reserva.map((reserva) => (
                  <li key={reserva.id}>
                    <b>{formatDate(reserva.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
                    <i>{reserva.title}</i>
                  </li>
                ))}
            </ul>
          </div>
        </div> */}
        <div className='demo-app-main'>
          <FullCalendar
            ref={this.calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="dayGridMonth"
            weekends={false}
            eventChange={true}
            eventClick={this.handleEventClick}
            dateClick={this.handleDateClick}
            eventContent={renderEventContent}
          />
        </div>
      </div>
    )
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <i>{eventInfo.event.salon}</i>
    </>
  )
}