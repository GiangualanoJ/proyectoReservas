import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

export default function DetalleCliente() {
    const [products, setReservas] = useState([]);

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

    /* const startContent = (
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
    ); */

    return (
        <div>
            {/* <div className='col-12 p-0 m-0'>
                <Toolbar start={startContent} />
            </div> */}
            <div className="card">
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }} header="Detalle de Cliente">
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="Cliente"></Column>
                    <Column field="salon" header="reserva"></Column>
                    <Column field="fechaDesde" header="Fecha de inicio" sortable></Column>
                    <Column field="fechaHasta" header="Fecha de fin"></Column>
                </DataTable>
            </div>
        </div>
    );
}
