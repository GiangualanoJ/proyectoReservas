import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("firebaseToken"));

  const handleLogout = async () => {
    try {
      localStorage.removeItem("firebaseToken");
      window.location.reload();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  } /* cerrar sesión */

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  // elementos del menú
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      url: '/'
    },
    {
      label: 'Listado de Salones',
      icon: 'pi pi-fw pi-list',
      url: '/salones'
    },
    {
      label: 'Reservas',
      icon: 'pi pi-fw pi-check-circle',
      url: '/reservas'
    },
    {
      label: 'Calendario',
      icon: 'pi pi-fw pi-calendar',
      url: '/calendar'
    },
    isLoggedIn
      ? {
          label: 'Log out',
          icon: 'pi pi-fw pi-sign-out',
          command: handleLogout,
          className: 'custom-menu-item custom-menu-item-right',
        }
      : {
          label: 'Log in',
          icon: 'pi pi-fw pi-user-plus',
          url: '#login',
          className: 'p-menuitem-end', 
          styleClass: 'custom-menu-item',
          style: { marginLeft: 'auto', }
        }
  ];

  /* filtra los elementos del menú según si tienes un token de usuario o no */
  const filteredItems = isLoggedIn ? items : [items[0], items[items.length - 1]];

  return (
    <div>
      <Menubar model={filteredItems} />
    </div>
  );
}
