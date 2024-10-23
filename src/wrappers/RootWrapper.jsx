import { useContext, useEffect } from 'react';

import { useParams } from 'wouter';
import { Toast } from 'primereact/toast';

import { RootContext } from '../App';
import { companyOptions } from '../helpers';
import { SelectCompanyScreen } from '../screens';
import { FooterMain, HeaderMain } from '../components';

export const RootWrapper = ({ children, toastRef }) => {

  const { currentCompany, handleChangeCompany } = useContext(RootContext);
  const { company } = useParams();

  useEffect(() => {
    handleChangeCompany(companyOptions?.find(t => t?.company == company) ?? null);
  }, [company]);

  if(!currentCompany) {
    return <SelectCompanyScreen />
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
