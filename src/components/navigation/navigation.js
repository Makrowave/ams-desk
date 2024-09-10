'use client';
import NavButton from "../../components/navigation/nav_button";

const navigation = [
  { name: 'Strona Główna', href: '/' },
  { name: 'Rowery', href: 'rowery' },
  { name: 'Serwis', href: 'serwis'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation({active}) {
  const navItems = navigation.map((item, index) =>
    <NavButton key={item.name} title={item.name} href={item.href} current={active == index}></NavButton>
  )
  return (
    <nav className="">
      <div className="max-w-screen-2xl m-auto flex items-center bg-slate-100 border-b-2 border-slate-300">
        {navItems}
      </div>
    </nav>
  );
}
