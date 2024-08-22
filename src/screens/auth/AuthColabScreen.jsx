import { useLocation } from 'wouter';

import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

import { useForm } from '../../hooks';
import { RootWrapper } from '../../wrappers';

export const AuthColabScreen = () => {

  const [location, setLocation] = useLocation();
  const { formState, onChangeManual } = useForm({ dni : '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('session', JSON.stringify({ name : 'super', time : new Date() }))
    setLocation(`/learn/${formState?.dni}`);
  }

  return (
    <RootWrapper>
      <section className="main-section-calc-height flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="flex flex-column gap-2 border-round-sm border-1 border-gray-200 p-3 w-10 md:w-6 lg:w-4">
          <h1 className="tracking-tighter text-2xl my-1">Zona colaboradores</h1>
          <label htmlFor="dni" className='w-full'>
            <span className='block mb-1'>Cédula</span>
            <InputNumber 
              id="dni"
              name="dni"
              className='w-full'
              onChange={e => onChangeManual({ dni : e.value })}
              value={formState?.dni}
              autoComplete='off'
              format={false}
            />
          </label>
          <Button 
            label="Entrar"
            severity='contrast'
            type="submit"
            disabled={!formState?.dni}
          />
        </form>
      </section>
    </RootWrapper>
  )
}