'use client';
import NavButton from "../../components/navigation/nav_button";

const navigation = [
  { name: 'Strona Główna', href: '/', current: true },
  { name: 'Rowery', href: 'rowery', current: false },
  { name: 'Serwis', href: 'serwis', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const navItems = navigation.map(item =>
    <NavButton key={item.name} title={item.name} href={item.href} current={item.current}></NavButton>
  )
  return (
    <nav className="">
      <div className="max-w-screen-2xl m-auto flex gap-x-10 items-center bg-slate-100 px-10 border-b-2 border-slate-300">
        {navItems}
      </div>
    </nav>
  );
}
