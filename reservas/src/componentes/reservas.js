import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { zonedTimeToUtc } from 'date-fns-tz';

export default function Reserva() {
    let emptyReserva = {
        id: null,
        nombre: '',
        imagen: '',
        fechaDesde: new Date(),
        fechaHasta: new Date(),
        horaDevolucion: new Date().setHours(12, 0, 0),
        salonID: '',
    };

    const toast = useRef(null);
    const [reservas, setReservas] = useState([]);
    const [reservaId, setReservaId] = useState(null)
    const [reserva, setReserva] = useState(emptyReserva);
    const [imagen, setImagen] = useState(null);
    const [imagenUpdate, setImagenUpdate] = useState(null);
    const [DialogRE, setDialogRE] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isFetching, setFetching] = useState(false)
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        nombre: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
        salonID: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
        fechaDesde: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
        fechaHasta: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
    });
    const argentinaTimeZone = 'America/Argentina/Buenos_Aires';


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
                await axios.post('http://localhost:3001/reservas/uploadImagen', imagen, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const updatedReserva = [...reservas];
                const reservaIndex = updatedReserva.findIndex((r) => r.id === reserva.id);
                updatedReserva[reservaIndex] = { ...reserva };
                setReservas(updatedReserva);
                setImagen(null);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Reserva editada', life: 3000 });
            } else {
                const response = await axios.post('http://localhost:3001/reservas/nuevaReserva', reserva);
                await axios.post('http://localhost:3001/reservas/uploadImagen', imagen, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Imagen enviada correctamente');

                const newReserva = response.data;
                setImagen(null);
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
        setImagen(null);
        setDialogRE(true);
    };

    const hideDialog = () => {
        setDialogRE(false);
        setImagenUpdate(null);
        setImagen(null);
        setSubmitted(false);
        setReserva(emptyReserva);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const editReserva = (reserva) => {
        const fechaD = reserva.fechaDesde instanceof Date ? reserva.fechaDesde.toISOString().split('T')[0] : reserva.fechaDesde;
        const fechaH = reserva.fechaHasta instanceof Date ? reserva.fechaHasta.toISOString().split('T')[0] : reserva.fechaHasta;
        imageUniqued(reserva.imagen).then((url) => {
            setImagenUpdate(url);
        });

        setReserva({
            ...reserva,
            fechaDesde: new Date(fechaD),
            fechaHasta: new Date(fechaH),
        });
        setDialogRE(true);
    };

    const imageBodyTemplate = (rowData) => {
        const urlImagen = rowData.imagen;

        const imageUrl = `http://localhost:3001/uploads/${urlImagen}`;

        return <img src={imageUrl} alt={rowData.nombre} className="shadow-2 border-round mt-5" style={{ width: '150px', height: "150px", }} />;
    };


    const imageUniqued = async (imagen) => {
        const rutaImagen = ` https://deploy-webreservas-0e9b96bf9ba7.herokuapp.com/uploads/${imagen}`;
        setImagenUpdate(rutaImagen);
        return rutaImagen;

    }

    const handleSelect = async (event) => {

        const file = event.files[0];
        const formData = new FormData();
        formData.append('imagen', file)
        setImagen(formData);

        setReserva({ ...reserva, imagen: file.name });

    };

    const handleChangeFechaDesde = (event) => {
        if (reserva !== null && reserva.fechaDesde !== null) {
            const newFecha = new Date(event.value.getTime());
            const fechaArgentina = zonedTimeToUtc(newFecha, argentinaTimeZone);
            setReserva(prevPedido => ({
                ...prevPedido,
                fechaDesde: fechaArgentina,
            }));
        }
    };


    const handleChangeFechaHasta = (event) => {
        if (reserva !== null && reserva.fechaHasta !== null) {
            const newFecha = new Date(event.value.getTime());
            const fechaArgentina = zonedTimeToUtc(newFecha, argentinaTimeZone);
            setReserva(prevReserva => ({
                ...prevReserva,
                fechaHasta: fechaArgentina,
            }));
        }
    };

    const fechaDesdeBodyTemplate = (rowData) => {
        const fechaD = new Date(rowData.fechaDesde);
        const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };

        const fechaFormateada = fechaD.toLocaleDateString(undefined, opcionesFecha);


        return (
            <span>
                {fechaFormateada}
            </span>
        );
    };
    const fechaHastaBodyTemplate = (rowData) => {
        const fechaH = new Date(rowData.fechaHasta);
        const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };

        const fechaFormateada = fechaH.toLocaleDateString(undefined, opcionesFecha);


        return (
            <span>
                {fechaFormateada}
            </span>
        );
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: '', matchMode: FilterMatchMode.CONTAINS },
            nombre: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
            salonID: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
            fechaDesde: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
            fechaHasta: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
        });
        setGlobalFilterValue('');
    };


    const renderHeader = () => {

        return (
            <React.Fragment>
                <div className='sm:p-grid'>
                    <Button label="New" icon="pi pi-plus" className="lg:mr-2" onClick={openNew} rounded raised />
                    <i className="pi pi-bars p-toolbar-separator mr-2" />
                    <span className="lg:ml-2 p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='d-flex' type="search" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar reserva" />
                    </span>
                    <span className="lg:ml-2">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
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

    return (
        <div className='grid justify-content-center align-items-center p-0 m-0'>
            <div className='col-12 p-0 m-0'>
                <Toast ref={toast} />
                <Toolbar start={header} />
            </div>
            {reservas
                .filter(reserva =>
                    !globalFilterValue ||
                    (typeof reserva.nombre === 'string' && reserva.nombre.toLowerCase().includes(globalFilterValue.toLowerCase())) ||
                    (typeof reserva.salonID === 'number' && reserva.salonID.toString().includes(globalFilterValue)) ||
                    (typeof reserva.fechaDesde === 'string' && reserva.fechaDesde.toLowerCase().includes(globalFilterValue.toLowerCase())) ||
                    (typeof reserva.fechaHasta === 'string' && reserva.fechaHasta.toLowerCase().includes(globalFilterValue.toLowerCase()))
                )
                .map((reserva, index) => (
                    <div className='col-12 lg:col-4 lg:mx-4' key={index}>
                        {isFetching && <h1>Cargando...</h1>}
                        <Card filters={filters} globalFilterFields={['nombre', 'salonID', 'fecha']} emptyMessage="No se encontraron resultados.">
                            <div className='grid m-0'>
                                <div className='align-items-center'>
                                    {imageBodyTemplate(reserva)}
                                </div>
                                <div className='p-grid m-5 justify-content-center'>
                                    <div className='mb-2'>
                                        <Chip label={reserva.nombre} />
                                    </div>
                                    <div className='mb-2'>
                                        <Chip label={fechaDesdeBodyTemplate(reserva)} />
                                    </div>
                                    <div className='mb-2'>
                                        <Chip label={fechaHastaBodyTemplate(reserva)} />
                                    </div>
                                    <div className='mb-2'>
                                        <Chip label={`Hora de devolución: ${reserva.horaDevolucion}`} />
                                    </div>
                                    <div>
                                        <Chip label={reserva.salonID} />
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
                {imagen && (
                    <img src={URL.createObjectURL(imagen.get('imagen'))} alt={reserva.nombre} width={200} className="product-image block m-auto pb-3" />
                )}
                {imagen === null && imagenUpdate && (
                    <img src={imagenUpdate} alt="cargar imagen" width={200} className="product-image block m-auto pb-3" />
                )}
                <form onSubmit={createReserva} id='nuevaReserva'>
                    <div className="field">
                        <label htmlFor="nombre" className="font-bold">
                            Nombre
                        </label>
                        <InputText id="nombre" value={reserva?.nombre} onChange={(e) => setReserva({ ...reserva, nombre: e.target.value })} autoFocus />
                    </div>
                    <div className="field">
                        <label htmlFor="imagen" className="font-bold">
                            Imagen
                        </label>
                        <FileUpload id="imagen" name="imagen" url={''} onSelect={handleSelect} cancelLabel='Cancelar' chooseLabel='Elegir' auto={true} />
                    </div>
                    <div className="field">
                        <label htmlFor="fechaDesde" className="font-bold">
                            Fecha de inicio
                        </label>
                        <Calendar id="fechaDesde" dateFormat='yy/mm/dd' value={reserva.fechaDesde} onChange={handleChangeFechaDesde} rows={3} cols={20} />
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
                            onChange={(e) => setReserva({ ...reserva, horaDevolucion: e.value })}
                            placeholder="Seleccione la hora"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="salonID" className="font-bold">
                            Salón
                        </label>
                        <InputNumber id="salonID" value={reserva.salonID} onValueChange={(e) => setReserva({ ...reserva, salonID: e.target.value })} mode="decimal" showButtons min={1} max={6} />
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