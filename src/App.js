import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar } from './main/Navbar';
import { Footer } from './main/Footer';
import { Sidebar } from './main/Sidebar';
import { ConfigTema } from './main/ConfigTema';


import { Formularios } from './components/Formularios';
import { Correo } from './components/Correo';
import { Calendario } from './components/Calendario';
import { Encargados } from './components/Encargados';
import { Administradores } from './components/Administradores';
import { Informes } from './components/Informes';
import { Tareas } from './components/Tareas';

import './App.css';
import { useStateContext } from './ContextProvider';

export default function App(){
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, );

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Configuraciones"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ConfigTema />)}

              <Routes>
                {/* Inicio  */}
                <Route path="/" element={(<Formularios />)} />
                <Route path="/Formularios" element={(<Formularios />)} />

                {/* Menu  */}
                <Route path="/Correo" element={<Correo />} />
                <Route path="/Encargados" element={<Encargados />} />
                <Route path="/Administradores" element={<Administradores />} />

                {/* Apps  */}
                <Route path="/Tareas" element={<Tareas />} />
                <Route path="/Informes" element={<Informes />} />
                <Route path="/Calendario" element={<Calendario />} />
                

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};
