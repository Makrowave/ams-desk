import Link from "next/link";
import React from "react";
export function SideBarButton({ href, title, current, className }) {
  return (
    <li
      className={
        current
          ? "self-center w-full h-10 flex bg-secondary overflow-hidden " + className
          : "self-center w-full h-10 flex overflow-hidden " + className
      }
    >
      <button className='w-full flex justify-center h-full'>
        <Link className='w-full flex justify-center h-full' href={href}>
          <div className='w-10/12 h-full border-b-2 flex justify-center'>
            <div className='self-center w-full'>
              <span className='text-nowrap text-center self-center'>{title}</span>
            </div>
          </div>
        </Link>
      </button>
    </li>
  );
}
