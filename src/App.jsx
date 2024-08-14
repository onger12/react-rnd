import { PrimeReactProvider } from 'primereact/api';

import { HomeScreen } from "./screens"

export const App = () => {
  return (
    <PrimeReactProvider>
      <HomeScreen />
    </PrimeReactProvider>
  )
}