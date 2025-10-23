import { useState } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { Part, PartUsed } from '../../types/repairTypes';

type PartRecordProps = {
  index: number;
  part: PartUsed;
  changeAmount: (partUsedId: number, amount: number) => void;
  deleteFn: (partUsedId: number) => void;
};

const PartRecord = ({
  index,
  part,
  changeAmount,
  deleteFn,
}: PartRecordProps) => {
  const [localPart, setLocalPart] = useState(part);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      Number(event.target.value) < 0 ? 0 : Number(event.target.value);
    setLocalPart({ ...localPart, amount: value });
    changeAmount(localPart.id, value);
  };
  return (
    <tr className="text-center *:p-2 odd:bg-primary">
      <td>{index + 1}</td>
      <td>{localPart.part?.name}</td>
      <td>
        {localPart.price.toFixed(2)} ({localPart.part?.price.toFixed(2)})
      </td>
      <td>
        <input
          className="bg-inherit border border-gray-300 rounded-lg w-20 text-center"
          type="number"
          value={localPart.amount}
          onChange={(e) => handleAmountChange(e)}
        />
        {' ' + localPart.part?.unit?.name}
      </td>
      <td>{(localPart.price * localPart.amount).toFixed(2)}</td>
      <td>
        <button
          className="p-2 hover:bg-gray-200 transition-colors duration-200 rounded-lg"
          onClick={() => deleteFn(part.id)}
        >
          <FaRegCircleXmark className="text-red-600" />
        </button>
      </td>
    </tr>
  );
};

export default PartRecord;
