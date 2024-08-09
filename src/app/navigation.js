import NavButton from "./nav_button";


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
    <NavButton key={item.title} title={item.name} href={item.href} current={item.current}></NavButton>
  )
  return (
    <nav className="flex gap-x-10">{navItems}</nav>
  );
}
