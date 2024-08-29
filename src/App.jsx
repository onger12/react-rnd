import { PrimeReactProvider } from 'primereact/api';
import { Router } from './router';
import { SlidesMakerScreen } from './screens';

export const App = () => {
  return (
    <PrimeReactProvider>
      <Router />
      {/* <SlidesMakerScreen /> */}
    </PrimeReactProvider>
  )
}