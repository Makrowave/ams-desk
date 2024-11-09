import PrivateRoute from "@/components/routing/private_route";
import Navigation from "../../components/navigation/navigation";

export default function Serwis() {
  return (
    <PrivateRoute>
      <main>
        <Navigation active={2} />
        <p>Zaplanowane na przyszłość</p>
      </main>
    </PrivateRoute>
  );
}
