import { useContext } from 'react';

import { RootContext } from '../App';
import { LoadingScreen } from '../screens';
import { FooterMain, HeaderMain } from '../components';
import { Toast } from 'primereact/toast';

export const RootWrapper = ({ children, toastRef }) => {

  const { currentCompany } = useContext(RootContext);

  if(!currentCompany) {
    return <LoadingScreen />
  }

  return (
    <>
      <HeaderMain />
      {children}
      <FooterMain companyName={currentCompany?.name} />

      <Toast ref={toastRef} />
    </>
  )
}
