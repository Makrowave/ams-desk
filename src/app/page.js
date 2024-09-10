import Image from "next/image";
import Example from "../components/navigation/navigation";
import Navigation from "../components/navigation/navigation";

export default function Home() {
  return (
    <main>
      <Navigation active={0}/>
    </main>
  );
}
