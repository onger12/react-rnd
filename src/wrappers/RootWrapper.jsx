import { useContext } from 'react';

import { RootContext } from '../App';
import { LoadingScreen } from '../screens';
import { FooterMain, HeaderMain } from '../components';

export const RootWrapper = ({ children }) => {

  const { currentCompany } = useContext(RootContext);

  if(!currentCompany) {
    return <LoadingScreen />
  }

  return (
    <>
      <HeaderMain />
      {children}
      <FooterMain companyName={currentCompany?.name} />
    </>
  )
}
