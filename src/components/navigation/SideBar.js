"use client";
import {
    FaBicycle,
    FaChevronLeft,
    FaChevronRight,
    FaCircleInfo,
    FaHouse,
    FaIndustry,
    FaList,
    FaPalette,
    FaRegCircle,
    FaUser,
    FaWrench,
} from "react-icons/fa6";
import {SideBarButton} from "./SideBarButton";
import {useState} from "react";
import {usePathname} from "next/navigation";

export default function SideBar({baseUrl}) {
    const [isClicked, setIsClicked] = useState(false);
    const path = usePathname();
    return (
        <div
            className={
                isClicked
                    ? "fixed z-[31] h-full duration-300 transition-all -left-44 translate-x-44"
                    : "fixed z-[31] h-full duration-300 transition-all -left-44"
            }
        >
            <div className='flex w-fit justify-center content-center h-full bg-primary border-r border-border'>
                <ul className='w-fit h-full pt-2'>
                    <li className='flex w-full h-10'>
                        <button className='flex items-center justify-between w-full'
                                onClick={() => setIsClicked(!isClicked)}>
                            <span className='ml-4'>Zakładki</span>
                            {isClicked ? <FaChevronLeft className='w-16'/> : <FaChevronRight className='w-16'/>}
                        </button>
                    </li>
                    {links.map((item) => (
                        <SideBarButton
                            href={baseUrl + item.url}
                            title={item.title}
                            icon={item.icon}
                            current={path === baseUrl + item.url}
                            key={item.url}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

const links = [
    {url: "", icon: <FaHouse/>, title: "Strona główna"},
    {url: "/rowery", icon: <FaBicycle/>, title: "Rowery"},
    {url: "/pracownicy", icon: <FaUser/>, title: "Pracownicy"},
    {url: "/statusy", icon: <FaCircleInfo/>, title: "Statusy"},
    {url: "/kolory", icon: <FaPalette/>, title: "Kolory"},
    {url: "/kola", icon: <FaRegCircle/>, title: "Koła"},
    {url: "/producenci", icon: <FaIndustry/>, title: "Producenci"},
    {url: "/kategorie", icon: <FaList/>, title: "Kategorie"},
    {url: "/serwis", icon: <FaWrench/>, title: "Serwis"},
];
