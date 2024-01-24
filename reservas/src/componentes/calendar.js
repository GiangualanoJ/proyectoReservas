import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { formatDate } from '@fullcalendar/core'
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';


const DemoApp = () => {

  const [reservas, setReservas] = useState([]);
  const [reserva, setReserva] = useState({
    id: null,
    nombre: '',
    file: null,
    fechaDesde: new Date(),
    fechaHasta: new Date(),
    horaDevolucion: new Date().setHours(12, 0, 0),
    salonID: '',
  });
  const calendarRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const argentinaTimeZone = 'America/Argentina/Buenos_Aires';


  useEffect(() => {
    getReserva();
  }, []);

  const getReserva = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reservas');
      const data = response.data;

      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();

      data.forEach((reserva) => {
        const event = {
          id: reserva.id,
          title: reserva.nombre,
          nombre: reserva.nombre,
          start: reserva.fechaDesde,
          fechaDesde: reserva.fechaDesde,
          fechaHasta: reserva.fechaHasta,
          end: reserva.fechaHasta,
          salonID: reserva.salonID,
          horaDevolucion: reserva.horaDevolucion,
        };

        calendarApi.addEvent(event);
      });
      setReservas(data);
      setDialogVisible(false);
    } catch (error) {
      console.log('Error cargando las reservas:', error);
    }
  }


  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleEventClick = (event) => {
    const calendarApi = calendarRef.current.getApi();
    const clickedEvent = calendarApi.getEventById(event.event.id);

    if (clickedEvent) {
      /* Extraer propiedades extendidas */
      const extendedProps = clickedEvent.extendedProps || {};
      const { id, nombre = '', salonID = '', horaDevolucion = '', fechaDesde, fechaHasta } = extendedProps;

      /* Actualizar el estado con la información del evento seleccionado */
      setReserva(prevReserva => ({
        ...prevReserva,
        id,
        nombre,
        salonID,
        horaDevolucion,
        fechaDesde: fechaDesde ? new Date(fechaDesde) : new Date(),
        fechaHasta: fechaHasta ? new Date(fechaHasta) : new Date(),
      }));

      /* Mostrar el diálogo con los detalles de la reserva */
      setDisplayBasic(true);
    }
  };


  const onHide = () => {
    setDisplayBasic(false);
  };

  /* ... */
const handleSave = async (e) => {
  e.preventDefault();
  try {
    if (reserva.id) {
      const formData = new FormData();
      formData.append('file', reserva.file);

      Object.entries(reserva).forEach(([key, value]) => {
        if (key !== 'file') {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`http://localhost:3001/reservas/${reserva.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedReserva = response.data;
      const updatedReservas = reservas.map((r) => (r.id === reserva.id ? updatedReserva : r));
      setReservas(updatedReservas);
      toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva editada', life: 3000 });

      
      await getReserva();
    }
    onHide();
  } catch (error) {
    console.error('Error al guardar los cambios:', error);
  }
  setDialogVisible(false);
};

  /* const selectedHandler = (event) => {
    const selectedFile = event.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = (event) => {
    setSelectedFile({ ...reserva, file: event.target.files[0] });
  }; */

  const handleChangeFechaDesde = (event) => {
    const newFecha = new Date(event.value.getTime());
    const formattedFechaDesde = new Intl.DateTimeFormat('es-AR').format(newFecha);
    const fechaArgentina = zonedTimeToUtc(newFecha, argentinaTimeZone);
    setReserva(prevPedido => ({
      ...prevPedido,
      fechaDesde: fechaArgentina,
      fechaDesdeFormatted: formattedFechaDesde,
    }));
  };


  const handleChangeFechaHasta = (event) => {
    const newFecha = new Date(event.value.getTime());
    const formattedFechaHasta = new Intl.DateTimeFormat('es-AR').format(newFecha);
    const fechaArgentina = zonedTimeToUtc(newFecha, argentinaTimeZone);
    setReserva(prevPedido => ({
      ...prevPedido,
      fechaHasta: fechaArgentina,
      fechaHastaFormatted: formattedFechaHasta,
    }));
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <i>{eventInfo.event.salonID}</i>
      </>
    )
  }

  const footerDialog = (
    <React.Fragment>
      <div className='grid justify-content-center align-items-center'>
        <Button label="Save" icon="pi pi-check" type='submit' onClick={handleSave} rounded />
        <Button label="Cancel" icon="pi pi-times" outlined rounded onClick={onHide} className='mt-2' />
      </div>
    </React.Fragment>
  )

  return (
    <div className='demo-app'>
      <Toast ref={toast} />
      {/* <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Reservas</h2>
          <ul>
            {reservas.map((reserva, index) => (
              <li key={index}>
                <b>{formatDate(reserva.fechaDesde, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
                <i>{reserva.nombre}</i>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <div className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
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
          weekends={true}
          eventChange={true}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
        />
      </div>

      <Dialog visible={displayBasic} onHide={onHide} footer={footerDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Detalles de reserva" modal className="p-fluid">
        <form onSubmit={handleSave} id='nuevaReserva'>
          <div className="field">
            <label htmlFor="nombre" className="font-bold">
              Nombre
            </label>
            <InputText id="nombre" value={reserva.nombre} onChange={(e) => setReserva((prevReserva) => ({ ...prevReserva, nombre: e.target.value }))} />
          </div>
          {/* <div className="field">
            <label htmlFor="file" className="font-bold">
              Imagen
            </label>
            <FileUpload id="file" mode="basic" onChange={handleFileUpload} onSelect={selectedHandler} name="file" url="http://localhost:3001/reservas/imagen" accept="image/*" maxFileSize={1000000} />
          </div> */}
          <div className="field">
            <label htmlFor="fechaDesde" className="font-bold">
              Fecha de inicio
            </label>
            <Calendar id="fechaDesde" dateFormat="yy/mm/dd" value={reserva.fechaDesde} onChange={handleChangeFechaDesde} rows={3} cols={20} />
          </div>
          <div className="field">
            <label htmlFor="fechaHasta" className="font-bold">
              Fecha de final
            </label>
            <Calendar id="fechaHasta" dateFormat='yy/mm/dd' value={reserva.fechaHasta} onChange={handleChangeFechaHasta} rows={3} cols={20} />
          </div>
          <div className="field">
            <label htmlFor="horaDevolucion" className="font-bold">
              Hora de devolució́n
            </label>
            <Dropdown
              id="horaDevolucion"
              value={reserva?.horaDevolucion}
              options={
                "08:00:00,09:00:00,10:00:00,11:00:00,12:00:00,13:00:00,14:00:00,15:00:00,16:00:00,17:00:00,18:00:00".split(",")
              }
              onChange={(e) => setReserva((prevReserva) => ({ ...prevReserva, horaDevolucion: e.value }))}
              placeholder="Seleccione la hora"
            />
          </div>
          <div className="field">
            <label htmlFor="salonID" className="font-bold">
              Salón
            </label>
            <InputNumber id="salonID" value={reserva.salonID} onValueChange={(e) => setReserva((prevReserva) => ({ ...prevReserva, salonID: e.value }))} mode="decimal" showButtons min={1} max={6} />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default DemoApp;

