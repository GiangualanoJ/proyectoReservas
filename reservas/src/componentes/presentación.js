import React from "react";
import { Button } from 'primereact/button';
import Info from "./info";
import Salon from "./salon";



export default function Presentacion() {

    return (
        <div>
            <div className="text-700 text-center py-7 d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div className="text-teal-400 font-bold my-3"><i className="pi pi-verified"></i>&nbsp; BY EVENTSPACE</div>
                <div className="text-900 font-bold text-5xl mb-3">Bienvenido a EventSpace</div>
                <div className="text-700 text-2xl mb-5">¡Celebra tus momentos especiales con nosotros! Tu fiesta, tu estilo, tu salón.</div>
                <a href="#info"><Button label="Conocé más" icon="pi pi-list" className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" /></a>
            </div>
            <Info />
            <Salon />
        </div>

    );
}