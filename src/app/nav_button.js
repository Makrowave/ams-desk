export default function NavButton({href, title, current}) {
  return(
    <div className={current ? "navButtonCurrent" : "navButton"}>
      <a href={href}>{title}</a>
      </div>
  );
}