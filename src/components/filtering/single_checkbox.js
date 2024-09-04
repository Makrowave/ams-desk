"use client";

export default function SingleCheckbox({ onChange, checked, title }) {

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center py-2">
        <input className="text-black text-center size-6" type="checkbox" checked={checked} onChange={onChange}></input>
        <p className="pl-2"> {title} </p>
      </div>
    </div>
  );
}