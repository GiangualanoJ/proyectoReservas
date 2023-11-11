import React from "react";


export default function Info() {

    return (
        <div id="info">
            <div className="info mx-3 my-3 sm:mx-7 py-3 sm:p-8">
                <div className="surface-0 text-center">
                    <div className="mb-3 font-bold text-3xl">
                        <span className="text-900">Tu evento perfecto </span>
                        <span className="text-teal-500">en nuestros salones</span>
                    </div>
                    <div className="text-700 mb-6">ofreciendo una experiencia integral para aquellos que desean celebrar de manera memorable.</div>
                    <div className="grid">
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-palette text-4xl text-teal-400"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Espacio Personalizado</div>
                            <span className="text-700 line-height-3">Podes adaptar el espacio a tus necesidades. Esto te permite crear un ambiente que refleje la temática y estilo de tu evento.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-users text-4xl text-teal-400"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Capacidad y Comodidad</div>
                            <span className="text-700 line-height-3">Espacios amplios que pueden acomodar a un gran número de invitados de manera cómoda. Perfectos para eventos como bodas, reuniones familiares y fiestas de empresa.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-check-circle text-4xl text-teal-400"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Infraestructura Adecuada</div>
                            <span className="text-700 line-height-3">Equipados con las instalaciones esenciales, como baños, cocinas, áreas de descanso y estacionamiento.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-calendar-times text-4xl text-teal-400"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Flexibilidad en Horarios</div>
                            <span className="text-700 line-height-3">Podes programar tu evento en el momento que mejor se adapte a tu agenda y la de tus invitados.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-star text-4xl text-teal-400"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Acceso a Asesoramiento Profesional</div>
                            <span className="text-700 line-height-3">Ofrecemos asesoramiento para la planificación y coordinación de eventos. Esto puede incluir la recomendación de proveedores de servicios, asistencia en la selección de decoración y la gestión de detalles logísticos.</span>
                        </div>
                        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-shield text-4xl text-teal-400"></i>
                            </span>
                            <div className="text-900 text-xl mb-3 font-medium">Seguridad y Regulaciones</div>
                            <span className="text-700 line-height-3">Cada uno de nuestros salones cumple con las regulaciones de seguridad y construcción.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

