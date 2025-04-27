import Link from "next/link";
import React from "react";

export function SideBarButton({href, title, current, className, icon, onClick}) {
  return (
    <li
      className={
        current
          ? "w-60 self-center h-10 flex bg-secondary overflow-hidden " + className
          : "w-60 self-center h-10 flex overflow-hidden " + className
      }
    >
      <Link className='w-full flex justify-center h-full' href={href} onClick={onClick}>
        <div className='w-full pl-4 h-full border-t flex justify-center'>
          <div className='w-full flex justify-between items-center'>
            <span className='text-nowrap'>{title}</span>
            <div className='flex w-16 justify-center'>{icon}</div>
          </div>
        </div>
      </Link>
    </li>
  );
}
