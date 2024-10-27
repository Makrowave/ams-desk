export default function ExternalLink({ href, disabled, className, children }) {
  return (
    <a
      href={href}
      className={className}
      target='_blank'
      style={{
        pointerEvents: disabled ? "none" : "auto",
        color: disabled ? "inherit" : "blue",
        textDecoration: disabled ? "none" : "underline",
        cursor: disabled ? "not-allowed" : "pointer",
        textDecoration: "none",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </a>
  );
}
