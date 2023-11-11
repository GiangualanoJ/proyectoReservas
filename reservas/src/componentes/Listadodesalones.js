import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function Salones() {
    let emptySalon = {
        id: null,
        nombre: '',
        precio: 0,
        capacidad: 0
    };

    const [salones, setSalones] = useState(null);
    const [salon, setSalon] = useState(emptySalon);
    const toast = useRef(null);
    const [salonDialog, setSalonDialog] = useState(false);
    const [deleteSalonDialog, setDeleteSalonDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const dt = useRef(null);

    useEffect(() => {
        getSalon()
    }, [])

    const getSalon = async () => {

        axios.get('http://localhost:3001/salones/verSalon').then(r => {
            setSalones(r.data)
        }).catch(error => {
            console.log(error);
        });

    }

    const createSalon = async (e) => {
        e.preventDefault();

        try {
            if (salon.id) {
                await axios.put(`http://localhost:3001/salones/${salon.id}`, salon);
                const updatedsalon = [...salones];
                const salonIndex = updatedsalon.findIndex((s) => s.id === salon.id);
                updatedsalon[salonIndex] = { ...salon };
                setSalones(updatedsalon);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Salon editado', life: 3000 });
            } else {
                const response = await axios.post('http://localhost:3001/salones/crearSalon', salon);
                const newSalon = response.data;
                setSalones([...salones, newSalon]);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'Salon creado', life: 3000 });
            }
            hideDialog();
            getSalon();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSalon = async (e) => {
        try {
            if (salon.id) {
                await axios.delete(`http://localhost:3001/salones/${salon.id}`);
                const updatedsalon = salones.filter((s) => s.id !== salon.id);
                setSalones(updatedsalon);
                setDeleteSalonDialog(false);
                setSalon(emptySalon);
                toast.current.show({ severity: 'success', summary: 'Exitoso', detail: 'cliente eliminado', life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };



    const openNew = () => {
        setSalon(emptySalon);
        setSubmitted(false);
        setSalonDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSalonDialog(false);
    };

    const hideDeleteSalonDialog = () => {
        setDeleteSalonDialog(false);
    };

    const editSalon = (salon) => {
        setSalon({ ...salon });
        setSalonDialog(true);
    };

    const confirmDeleteSalon = (salon) => {
        setSalon(salon);
        setDeleteSalonDialog(true);
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _salon = { ...salon };

        _salon[`${name}`] = val;

        setSalon(_salon);
    };

    const moneyTemplate = (amount) => {
        return (
            <React.Fragment>
                <div>
                    {amount?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </div>
            </React.Fragment>
        )

    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _salon = { ...salon };

        _salon[`${name}`] = val;

        setSalon(_salon);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="mr-2" onClick={openNew} rounded raised />
                <i className="pi pi-bars p-toolbar-separator mr-2" />
                <Button label="Export" icon="pi pi-upload" className="ml-2 p-button-warning" onClick={exportCSV} rounded raised />
            </React.Fragment>
        );
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editSalon(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteSalon(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-2 text-2xl">Listado de Salones</h4>
        </div>
    );

    const deleteSalonDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteSalonDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSalon} />
        </React.Fragment>
    );

    return (
        <div>
            <Toolbar start={leftToolbarTemplate} />
            <div className='card'>
                <Toast ref={toast} />
                <DataTable ref={dt} value={salones} tableStyle={{ minWidth: '50rem' }} header={header}>
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="precio" header="Precio" body={(rowData) => { return moneyTemplate(rowData.precio) }} sortable></Column>
                    <Column field="capacidad" header="Capacidad"></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>
            </div>

            <Dialog visible={salonDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Salon Details" modal className="p-fluid" onHide={hideDialog}>

                <form onSubmit={createSalon}>
                    <div className="field">
                        <label htmlFor="nombre" className="font-bold">
                            Nombre
                        </label>
                        <InputText id="nombre" value={salon.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !salon.nombre })} />
                        {submitted && !salon.nombre && <small className="p-error">Name is required.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="precio" className="font-bold">
                            Precio
                        </label>
                        <InputNumber id="precio" value={salon.precio} onChange={(e) => onInputNumberChange(e, 'precio')} required rows={3} cols={20} />
                    </div>

                    <div className="field">
                        <label htmlFor="capacidad" className="font-bold">
                            Capacidad
                        </label>
                        <InputNumber id="capacidad" value={salon.capacidad} onChange={(e) => onInputNumberChange(e, 'capacidad')} required rows={3} cols={20} />
                    </div>

                    <Button label="Save" icon="pi pi-check" type='submit' rounded />
                    <Button label="Cancel" icon="pi pi-times" outlined rounded onClick={hideDialog} className='mt-2' />
                </form>

            </Dialog>

            <Dialog visible={deleteSalonDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteSalonDialogFooter} onHide={hideDeleteSalonDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {salon && (
                        <span>
                            Are you sure you want to delete <b>{salon.nombre}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

