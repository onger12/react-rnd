import { createContext, useEffect, useRef, useState } from 'react';

import { PrimeReactProvider } from 'primereact/api';

import { Router } from './router';
import { companyOptions } from './helpers';

export const RootContext = createContext(null);

export const App = () => {
  const [loaders, setLoaders] = useState({});
  const [currentCompany, setCurrentCompany] = useState();
  const [currentSession, setCurrentSession] = useState();

  const defaultCompany = useRef(companyOptions[1])?.current;

  let logoMin = null;
  let logoFull = null;
  switch (currentCompany?.company?.toUpperCase()) {
    case 'PE':
      logoMin = '/Capacitaciones-APP/PE_LOGO.png';
      logoFull = '/Capacitaciones-APP/PE_LOGO_FULL.png';
      break;
    case 'CAP':
      logoMin = '/Capacitaciones-APP/CAP_LOGO.webp';
      logoFull = '/Capacitaciones-APP/CAP_LOGO_FULL.webp';
      break;
    case 'CT':
      logoMin = 'avatar_CT';
      logoFull = 'avatar_CT';
      break;
    default:
      break;
  }

  // handlers
  const handleLoaders = (value) => setLoaders(t => ({...t, ...value}));
  const handleChangeCompany = (newCompany) => {
    setCurrentCompany(newCompany);
    localStorage.setItem('company', JSON.stringify(newCompany));
  }
  const handleChangeSession = (newSession) => {
    setCurrentSession(newSession);
    localStorage.setItem('session', JSON.stringify(newSession));
  }

  useEffect(() => {
    const company = JSON.parse(localStorage.getItem('company'));
    
    if(!company) {
      localStorage.setItem('company', JSON.stringify(defaultCompany))
    }

    setCurrentCompany(company ?? defaultCompany);
  }, []);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    setCurrentSession(session ?? null);
  }, []);

  return (
    <PrimeReactProvider>
      <RootContext.Provider
        value={{ 
          logoMin, 
          loaders,
          logoFull, 
          currentCompany, 
          currentSession : { ...currentSession, name : currentSession?.user}, 
          handleLoaders,
          handleChangeCompany, 
          handleChangeSession, 
        }}
      >
        <Router />
        {/* <SlidesMakerScreen /> */}
      </RootContext.Provider>
    </PrimeReactProvider>
  )
}