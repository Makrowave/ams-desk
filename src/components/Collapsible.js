import {useEffect, useRef, useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa6";

export default function Collapsible({children, title, className, initialOpen = true}) {
  const [height, setHeight] = useState();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);


  return (
    <div className={`${className} flex flex-col`}>
      <div className={"flex items-start self-start"}>
        <button onClick={() => setIsOpen(!isOpen)} className={"pr-2"}>
          {isOpen ? <FaChevronDown/> : <FaChevronUp/>}
        </button>
        <h2>{title}</h2>
      </div>
      <div style={{height}} ref={contentRef} className="transition-all duration-300 ease-in-out overflow-hidden">
        {children}
      </div>
    </div>
  )
}