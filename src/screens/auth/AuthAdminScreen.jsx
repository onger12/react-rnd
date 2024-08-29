import { InputText } from 'primereact/inputtext';
import { useForm } from '../../hooks';
import { Button } from 'primereact/button';
import { useLocation } from 'wouter';
import { HeaderMain } from '../../components';
import { RootWrapper } from '../../wrappers';

export const AuthAdminScreen = () => {

  const [location, setLocation] = useLocation();
  const { formState, onChange } = useForm({
    username : '',
    password : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('session', JSON.stringify({ name : 'super', time : new Date() }))
    setLocation('/admin');
  }

  return (
    <RootWrapper>
      <section className="main-section-calc-height flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="flex flex-column gap-3 border-round-sm border-1 border-gray-200 p-3 w-10 md:w-6 lg:w-4">
          <h1 className="tracking-tighter text-2xl">Zona administradores</h1>
          <label htmlFor="username" className='w-full'>
            <span className='block mb-1'>Usuario</span>
            <InputText 
              id="username"
              name="username"
              className='w-full'
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
            // className='w-full py-2 font-body border-0 outline-none shadow-none text-white bg-gray-800 hover:bg-gray-700 border-round-sm'
            // unstyled
          />
        </form>
      </section>
    </RootWrapper>
  )
}