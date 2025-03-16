import {useState} from "react";
import {FaRegCircleXmark} from "react-icons/fa6";

export default function PartRecord({index, part, changeAmount, deleteFn}) {
  const [localPart, setLocalPart] = useState(part);
  const handleAmountChange = (event) => {
    const value = event.target.value < 0 ? 0 : event.target.value;
    setLocalPart({...localPart, amount: value});
    changeAmount(localPart.partUsedId, value);
  };
  return (
    <tr className='text-center *:p-2 odd:bg-primary'>
      <td>{index + 1}</td>
      <td>{localPart.part.partName}</td>
      <td>{localPart.part.price}</td>
      <td>
        <input
          className='bg-inherit border border-gray-300 rounded-lg w-20 text-center'
          type='number'
          value={localPart.amount}
          onChange={(e) => handleAmountChange(e)}
        />
        {" " + localPart.part.unit.unitName}
      </td>
      <td>{localPart.part.price * localPart.amount}</td>
      <td>
        <button
          className='p-2 hover:bg-gray-200 transition-colors duration-200 rounded-lg'
          onClick={() => deleteFn(part.partUsedId)}
        >
          <FaRegCircleXmark className='text-red-600'/>
        </button>
      </td>
    </tr>
  );
}
