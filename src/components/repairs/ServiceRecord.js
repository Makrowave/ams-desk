import { FaRegCircleXmark } from "react-icons/fa6";

export default function ServiceRecord({ index, service, deleteFn }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{service.service.name}</td>
      <td>{service.service.price}</td>
      <td className='flex items-center justify-center'>
        <button className='p-2 hover:bg-gray-200 transition-colors duration-200' onClick={() => deleteFn(service.id)}>
          <FaRegCircleXmark className='text-red-600' />
        </button>
      </td>
    </tr>
  );
}
