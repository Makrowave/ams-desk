import Navigation from "../components/navigation/Navigation";
import PrivateRoute from "@/components/routing/PrivateRoute";
import FavoritesTable from "@/components/table/favorite/FavoritesTable";

export default function Home() {


  return (
    <PrivateRoute>
      <Navigation/>
      <main className="p-4">
        <section className="flex flex-col p-4 bg-white w-full rounded-2xl">
          <h2 className="text-2xl"><b>Niski stan</b></h2>
          <div className="max-h-[600px] shadow-2xl w-fit rounded-b-lg overflow-y-auto">
            <FavoritesTable/>
          </div>
        </section>
      </main>
    </PrivateRoute>
  );
}
