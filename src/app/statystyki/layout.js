"use client"
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import {FaChartSimple, FaClock, FaHouse, FaScrewdriverWrench} from "react-icons/fa6";
import PrivateRoute from "@/components/routing/PrivateRoute";

export default function AdminLayout({children}) {
  const links = [
    {url: "", icon: <FaHouse/>, title: "Strona główna"},
    {url: "/historia", icon: <FaClock/>, title: "Historia"},
    {url: "/serwis", icon: <FaScrewdriverWrench/>, title: "Serwis"},
    // {url: "/sprzedaz", icon: <FaMoneyBill/>, title: "Sprzedaż"},
    {url: "/kategorie", icon: <FaChartSimple/>, title: "Kategorie"},
    // {url: "/ebike", icon: <FaBolt/>, title: "E-Bike"},

  ];
  return (
    <PrivateRoute>
      <Navigation active={3}/>
      <main className='flex flex-col ml-16 h-[calc(100vh-48px)] overflow-y-scroll px-8 relative'>
        <SideBar baseUrl={"/statystyki"} links={links}/>
        {children}
      </main>
    </PrivateRoute>
  );
}

