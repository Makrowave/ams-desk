'use client';
export default function NavButton({href, title, current}) {
  return(
    <div className={current ? "bg-slate-300 px-5" : "px-5"}>
      <a href={href}>{title}</a>
      </div>
  );
}