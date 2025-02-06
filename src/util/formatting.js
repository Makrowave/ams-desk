export const formatPhone = (phone) => {
  return [...phone].map((c, index) => ((index + 1) % 3 === 0 ? c + " " : c)).join("");
};
