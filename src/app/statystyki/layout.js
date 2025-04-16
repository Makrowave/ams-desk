"use client"
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import {FaBicycle, FaHouse, FaUser} from "react-icons/fa6";
import PrivateRoute from "@/components/routing/PrivateRoute";

export default function AdminLayout({children}) {
  const links = [
    {url: "", icon: <FaHouse/>, title: "Strona główna"},
    {url: "/historia", icon: <FaBicycle/>, title: "Historia"},
    {url: "/serwis", icon: <FaUser/>, title: "Serwis"},
    {url: "/sprzedaz", icon: <FaUser/>, title: "Sprzedaż"},

  ];
  return (
    <PrivateRoute>
      <Navigation active={3}/>
      <main className='flex flex-col ml-16 h-[calc(100vh-48px)] overflow-y-scroll px-8'>
        <SideBar baseUrl={"/statystyki"} links={links}/>
        {children}
      </main>
    </PrivateRoute>
  );
}

