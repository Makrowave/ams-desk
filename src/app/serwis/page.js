import PrivateRoute from "@/components/routing/private_route";
import Navigation from "../../components/navigation/navigation";

export default function Serwis() {
  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main>
        <p>Zaplanowane na przyszłość</p>
      </main>
    </PrivateRoute>
  );
}
