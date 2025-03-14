"use client";
import NavButton from "./NavButton";
import UserDropdown from "./UserDropdown";
import {usePathname} from "next/navigation";

const navigation = [
    {name: "Strona Główna", href: "/", links: [""]},
    {name: "Rowery", href: "/rowery", links: ["rowery"]},
    {name: "Serwis", href: "/serwis", links: ["serwis"]},
    {name: "Zarządzanie", href: "/adminlogin", links: ["adminlogin", "admin"]},
];

export default function Navigation() {
    const path = usePathname().split("/")[1];
    const navItems = navigation.map((item) => (
        <NavButton key={item.id} title={item.name} href={item.href} current={item.links.includes(path)}/>
    ));

    return (
        <nav className='shadow-md z-40 relative'>
            <div className='m-auto flex items-center bg-white h-12 shadow-md'>
                <div className='flex items-center h-full'>{navItems}</div>
                <div className='ml-auto h-full'>
                    <UserDropdown/>
                </div>
            </div>
        </nav>
    );
}
