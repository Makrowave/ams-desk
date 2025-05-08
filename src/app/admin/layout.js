"use client"
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import AdminRoute from "@/components/routing/AdminRoute";
import {
  FaBicycle,
  FaBuilding,
  FaCircleInfo,
  FaHouse,
  FaIndustry,
  FaList,
  FaPalette,
  FaRegCircle,
  FaUser,
  FaWrench
} from "react-icons/fa6";
import Modal from "@/components/modals/Modal";

export default function AdminLayout({children}) {
  const links = [
    {url: "", icon: <FaHouse/>, title: "Strona główna"},
    {url: "/rowery", icon: <FaBicycle/>, title: "Rowery"},
    {url: "/pracownicy", icon: <FaUser/>, title: "Pracownicy"},
    {url: "/statusy", icon: <FaCircleInfo/>, title: "Statusy"},
    {url: "/kolory", icon: <FaPalette/>, title: "Kolory"},
    {url: "/kola", icon: <FaRegCircle/>, title: "Koła"},
    {url: "/producenci", icon: <FaIndustry/>, title: "Producenci"},
    {url: "/kategorie", icon: <FaList/>, title: "Kategorie"},
    {url: "/miejsca", icon: <FaBuilding/>, title: "Miejsca"},
    {url: "/serwis", icon: <FaWrench/>, title: "Serwis"},
  ];
  return (
    <AdminRoute>
      <Navigation active={3}/>
      <main className='flex bg-primary ml-16 h-[calc(100vh-48px)] overflow-y-auto'>
        <SideBar baseUrl={"/admin"} links={links}/>
        {children}
      </main>
      <Modal/>
    </AdminRoute>
  );
}

