import Link from "next/link";
import { formatPhone } from "@/util/formatting";
import { FaChevronRight } from "react-icons/fa6";
export default function RepairRecord({ repair }) {
  return (
    <tr className='*:even:bg-lime-200 *:border-b-lime-600 *:border-b  *:last:border-b-0 *:text-center'>
      <td>{repair.id}</td>
      <td>{new Date(repair.date).toLocaleDateString("pl-PL")}</td>
      <td>{formatPhone(repair.phone)}</td>
      <td>{repair.status}</td>
      <td>{repair.place}</td>
      <td>
        <Link href={`/serwis/${repair.id}`}>
          <div className='flex items-center content-center'>
            <FaChevronRight />
          </div>
        </Link>
      </td>
    </tr>
  );
}
