export const dateFormat = ({date, takeTime, onlyTime, specialDayOfWeekOnly}) => {
  const initialDate = typeof date == "number" ? new Date(date) : date;
  if(initialDate == null || (typeof initialDate == "string" && initialDate?.length == 0)) return null;

  let finalDate = "";

  if(typeof initialDate == typeof new Date() && initialDate?.toISOString()) {
    finalDate = initialDate.toISOString().split('T')[0].slice(0, 10);
  }

  if(typeof initialDate == "string") {
    finalDate = initialDate.slice(0, 10);
  }

  if(takeTime) {
    if(typeof initialDate == typeof new Date()) {
      finalDate += ` ${initialDate.toISOString().split('T')[1].slice(0, 8)}`;
    } else if(typeof initialDate == "string" && initialDate?.includes('T')) {
      finalDate += ` ${initialDate.split('T')[1].slice(0, 8)}`;
    }
  }

  if(onlyTime) {
    if(typeof initialDate == typeof new Date()) {
      return initialDate.toISOString().split('T')[1].slice(0, 8);
    } else if(typeof initialDate == "string" && initialDate?.includes('T')) {
      return initialDate.split('T')[1].slice(0, 8)
    };
  }

  if(specialDayOfWeekOnly) {
    const today = new Date();
    const d = typeof initialDate == typeof new Date() ? initialDate : (typeof initialDate == "string" ? new Date(initialDate) : null);

    if(d == null) {
      return "No se pudo formatear la fecha. Fecha no válida o vacía.";
    }

    if (d.getDate() == today.getDate()) {
      return "Hoy";
    } else if((today.getDate() - d.getDate()) == 1) {
      return "Ayer";
    } else if((today.getDate() - d.getDate()) == 2) {
      return "Anteayer";
    } else {
      return `${daysOfWeekNames[d.getDay()]} ${d.getDate()} ${d.getMonth != today.getMonth() ? `de ${monthsNames[d.getMonth()]}` : ''}`;
    }
  }

  return finalDate;
}

export const monthsNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const daysOfWeekNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
]