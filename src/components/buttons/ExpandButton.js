import "./expand-button.css";

export default function ExpandButton({children, text, onClick, className, disabled, disabledClass = " "}) {
  return (
    <button
      className={
        disabled
          ? `ex-button-disabled flex justify-center items-center p-2 rounded-xl h-10 w-10 ${className} ${disabledClass}`
          : `ex-button flex justify-center items-center p-2 hover:bg-tertiary rounded-xl h-10 w-10 hover:w-48 ${className}`
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      <span className={disabled ? "span-disabled" : "span"}>{text}</span>
    </button>
  );
}
