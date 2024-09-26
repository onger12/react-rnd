import { useContext, useEffect, useRef, useState } from 'react';

import { useLocation } from 'wouter';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { LoadingScreen } from '../';
import { useForm } from '../../hooks';
import { RootContext } from '../../App';
import { ctc, Login } from '../../helpers';
import { RootWrapper } from '../../wrappers';

export const AuthAdminScreen = () => {

  const [validatingSession, setValidatingSession] = useState(true);

  const { loaders, handleLoaders } = useContext(RootContext);

  const [location, setLocation] = useLocation();
  const { formState, onChange } = useForm({
    username : '',
    password : '',
  });

  // refs
  const toastRef = useRef(null);

  // handlers
  const handleValidateSession = () => {
    if(!validatingSession) {
      setValidatingSession(true);
    }

    try {
      const session = JSON.parse(localStorage.getItem('session'));
      if(!session) {
        throw '';
      }

      handleLoginDone(session);
    } catch (e) {
      console.error('Error al validar la sesión guardada en memoria del usuario.');
    } finally {
      setValidatingSession();
      // setTimeout(() => {
      // }, 1500);
    }
  }
  const handleLoginDone = (user) => {
    localStorage.setItem('session', JSON.stringify(user))
    setLocation('/admin');
  }

  // bd
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if(loaders?.login) return;

    handleLoaders({ login : true });
    try {
      const body = {
        user : formState?.username,
        password : formState?.password,
      }
      const user = await Login(body);
      handleLoginDone(user);
    } catch (e) {
      ctc(e, 'Hubo un error al ingresar', toastRef)
    } finally {
      handleLoaders({ login : false });
    }

  }

  useEffect(() => {
    handleValidateSession();
  }, []);  

  if(validatingSession) return <LoadingScreen />

  return (
    <RootWrapper toastRef={toastRef}>
      <section className="bg-dotted-1 main-section-calc-height flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="bg-white flex flex-column gap-3 border-round-sm border-1 border-gray-200 p-3 w-10 md:w-6 lg:w-4">
          <h1 className="tracking-tighter text-2xl">Zona administradores</h1>
          <label htmlFor="username" className='w-full'>
            <span className='block mb-1'>Usuario</span>
            <InputText 
              id="username"
              name="username"
              className='w-full'
              autoFocus
              onChange={onChange}
              value={formState?.username}
              autoComplete='off'
              
            />
          </label>
          <label htmlFor="password" className='w-full'>
            <span className='block mb-1'>Contraseña</span>
            <InputText 
              id="password"
              name="password"
              type="password"
              className='w-full'
              onChange={onChange}
              value={formState?.password}
              autoComplete='off'
            />
          </label>
          <Button 
            label="Entrar"
            severity='contrast'
            type="submit"
            loading={loaders?.login}
            disabled={loaders?.login}
            // className='w-full py-2 font-body border-0 outline-none shadow-none text-white bg-gray-800 hover:bg-gray-700 border-round-sm'
            // unstyled
          />
        </form>
      </section>
    </RootWrapper>
  )
}