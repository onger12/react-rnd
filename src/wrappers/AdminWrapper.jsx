import { useContext, useEffect } from 'react';

import { useParams } from 'wouter';
import { Toast } from 'primereact/toast';

import { RootContext } from '../App';
import { HeaderAdmin } from '../components';
import { companyOptions } from '../helpers';
import { AuthMiddleware } from '../middlewares';

export const AdminWrapper = ({ children, toastRef }) => {
  
  const { handleChangeCompany } = useContext(RootContext);
  const { company } = useParams();

  useEffect(() => {
    handleChangeCompany(companyOptions?.find(t => t?.company == company) ?? null);
  }, [company]);

  return (
    <AuthMiddleware>
      <HeaderAdmin />
      {children}

      <Toast ref={toastRef} />
    </AuthMiddleware>
  )
}
