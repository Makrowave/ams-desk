"use client";
import { SideBarButton } from "./side_bar_button";
import { useState } from "react";

export default function SideBar({ baseUrl, active }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className='flex flex-col w-48 absolute z-40'>
      <div
        className={
          isClicked
            ? " bg-primary flex border-r-2 border-t-2 border-border rounded-tr-xl"
            : "w-12 bg-primary flex border-r-2 border-t-2 border-b-2 border-border rounded-tr-xl rounded-br-xl"
        }
      >
        <button
          className='w-full flex content-center justify-center h-10 mx-3'
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          {isClicked && <span className='text-2xl self-center'>Zakładki</span>}
          <img
            src='/sidebar.png'
            className={isClicked ? "self-center w-8 ml-auto" : "self-center w-8"}
          />
        </button>
      </div>
      {isClicked && (
        <div className='flex bg-primary border-border border-r-2 border-b-2 w-full justify-center rounded-br-xl content-center'>
          <ul className='w-full last:rounded-br-xl'>
            <SideBarButton href={baseUrl} title='Strona główna' current={active === 0} />
            <SideBarButton href={baseUrl + "/rowery"} title='Rowery' current={active === 1} />
            <SideBarButton
              href={baseUrl + "/pracownicy"}
              title='Pracownicy'
              current={active === 2}
            />
            <SideBarButton href={baseUrl + "/statusy"} title='Statusy' current={active === 3} />
            <SideBarButton href={baseUrl + "/kolory"} title='Kolory' current={active === 4} />
            <SideBarButton href={baseUrl + "/kola"} title='Koła' current={active === 5} />
            <SideBarButton
              href={baseUrl + "/producenci"}
              title='Producenci'
              current={active === 6}
            />
            <SideBarButton
              href={baseUrl + "/kategorie"}
              title='Kategorie'
              current={active === 7}
              className={"rounded-br-xl"}
            />
          </ul>
        </div>
      )}
    </div>
  );
}
