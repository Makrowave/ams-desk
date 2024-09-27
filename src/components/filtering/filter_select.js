"use client";

// Children should be <option> element
export default function FilterSelect({ onChange, value, title, children}) {

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center self-start">
        <p>{title}</p>
      </div>
      <div className="flex justify-center items-center self-start w-full">
        <select className="text-black text-center bg-primary border-2 border-tertiary rounded w-full" value={value} onChange={onChange}>
          {children}
        </select>
      </div>
    </div>
  );
}