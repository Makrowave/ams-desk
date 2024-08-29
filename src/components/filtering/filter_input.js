"use client";
import { useState } from 'react';

export default function FilterInput({onChange, className}) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [value, setValue] = useState('');
  function handleChange() {
    if(value == '' || value === null) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }
  return (
    <input className={className} type='text' onChange={e => {setValue(e.target.value); onChange; handleChange()}}></input>
  );
}