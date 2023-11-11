import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

export default function Reserva() {
    let emptyReserva = {
        id: null,
        nombre: '',
        foto: '',
        fecha: null,
        duracion: null,
        salon: '',
    };

    const toast = useRef(null);
    const [reservas, setReservas] = useState(null);
    const [reserva, setReserva] = useState(emptyReserva);
    const [DialogRE, setDialogRE] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalfilter, setGlobalFilter] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nombre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        salon: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    });
    const [file, setFile] = useState(null)

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
            if (reserva.id) {
                await axios.put(`http://localhost:3001/reservas/${reserva.id}`, reserva);
                const updatedReserva = [...reservas];
                const reservaIndex = updatedReserva.findIndex((r) => r.id === reserva.id);
                updatedReserva[reservaIndex] = { ...reserva };
                setReservas(updatedReserva);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva editada', life: 3000 });
            } else {
                const response = await axios.post('http://localhost:3001/reservas/nuevaReserva', reserva);
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
        try {
            if (reserva.id) {
                await axios.delete(`http://localhost:3001/reservas/${reserva.id}`);
                const updatedReserva = reservas.filter((r) => r.id !== reserva.id);
                setReservas(updatedReserva);
                setDeleteDialog(false);
                // Limpia la reserva después de eliminarla
                setReserva(emptyReserva);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva eliminada', life: 3000 });
            }
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
        setSubmitted(false);
        setDialogRE(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const editReserva = (reserva) => {
        setReserva({ ...reserva });
        setDialogRE(true); 
    };    

    const confirmDelete = (reserva) => {
        setReserva(reserva);
        setDeleteDialog(true);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _reserva = { ...reserva };

        _reserva[`${name}`] = val;

        setReserva(_reserva);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _reserva = { ...reserva };

        _reserva[`${name}`] = val;

        setReserva(_reserva);
    };

    const selectedHandler = (event) => {
        const selectedFile = event.files[0];
        setFile(selectedFile);
    };

    const onGlobalFilterChange = (event) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="lg:mr-2" onClick={openNew} rounded raised />
                <i className="pi pi-bars p-toolbar-separator mr-2" />
                <span className="lg:ml-2 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className='d-flex' type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search" />
                </span>
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

    const footer = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded text raised className='mx-2' onClick={() => editReserva(rowData)} />
                <Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Cancel" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    return (
        <div className='grid justify-content-center align-items-center p-0 m-0'>
            <div className='col-12 p-0 m-0'>
                <Toast ref={toast} />
                <Toolbar start={header} />
            </div>
                {reservas &&
                    reservas.map((reserva) => (
                        <div className='col-12 lg:col-4 lg:mx-4' key={reserva.id}>
                            <Card footer={footer} filters={filters} onFilter={(e) => setFilters(e.filters)} globalfilter={globalfilter}>
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
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}

            <Dialog visible={DialogRE} value={reservas} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Reserva" modal className="p-fluid" onHide={hideDialog}>

                <form onSubmit={createReserva} id='nuevaReserva'>

                    <div className="field">
                        <label htmlFor="nombre" className="font-bold">
                            Nombre
                        </label>
                        <InputText id="nombre" value={reserva.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !reserva.nombre })} />
                        {submitted && !reserva.nombre && <small className="p-error">Name is required.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="imagen" className="font-bold">
                            Imagen
                        </label>
                        <FileUpload id="imagen" mode="basic" onSelect={selectedHandler} name="imagen" url="http://localhost:3001/reservas/imagen" accept="image/*" maxFileSize={1000000} />

                    </div>

                    <div className="field">
                        <label htmlFor="fecha" className="font-bold">
                            Fecha
                        </label>
                        <Calendar id="fecha" dateFormat='yy/mm/dd' value={reserva.fecha} onChange={(e) => onInputNumberChange(e, 'fecha')} rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label htmlFor="duracion" className="font-bold">
                            Duración
                        </label>
                        <Calendar id="duracion" value={reserva.duracion} onChange={(e) => setReserva({ ...reserva, duracion: e.value })} timeOnly hourFormat="24" rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label htmlFor="salon" className="font-bold">
                            Salón
                        </label>
                        <InputText id="salon" value={reserva.salon} onChange={(e) => onInputChange(e, 'salon')} required autoFocus />

                    </div>

                    <Button label="Save" icon="pi pi-check" type='submit' rounded />
                    <Button label="Cancel" icon="pi pi-times" outlined rounded onClick={hideDialog} className='mt-2' />

                </form>
            </Dialog>

            <Dialog visible={deleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {reserva && (
                        <span>
                            Quieres eliminar la reserva <b>{reserva.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

        </div >
    )
} dfs