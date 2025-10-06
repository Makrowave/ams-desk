import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "@/components/navigation/Navigation";

export default function DeliveriesLayout({children}) {
  return (
    <PrivateRoute>
      <Navigation active={5}/>
      {children}
    </PrivateRoute>
  );
}