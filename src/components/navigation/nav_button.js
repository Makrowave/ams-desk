'use client';

import Link from "next/link";

export default function NavButton({href, title, current}) {
  return(
    <div className={current ? "bg-tertiary px-5" : "px-5"}>
      <Link href={href} replace={true}>{title}</Link>
      </div>
  );
}