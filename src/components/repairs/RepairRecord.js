import Link from "next/link";
import {formatPhone} from "@/util/formatting";
import {FaChevronRight} from "react-icons/fa6";

export default function RepairRecord({repair}) {
  return (
    <tr className='*:even:bg-secondary *:border-b-border *:border-b  *:last:border-b-0 *:text-center'>
      <td>{repair.id}</td>
      <td>{new Date(repair.date).toLocaleDateString("pl-PL")}</td>
      <td>{formatPhone(repair.phoneNumber)}</td>
      <td className={'text-ellipsis'}>{repair.bikeName}</td>
      <td className={'flex items-center justify-center'}>
        <div
          className='w-32 max-w-[8rem] truncate overflow-hidden whitespace-nowrap p-1 rounded-lg'
          style={{backgroundColor: repair.status.color}}
        >
          {repair.status.name}
        </div>
      </td>
      <td>{repair.placeName}</td>
      <td>
        <Link href={`/serwis/${repair.id}`}>
          <div
            className='flex justify-center items-center hover:bg-gray-200 transition-colors duration-200 rounded-lg w-fit h-fit p-1'>
            <FaChevronRight/>
          </div>
        </Link>
      </td>
    </tr>
  );
}
