
export const handleGetRelatedDataKeyPlural = ({ relatedDataId }) => {
  if(typeof relatedDataId != 'string') return '';

  const [l] = relatedDataId?.trim()?.split('Id');
  return `${l}s`;
}