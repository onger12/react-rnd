export const handleToastError = ({ detail, life = 5000, ref, summary = 'Error' }) => {
  if(ref?.current) {
    ref?.current?.show({ detail, severity : 'error', summary, life });
  } else if(ref?.show) {
    ref?.show({ detail, severity : 'error', summary, life });
  } else {
    console.error('Error al mostrar el mensaje mediante el toast: toastRef no es una referencia válida.');
  }
}

export const handleToastDone = ({ detail, life = 2000, ref, summary = '¡Hecho!' }) => {
  if(ref?.current) {
    ref?.current?.show({ detail, severity : 'success', summary, life });
  } else if(ref?.show) {
    ref?.show({ detail, severity : 'success', summary, life });
  } else {
    console.error('Error al mostrar el mensaje mediante el toast: toastRef no es una referencia válida.');
  }
}

export const handleToastMsg = ({ detail, life = 2000, ref, summary, severity }) => {
  if(ref?.current) {
    ref?.current?.show({ detail, severity, summary, life });
  } else if(ref?.show) {
    ref?.show({ detail, severity, summary, life });
  } else {
    console.error('Error al mostrar el mensaje mediante el toast: toastRef no es una referencia válida.');
  }
}