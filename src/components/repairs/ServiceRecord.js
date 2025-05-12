import {FaRegCircleXmark} from "react-icons/fa6";

export default function ServiceRecord({index, service, deleteFn}) {
  return (
    <tr className='text-center *:p-2 odd:bg-primary'>
      <td>{index + 1}</td>
      <td>{service.service.serviceName}</td>
      <td>{service.price.toFixed(2)} ({service.service.price.toFixed(2)})</td>
      <td className='flex items-center justify-center'>
        <button
          className='p-2 hover:bg-gray-200 transition-colors duration-200 rounded-lg'
          onClick={() => deleteFn(service.serviceDoneId)}
        >
          <FaRegCircleXmark className='text-red-600'/>
        </button>
      </td>
    </tr>
  );
}
