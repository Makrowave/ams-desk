import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "../../components/navigation/Navigation";
import RepairTable from "@/components/repairs/RepairTable";

export default function Serwis() {
  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main>
        <div className='main-div bg-gray-200 px-12 py-6 flex-col items-center'>
          <div className='mt-4 bg-white rounded-xl p-8 w-fit'>
            <RepairTable />
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}
