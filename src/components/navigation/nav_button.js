'use client';

import Link from "next/link";

export default function NavButton({href, title, current}) {
  return(
    <div className={current ? "bg-secondary px-5" : "px-5"}>
      <Link className="text-2xl" href={href}>{title}</Link>
    </div>
  );
}