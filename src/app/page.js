import Navigation from "../components/navigation/Navigation";
import PrivateRoute from "@/components/routing/PrivateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <Navigation active={0} />
      <main></main>
    </PrivateRoute>
  );
}
