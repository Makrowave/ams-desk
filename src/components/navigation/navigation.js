'use client';
import useAuth from "@/hooks/use_auth";
import NavButton from "../../components/navigation/nav_button";

const navigation = [
  { name: 'Strona Główna', href: '/' },
  { name: 'Rowery', href: 'rowery' },
  { name: 'Serwis', href: 'serwis'},
]

export default function Navigation({active}) {
  const navItems = navigation.map((item, index) =>
    <NavButton key={item.name} title={item.name} href={item.href} current={active == index}></NavButton>
  )
  const { logout } = useAuth();
  return (
    <nav className="">
      <div className="max-w-1920 m-auto flex items-center bg-primary border-b-2 border-tertiary">
        {navItems}
        <button onClick={()=>{logout()}}>Wyloguj</button>
      </div>
    </nav>
  );
}
