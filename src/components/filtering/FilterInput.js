"use client";

import { useEffect, useState, useRef } from "react";

//Input field that updates passed value with onChange function
//after a timeout when last character is changed.
//Should be used in filtering and only in filtering to prevent creation of
//multiple queries for every single letter of for example name.
//If used in modyfing params which are passed to be sent later,
//it might cause to send the old state value.
export default function FilterInput({ setValue, value, title }) {
  const [realValue, setRealValue] = useState(value);
  const prevValue = useRef(realValue);

  //Change shown value when parent changes value externally
  //example: parent's reset function
  useEffect(() => {
    //Prevent infinite loop
    if (value !== prevValue.current) {
      setRealValue(value);
      prevValue.current = value;
    }
  }, [value]);

  //Delayed change
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(realValue);
      prevValue.current = realValue;
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [realValue]);

  return (
    <div className='flex justify-center flex-col'>
      <div className='flex justify-center self-start'>
        <p>{title}</p>
      </div>
      <input
        className='text-center bg-primary border-2 border-tertiary rounded'
        placeholder='Dowolny'
        value={realValue}
        onChange={(e) => {
          setRealValue(e.target.value);
        }}
      ></input>
    </div>
  );
}
