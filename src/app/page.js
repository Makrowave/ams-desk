import Navigation from "../components/navigation/navigation";
import PrivateRoute from "@/components/routing/private_route";

export default function Home() {
  return (
    <PrivateRoute>
      <main>
        <Navigation active={0} />
      </main>
    </PrivateRoute>
  );
}
