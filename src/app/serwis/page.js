import PrivateRoute from "@/components/routing/private_route";
import Navigation from "../../components/navigation/navigation";
import RepairTable from "@/components/repairs/RepairTable";

export default function Serwis() {
  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main>
        <div className='main-div bg-primary px-12 py-6'>
          <RepairTable />
        </div>
      </main>
    </PrivateRoute>
  );
}
