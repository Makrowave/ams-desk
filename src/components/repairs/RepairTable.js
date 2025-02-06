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
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Data</th>
            <th>Telefon</th>
            <th>Status</th>
            <th>Miejsce</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row) => (
            <RepairRecord repair={row} key={row.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
