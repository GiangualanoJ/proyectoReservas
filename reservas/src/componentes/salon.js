import React from "react";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';


export default function Salon() {
    const icon = (<i className="pi pi-check"></i>)

    return (

        <div className="m-1 sm:m-7 py-8">
            <div className="text-900 font-bold text-6xl mb-4 text-center">Salones</div>
            <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-0" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Ejecutivo</div>
                            <div className="text-600">Prefecto para conferencias/reuniones laborales. (Hasta de 100 personas)</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$40.000</span>
                                <span className="ml-2 font-medium text-600">per hour</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Arcu vitae elementum</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Dui faucibus in ornare</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Morbi tincidunt augue</span>
                                </li>
                            </ul>
                            <div className='flex justify-content-center'>
                                <Image src="https://i.ibb.co/2PcjTxq/pexels-asia-culture-center-5026349.jpg" indicatorIcon={icon} alt="Image" preview width="300" height="200" className="salones"></Image>
                            </div>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                            <Button label="Buy Now" className="p-3 w-full mt-auto" />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-0" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Basico</div>
                            <div className="text-600">Ideal para reuniones íntimas, fiestas de cumpleaños o reuniones familiares. (Capacidad de 50 personas)</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$100.000</span>
                                <span className="ml-2 font-medium text-600">per 4 hours</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Arcu vitae elementum</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Dui faucibus in ornare</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Morbi tincidunt augue</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Duis ultricies lacus sed</span>
                                </li>
                            </ul>
                            <div className='flex justify-content-center'>
                                <Image src="https://i.ibb.co/jrB5Mzh/pexels-matheus-bertelli-16985105.jpg" indicatorIcon={icon} alt="Image" preview width="300" height="200" className="salones"></Image>
                            </div>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Buy Now" className="p-3 w-full" />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column surface-0" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Standar</div>
                            <div className="text-600">Versátil y adecuado para una amplia gama de eventos, como bodas, banquetes, conferencias, y fiestas de graduación. (Hasta 150 personas)</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$230.000</span>
                                <span className="ml-2 font-medium text-600">per 6 hour</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Arcu vitae elementum</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Dui faucibus in ornare</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Morbi tincidunt augue</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Duis ultricies lacus sed</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Imperdiet proin</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Nisi scelerisque</span>
                                </li>
                            </ul>
                            <div className='flex justify-content-center'>
                                <Image src="https://i.ibb.co/KqNd9QH/pexels-pixabay-265920.jpg" indicatorIcon={icon} alt="Image" preview width="300" height="200" className="salones"></Image>
                            </div>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Buy Now" className="p-3 w-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-0" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Premium</div>
                            <div className="text-600">Pensado para eventos grandes como bodas, fiestas de lanzamiento de productos, ect. (Hasta 300 personas)</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$400.000</span>
                                <span className="ml-2 font-medium text-600">per night</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Arcu vitae elementum</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Dui faucibus in ornare</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Morbi tincidunt augue</span>
                                </li>
                            </ul>
                            <div className='flex justify-content-center'>
                                <Image src="https://i.ibb.co/rtxjCH0/pexels-matheus-bertelli-16120257.jpg" indicatorIcon={icon} alt="Image" preview width="300" height="200" className="salones"></Image>
                            </div>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                            <Button label="Buy Now" className="p-3 w-full mt-auto" />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-0" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Exterior</div>
                            <div className="text-600">Perfectos para disfurtar los eventos de primavera/verano. (no tienen una capacidad fija) </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$350.000</span>
                                <span className="ml-2 font-medium text-600">per night</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Arcu vitae elementum</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Dui faucibus in ornare</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Morbi tincidunt augue</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Duis ultricies lacus sed</span>
                                </li>
                            </ul>
                            <div className='flex justify-content-center'>
                                <Image src="https://i.ibb.co/wMJF0RN/pexels-rosario-fernandes-3835638.jpg" indicatorIcon={icon} alt="Image" preview width="300" height="200" className="salones"></Image>
                            </div>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Buy Now" className="p-3 w-full" />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column surface-0" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                            <div className="text-600">Nos invita a disfrutar de la naturaleza, pero al resguardo de un salón vidriado. (Hasta 250 personas)</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="font-bold text-2xl text-900">$370.000</span>
                                <span className="ml-2 font-medium text-600">per night</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <ul className="list-none p-0 m-0 flex-grow-1">
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Arcu vitae elementum</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Dui faucibus in ornare</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Morbi tincidunt augue</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Duis ultricies lacus sed</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Imperdiet proin</span>
                                </li>
                                <li className="flex align-items-center mb-3">
                                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                    <span>Nisi scelerisque</span>
                                </li>
                            </ul>
                            <div className='flex justify-content-center'>
                                <Image src="https://i.ibb.co/yBFb8jZ/pexels-matheus-bertelli-17056996.jpg" indicatorIcon={icon} alt="Image" preview width="300" height="200" className="salones"></Image>
                            </div>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Buy Now" className="p-3 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


