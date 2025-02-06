import { useState } from "react";

export default function PartRecord({ index, part, updateItem, deleteItem }) {
  const [localPart, setLocalPart] = useState(part);

  const setName = (value) => {
    //Validate
    setLocalPart({ ...localPart, name: value });
  };
  const setPrice = (value) => {
    //Validate
    setLocalPart({ ...localPart, price: value });
  };
  const setAmount = (value) => {
    //Validate
    setLocalPart({ ...localPart, amount: value });
  };
  const setUnit = (value) => {
    //Validate
    setLocalPart({ ...localPart, unit: value });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input type='text' placeholder='nazwa' value={localPart.name} onChange={(value) => setName(value)} />
      </td>
      <td>
        <input type='number' placeholder='cena' value={localPart.name} onChange={(value) => setPrice(value)} />
      </td>
      <td>
        <input type='number' placeholder='ilosc' value={localPart.name} onChange={(value) => setName(value)} />
      </td>
      <td>//Select - unit</td>
      <td>
        <button>Usuń</button>
      </td>
    </tr>
  );
}
