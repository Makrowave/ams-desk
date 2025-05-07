"use client";

import {DataSelect} from "../input/DataSelect";

export default function FilterSelect({onChange, value, title, defaultValue, defaultLabel, options}) {
  return (
    <div className='flex justify-center flex-col'>
      <DataSelect
        label={title}
        value={value}
        defaultValue={defaultValue}
        defaultLabel={defaultLabel}
        onChange={onChange}
        options={options}
      />
    </div>
  );
}
