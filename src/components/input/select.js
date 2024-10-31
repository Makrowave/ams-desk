import React, { useEffect, useRef, useState } from "react";

/**
 * @param {Object} props - Props for the select
 *  @param {String} props.pKey - Current key (parent's current value)
 * @param {String} props.defaultKey - Key of the default option
 * @param {String} props.defaultValue - Value (text shown) - of the default option
 * @param {String} props.className - Inline tailwindcss styling for the div with selected option
 * @param {(String) => ()} props.onChange - Function that executes when any of the options is selected.
 *  Should be a reference to parent's changeKey function.
 * @param {boolean} props.isColored - Defines if options should be colored or not
 * @param {Array<{string, string, string}>|Array<{string | string}>} props.options -
 *  Array of options. Option's format should be: {key, value} for isColored=false
 *  or {key, value, color} for isColored=true. The object doesn't have to have exact names for keys,
 *  because internal function converts options to specified format.
 * @param {boolean} props.isRow - changes css style
 */
export function Select({ pKey, defaultKey, defaultValue, className, onChange, options, isColored, isRow }) {
  const fOptions = formatOptions();
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(pKey);
  const [value, setValue] = useState(findOption().value);
  const [color, setColor] = useState(findOption().color);
  const prevKey = useRef(key);
  const selectRef = useRef(null);
  //Change shown value when parent changes value externally
  //example: parent's reset function
  useEffect(() => {
    //Prevent infinite loop
    if (pKey !== prevKey.current) {
      setKey(pKey);
      prevKey.current = pKey;
      setValue(findOption().value);
      if (isColored) {
        setColor(findOption().color);
      }
    }
  }, [pKey]);
  function handleClickOutside(event) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   *
   * @returns {Array<{string, string, string}>|Array<{string | string}>} - an array of objects:
   *  {key, value} for isColored=false, {key, value, color} for isColored=true
   */
  function findOption() {
    if(fOptions.find((obj) => obj.key === pKey) === undefined) 
      return {key: defaultKey, value: defaultValue, color: "#FF00FF"} 
    else
      return fOptions.find((obj) => obj.key === pKey);
  }

  function formatOptions() {
    let opt;
    if (options.length > 0) {
      let optLength = Object.keys(options[0]).length;
      if (optLength == 2) {
        opt = options.map((option) => ({
          key: Object.values(option)[0],
          value: Object.values(option)[1],
        }));
        if (defaultKey !== null) opt.unshift({ key: defaultKey, value: defaultValue });
      } else if (optLength == 3) {
        opt = options.map((option) => ({
          key: Object.values(option)[0],
          value: Object.values(option)[1],
          color: Object.values(option)[2],
        }));
        if (defaultKey !== null) opt.unshift({ key: defaultKey, value: defaultValue, color: "#FFFFFF" });
      }
    }
    return opt;
  }

  function handleChange(option) {
    setKey(option.key);
    setValue(option.value);
    if (isColored) {
      setColor(option.color);
    }
    onChange(option.key);
    setIsOpen(false);
  }

  return (
    <div ref={selectRef} className={isRow ? "flex w-1/2 flex-col relative h-8" : "flex flex-1 flex-col relative h-8"}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={"text-center bg-primary border-2 border-tertiary rounded w-full select-none flex h-8"}
      >
        {isColored && <div className='w-9 border-tertiary border-r' style={{ background: color }}></div>}
        <span className='mx-auto'>{value}</span>
        <img src='chevron.png' className='h-1 self-center mr-2' />
      </div>
      {isOpen && (
        <div className='flex flex-1 flex-col border-border border w-full absolute z-10 max-h-44 overflow-auto'>
          {fOptions.map((option) => {
            return <Option key={option.key} isColored={isColored} option={option} onClick={handleChange} />;
          })}
        </div>
      )}
    </div>
  );
}
function Option({ option, isColored, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className='hover:bg-tertiary select-none items-center flex relative bg-primary h-9'
      onClick={() => onClick(option)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isColored && (
        <div
          className='h-9 w-9 border-tertiary border-r'
          style={{
            background: isHovered ? "#b1b7c4" : option.color,
          }}
        ></div>
      )}
      <div
        className={
          isColored
            ? "flex-grow text-center justify-center absolute left-0 w-full"
            : "flex-grow text-center justify-center left-0 w-full"
        }
      >
        <span>{option.value}</span>
      </div>
    </div>
  );
}
