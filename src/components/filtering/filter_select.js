"use client";

import { Select } from "../input/select";

// Children should be <option> element
export default function FilterSelect({ onChange, value, title, defaultKey, defaultValue, options, isColored }) {
  return (
    <div className='flex justify-center flex-col'>
      <div className='flex justify-center self-start'>
        <p>{title}</p>
      </div>
      <div className='flex justify-center items-center self-start w-full'>
        <Select
          pKey={value}
          defaultKey={defaultKey}
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          isColored={isColored}
        />
      </div>
    </div>
  );
}
