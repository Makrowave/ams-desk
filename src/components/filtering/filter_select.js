"use client";

// Children should be <option> element
export default function FilterSelect({ onChange, value, title, children}) {

  return (
    <div className="flex justify-center flex-col py-2">
      <div className="flex justify-center">
        <p>{title}</p>
      </div>
      <div className="flex justify-center items-center py-2">
        <select className="text-black text-center" value={value} onChange={onChange}>
          {children}
        </select>
      </div>
    </div>
  );
}