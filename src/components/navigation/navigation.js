"use client";
import useAuth from "@/hooks/use_auth";
import NavButton from "../../components/navigation/nav_button";

const navigation = [
  //{ name: 'Strona Główna', href: '/' },
  { name: "Rowery", href: "rowery" },
  //{ name: 'Serwis', href: 'serwis'},
];

export default function Navigation({ active }) {
  const navItems = navigation.map((item, index) => (
    <NavButton key={item.name} title={item.name} href={item.href} current={active == index}></NavButton>
  ));
  const { logout } = useAuth();
  return (
    <nav className=''>
      <div className='max-w-1920 m-auto flex items-center bg-primary border-b-2 border-tertiary'>
        <div className='flex items-center'>{navItems}</div>
        <div className='ml-auto mr-20'>
          <button
            onClick={() => {
              logout();
            }}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </nav>
  );
}
