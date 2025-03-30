export const REGEX = {
  ADMIN_ROUTE: /admin/,
  NAME: /^[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]{1,15}$/,
  COLOR: /^#[A-Fa-f0-9]{6}$/,
  PRICE: /^[0-9]{3,5}$/,
  MODEL_NAME: /^[a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ. \_\-]{4,50}$/,
  EAN: /^[0-9]{13}$/,
  PRODUCT_NAME: /^[a-zA-Z0-9\_\-]{4,30}$/,
  FRAME: /^[0-9]{1,2}$/,
  PHONE: /^[0-9]{9}$/,
  POLISH_TEXT: /^[A-Za-ząęćłńóśżźĄĘĆŁŃÓŚŻŹ0-9.,;:!?\"\n'()\\\-– ]+$/,
};
