import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Calendar } from 'primereact/calendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

export default function Reserva() {
    let emptyReserva = {
        id: null,
        nombre: '',
        foto: '',
        fecha: new Date(),
        duracion: new Date(),
        salon: '',
    };

    const toast = useRef(null);
    const [reservas, setReservas] = useState([]);
    const [DialogRE, setDialogRE] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalfilter, setGlobalFilter] = useState(null);
    const [date, setDate] = useState(null);
    const [isFetching, setFetching] = useState(false)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nombre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        salon: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [file, setFile] = useState('')
    const [nombre, setNombre] = useState('');
    const [salon, seSalon] = useState('');
    const [reservaId, setReservaId] = useState(null)
    const [reserva, setReserva] = useState(emptyReserva);

    useEffect(() => {
        getReserva()
    }, [])

    const getReserva = async () => {
        try {
            const response = await axios.get('http://localhost:3001/reservas');
            setReservas(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createReserva = async (e) => {
        e.preventDefault();
        try {
            if (reserva.nombre === '') {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Se requiere el nombre', life: 3000 });
                return;
            }
            if (reserva.fecha === null) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Seleccione una fecha', life: 3000 });
                return;
            }
            if (reserva.salon === '') {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Seleccione un salón', life: 3000 });
                return;
            }

            const formData = new FormData();
            formData.append('nombre', reserva.nombre);
            formData.append('foto', reserva.foto);
            formData.append('fecha', reserva.fecha);
            formData.append('duracion', reserva.duracion);
            formData.append('salon', reserva.salon);

            if (reserva.id) {
                await axios.put(`http://localhost:3001/reservas/${reserva.id}`, formData);
                const updatedReserva = [...reservas];
                const reservaIndex = updatedReserva.findIndex((r) => r.id === reserva.id);
                updatedReserva[reservaIndex] = { ...reserva };
                setReservas(updatedReserva);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva editada', life: 3000 });
            } else {
                const response = await axios.post('http://localhost:3001/reservas/nuevaReserva', formData);
                const newReserva = response.data;
                setReservas([...reservas, newReserva]);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva creada', life: 3000 });
            }
            hideDialog();
            getReserva();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteReserva = async () => {
        const id = reservaId;
        try {
            await axios.delete(`http://localhost:3001/reservas/${id}`);
            const updatedReserva = reservas.filter((r) => r.id !== reserva.id);
            setReservas(updatedReserva);
            setDeleteDialog(false);
            setReserva(emptyReserva);
            toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva eliminada', life: 3000 });
            getReserva()
        } catch (error) {
            console.error(error);
        }
    };

    const openNew = () => {
        setReserva(emptyReserva);
        setSubmitted(false);
        setDialogRE(true);
    };

    const hideDialog = () => {
        setDialogRE(false);
        setReserva(emptyReserva);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const editReserva = (reserva) => {
        const fecha = reserva.fecha instanceof Date ? reserva.fecha.toISOString().split('T')[0] : reserva.fecha;
        const duracion = reserva.duracion instanceof Date ? reserva.duracion.toISOString().split('T')[1] : reserva.duracion;

        setReserva({
            ...reserva,
            fecha: new Date(fecha),
            duracion: new Date(`1970-01-01T${duracion}`),
        });
        setDialogRE(true);
    };

    const selectedHandler = (event) => {
        const selectedFile = event.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('foto', file);

        try {
            const response = await fetch('/imagen', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('La imagen se ha subido correctamente')
            } else {
                console.log('Error al sibir la imagen')
            }
        } catch (error) {
            console.error('Error al subir la foto:', error);
        }
    };

    const onGlobalFilterChange = (e) => {
        const searchValue = e.target.value;
        setGlobalFilter(searchValue);

        const filteredReservations = reservas.filter(reserva => {
            return reserva.nombre.includes(searchValue) || reserva.salon.includes(searchValue);
        });

        setReservas(filteredReservations);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <React.Fragment>
                <div className='sm:p-grid'>
                    <Button label="New" icon="pi pi-plus" className="lg:mr-2" onClick={openNew} rounded raised />
                    <i className="pi pi-bars p-toolbar-separator mr-2" />
                    <span className="lg:ml-2 mt-2 p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='d-flex' type="search" value={globalfilter} onChange={onGlobalFilterChange} placeholder="Buscar por nombre o salón" />
                    </span>
                    <span className="lg:ml-2 mt-2 p-input-icon-left">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon placeholder="Buscar por fecha" />
                    </span>
                </div>
            </React.Fragment>
        );
    };

    const header = renderHeader();

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteReserva} />
        </React.Fragment>
    );

    const footerDialog = (
        <React.Fragment>
            <div className='grid justify-content-center align-items-center'>
                <Button label="Save" icon="pi pi-check" type='submit' onClick={createReserva} rounded />
                <Button label="Cancel" icon="pi pi-times" outlined rounded onClick={hideDialog} className='mt-2' />
            </div>
        </React.Fragment>
    )

    const value = new Date();
    const duracion = 2;

    const newValue = new Date(value.getTime());
    newValue.setHours(duracion);

    const entrada = useRef()

    const onFilter = (e) => {
        const newFilters = { ...filters, ...e.filters };
        if ((nombre.length && nombre === entrada.current.value) || (salon.length && salon === entrada.current.value) || (!nombre.length && !salon.length))
            setFilters(newFilters);
    };

    return (
        <div className='grid justify-content-center align-items-center p-0 m-0'>
            <div className='col-12 p-0 m-0'>
                <Toast ref={toast} />
                <Toolbar start={header} />
            </div>
            {!globalfilter && reservas.map((reserva) => (
                <div className='col-12 lg:col-4 lg:mx-4' key={reserva.id}>
                    {isFetching && <h1>Cargando...</h1>}
                    <Card filters={filters} onFilter={onFilter} globalFilterFields={['nombre', 'salon']}>
                        <div className='grid m-0'>
                            <div className='align-items-center'>
                                <img src={reserva.foto} alt={reserva.nombre} className='fotos'></img>
                            </div>
                            <div className='p-grid m-5 justify-content-center'>
                                <div className='mb-2'>
                                    <Chip label={reserva.nombre} />
                                </div>
                                <div className='mb-2'>
                                    <Chip label={reserva.fecha} />
                                </div>
                                <div className='mb-2'>
                                    <Chip label={`${(reserva.duracion)} hrs.`} />
                                </div>
                                <div>
                                    <Chip label={reserva.salon} />
                                </div>
                                <div className='mt-4'>
                                    <Button icon="pi pi-pencil" rounded text raised className='mx-2' onClick={() => editReserva(reserva)} />
                                    <Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Cancel" onClick={() => (setReservaId(reserva.id), setDeleteDialog(true))} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}


            <Dialog visible={DialogRE} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Reserva" modal className="p-fluid" footer={footerDialog} onHide={hideDialog}>
                <form onSubmit={createReserva} id='nuevaReserva'>
                    <div className="field">
                        <label htmlFor="nombre" className="font-bold">
                            Nombre
                        </label>
                        <InputText id="nombre" value={reserva.nombre} onChange={(e) => setReserva({ ...reserva, nombre: e.target.value })} required autoFocus className={classNames({ 'p-invalid': submitted && !reserva.nombre })} />
                        {submitted && !reserva.nombre && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="imagen" className="font-bold">
                            Imagen
                        </label>
                        <FileUpload id="imagen" mode="basic" onChange={handleFileUpload} onSelect={selectedHandler} name="imagen" url="http://localhost:3001/reservas/imagen" accept="image/*" maxFileSize={1000000} />
                    </div>
                    <div className="field">
                        <label htmlFor="fecha" className="font-bold">
                            Fecha
                        </label>
                        <Calendar id="fecha" dateFormat='yy/mm/dd' value={reserva.fecha} onChange={(e) => setReserva({ ...reserva, fecha: e.value })} rows={3} cols={20} />
                    </div>
                    <div className="field">
                        <label htmlFor="duracion" className="font-bold">
                            Duración

                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label="Basic time picker"
                                    id="duracion"
                                    value={reserva.duracion ? new Date(reserva.duracion) : null}
                                    onChange={(e) => {
                                        if (e && e.value) {
                                            const selectedTime = e.value;
                                            const formattedTime = selectedTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            });
                                            setReserva({ ...reserva, duracion: formattedTime });
                                        } else {
                                            setReserva({ ...reserva, duracion: null });
                                        }
                                    }}
                                    format="HH:mm:ss"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="field">
                        <label htmlFor="salon" className="font-bold">
                            Salón
                        </label>
                        <InputText id="salon" value={reserva.salon} onChange={(e) => setReserva({ ...reserva, salon: e.target.value })} required autoFocus />
                    </div>
                </form>
            </Dialog>

            <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {reserva && (
                        <span>Quieres eliminar la reserva <b>{reserva.nombre}</b>?</span>
                    )}
                </div>
            </Dialog>
        </div >
    )
} 