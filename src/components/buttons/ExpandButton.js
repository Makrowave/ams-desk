import "./expand-button.css";
export default function ExpandButton({ children, text, onClick, className }) {
  return (
    <button
      className={
        "ex-button flex justify-center items-center p-2 hover:bg-tertiary rounded-xl h-10 w-10 hover:w-40 " + className
      }
      onClick={onClick}
    >
      {children}
      <span>{text}</span>
    </button>
  );
}
