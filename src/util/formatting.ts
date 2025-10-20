export const formatPhone = (phone: string) => {
  if (phone === undefined) return '';
  return [...phone]
    .map((c, index) => ((index + 1) % 3 === 0 ? c + ' ' : c))
    .join('');
};
