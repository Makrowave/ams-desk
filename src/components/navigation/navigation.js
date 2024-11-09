"use client";
import useAuth from "@/hooks/use_auth";
import NavButton from "../../components/navigation/nav_button";
import UserDropdown from "./user_dropdown";

const navigation = [
  // { name: "Strona Główna", href: "/", id: 0},
  { name: "Rowery", href: "rowery", id: 1 },
  //{ name: 'Serwis', href: 'serwis', id: 2},
];

export default function Navigation({ active }) {
  const navItems = navigation.map((item) => (
    <NavButton key={item.id} title={item.name} href={item.href} current={active == item.id}></NavButton>
  ));

  return (
    <nav className=''>
      <div className='max-w-1920 m-auto flex items-center bg-primary border-b-2 border-tertiary h-12'>
        <div className='flex items-center h-full'>{navItems}</div>
        <div className='ml-auto h-full'>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
