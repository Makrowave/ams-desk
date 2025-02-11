import RepairRecord from "./RepairRecord";

export default function RepairTable({}) {
  const sampleData = [
    {
      id: 1,
      phone: "909303303",
      bike: "Kross evado",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
    {
      id: 2,
      phone: "303404303",
      bike: "Kross hexagon",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki, sprawdzenie opon, wymiana klocków hamulcowych",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
    {
      id: 3,
      phone: "303404303",
      bike: "Kross hexagon",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki, sprawdzenie opon, wymiana klocków hamulcowych",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
    {
      id: 4,
      phone: "303404303",
      bike: "Kross hexagon",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki, sprawdzenie opon, wymiana klocków hamulcowych",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
  ];

  return (
    <div>
      <table className='w-[1000px] border-separate border-spacing-0 border-lime-600 border rounded-lg *:*:*:p-4'>
        <thead>
          <tr className=' *:bg-lime-300'>
            <th className='rounded-tl-lg'>Nr.</th>
            <th>Data</th>
            <th>Telefon</th>
            <th>Status</th>
            <th>Miejsce</th>
            <th className='rounded-tr-lg'></th>
          </tr>
        </thead>
        <tbody className=''>
          {sampleData.map((row, index) => (
            <RepairRecord last={index === sampleData.length - 1} repair={row} key={row.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
