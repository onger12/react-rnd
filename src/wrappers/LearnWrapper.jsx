import { useContext, useEffect } from "react";

import { useParams } from "wouter";
import { Toast } from "primereact/toast";

import { RootContext } from "../App";
import { HeaderLearn } from "../components";
import { companyOptions } from "../helpers";

export const LearnWrapper = ({ children, px = 4, toastRef }) => {

  const { handleChangeCompany } = useContext(RootContext);
  const { company } = useParams();

  useEffect(() => {
    handleChangeCompany(companyOptions?.find(t => t?.company == company) ?? null);
  }, [company]);

  return (
    <>
      <HeaderLearn />
      <div className={`px-${px}`}>
        {children}
      </div>

      <Toast ref={toastRef} />
    </>
  )
}
