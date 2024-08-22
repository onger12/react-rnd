import { PrimeReactProvider } from 'primereact/api';
import { Router } from './router';

export const App = () => {
  return (
    <PrimeReactProvider>
      <Router />
    </PrimeReactProvider>
  )
}