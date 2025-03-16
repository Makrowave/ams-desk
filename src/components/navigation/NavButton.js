"use client";

import Link from "next/link";
import SavedDataWarning from "./SavedDataWarning";

export default function NavButton({href, title, current}) {
  return (
    <div className={current ? "bg-secondary px-5 h-full flex" : "px-5 h-full flex"}>
      <Link className='text-2xl self-center' href={href}>
        <SavedDataWarning>{title}</SavedDataWarning>
      </Link>
    </div>
  );
}
