/*
    Esta función recibe una fecha y la formatea en el formato 'YYYY-MM-DD HH:MM'.
    Recibe como parámetro la fecha.
    Retorna la fecha formateada.
*/
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/*
    Esta función recibe una fecha y la formatea en el formato 'YYYY-MM'.
    Recibe como parámetro la fecha.
    Retorna la fecha formateada.
*/
export const formatDateYearMonth = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}`;
};