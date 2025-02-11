"use client";
import Navigation from "@/components/navigation/navigation";
import Repair from "@/components/repairs/Repair";
import PrivateRoute from "@/components/routing/private_route";

export default function RepairPage({ params }) {
  const { id } = params;
  const repair = sampleData.find((item) => item.id.toString() === id.toString());
  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main>
        <div className='main-div bg-gray-200 px-12 py-6'>
          <Repair repair={repair} />
        </div>
      </main>
    </PrivateRoute>
  );
}

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
