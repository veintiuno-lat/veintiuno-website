
// Parse the Spanish date format, e.g. "15 de Agosto, 2025"
export const parseSpanishDate = (dateStr: string): Date => {
  const monthMap: { [key: string]: number } = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };

  const parts = dateStr.toLowerCase().split(' de ');
  if (parts.length === 2) {
    const day = parseInt(parts[0]);
    const monthYear = parts[1].split(', ');
    const month = monthMap[monthYear[0]];
    const year = parseInt(monthYear[1]);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  // Fallback to current date if parsing fails
  return new Date();
};
