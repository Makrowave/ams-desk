"use client";
import Modal from "@/components/modals/modal";
import Navigation from "@/components/navigation/navigation";
import SideBar from "@/components/navigation/side_bar";
import AdminRoute from "@/components/routing/admin_route";
import useAuth from "@/hooks/use_auth";
import Link from "next/link";

export default function AdminPanel() {
  const { admin } = useAuth();
  return (
    <AdminRoute>
      <Navigation active={3} />
      <main>
        <SideBar baseUrl={"/admin"} active={0}></SideBar>
        <div className='main-div bg-primary px-12 py-6'>
          <h2 className='text-3xl'>Witaj {admin.username}!</h2>
          <p>Skorzystaj z paska bocznego do nawigacji lub przejdź do stron z panelu:</p>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/rowery"}>
              Rowery
            </Link>
            <p>Tabelka z rowerami z możliwością usuwania modeli</p>
          </div>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/pracownicy"}>
              Pracownicy
            </Link>
            <p>Zarządzanie pracownikami i kontami</p>
          </div>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/statusy"}>
              Statusy
            </Link>
            <p>Zarządzanie statusami</p>
          </div>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/kolory"}>
              Kolory
            </Link>
            <p>Zarządzanie grupami kolorów</p>
          </div>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/kola"}>
              Koła
            </Link>
            <p>Zarządzanie rozmiarami kół</p>
          </div>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/producenci"}>
              Producenci
            </Link>
            <p>Zarządzanie producetami rowerów</p>
          </div>
          <div className='mt-4 border-b border-border w-1/2'>
            <Link className='text-blue-600 underline text-2xl' href={"/admin/kategorie"}>
              Kategorie
            </Link>
            <p>Zarządzanie kategoriami rowerów</p>
          </div>
        </div>
      </main>
      <Modal />
    </AdminRoute>
  );
}
