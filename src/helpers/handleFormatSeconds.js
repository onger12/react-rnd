export const handleFormatSeconds = ({ secs, fullLabel = false }) => {
  if(Number.isNaN(secs / 1)) return 'Sin duración';
  const mins = Math.ceil(secs / 60);

  if(mins < 60) return `${mins} ${fullLabel ? ' minutos' : ' min'}`;
  return `${Math.ceil(mins / 60)} ${fullLabel ? ' horas' : ' h'}`;
}