import Link from "next/link";

export default function RepairRecord({ repair }) {
  return (
    <tr>
      <td>{repair.id}</td>
      <td>{repair.date}</td>
      <td>{repair.phone}</td>
      <td>{repair.status}</td>
      <td>{repair.place}</td>
      <td>
        <Link href={`/serwis/${repair.id}`}>Przejdź</Link>
      </td>
    </tr>
  );
}
