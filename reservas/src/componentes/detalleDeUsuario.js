import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

export default function Detalles() {
    let emptyReserva = {
        id: null,
        nombre: '',
        file: null,
        fechaDesde: new Date(),
        fechaHasta: new Date(),
        horaDevolucion: new Date().setHours(12, 0, 0, 0),
        salon: '',
    };

    const toast = useRef(null);
    const [reservas, setReservas] = useState([]);
    const [reservaId, setReservaId] = useState(null)
    const [reserva, setReserva] = useState(emptyReserva);
    const [DialogRE, setDialogRE] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isFetching, setFetching] = useState(false)
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        nombre: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
        salon: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
        fechaDesde: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
        fechaHasta: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
    });


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
        const fechaD = reserva.fechaDesde instanceof Date ? reserva.fechaDesde.toISOString().split('T')[0] : reserva.fechaDesde;
        const fechaH = reserva.fechaHasta instanceof Date ? reserva.fechaHasta.toISOString().split('T')[0] : reserva.fechaHasta;

        setReserva({
            ...reserva,
            fechaDesde: new Date(fechaD),
            fechaHasta: new Date(fechaH),
        });
        setDialogRE(true);

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

    /* const horaFormateada = (rowData) => {
        const horaD = new Date(rowData.horaDevolucion);
        const opcionesHora = { hour: 'numeric', minute: 'numeric' };
        const horaFormateada = horaD.toLocaleTimeString(undefined, opcionesHora);

        return (
            <span>
                {horaFormateada}
            </span>
        );
    } */

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
            salon: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.STARTS_WITH }] },
            fechaDesde: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
            fechaHasta: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.DATE_IS }] },
        });
        setGlobalFilterValue('');
    };


    const startContent = (
        <React.Fragment>
            <div className="lg:ml-2">
                <h1>Detalles de Cliente</h1>
            </div>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <div className='sm:p-grid'>
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


    return (
        <div className='grid justify-content-center align-items-center p-0 m-0'>
            <div className='col-12 p-0 m-0'>
                <Toast ref={toast} />
                <Toolbar start={startContent} end={endContent} />
            </div>
            {reservas
                .filter(reserva =>
                    !globalFilterValue ||
                    reserva.nombre.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
                    reserva.salon.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
                    reserva.fechaDesde.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
                    reserva.fechaHasta.toLowerCase().includes(globalFilterValue.toLowerCase())
                )
                .map((reserva, index) => ({
                    ...reserva,
                    fechaHasta: new Date(reserva.fechaHasta)
                }))
                .sort((a, b) => a.fechaHasta - b.fechaHasta)
                .map((reserva, index) => (
                    <div className='col-12 lg:col-4 lg:mx-4' key={index}>
                        {isFetching && <h1>Cargando...</h1>}
                        <Card sortable key={index} filters={filters} globalFilterFields={['nombre', 'salon', 'fecha']} emptyMessage="No se encontraron resultados.">
                            <div className='grid m-0'>
                                <div className='align-items-center'>
                                    <img src={`http://localhost:3001/reservas/imagen/${reserva.file}`} alt={reserva.nombre} className='fotos'></img>
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
                                        <Chip label={reserva.salon} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
        </div >
    )
} 