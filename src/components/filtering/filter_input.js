"use client";

export default function FilterInput({ onChange, value, title }) {

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center self-start">
        <p>{title}</p>
      </div>
      <input className=" text-center bg-primary border-2 border-tertiary rounded" placeholder="Dowolny" value={value} onChange={onChange}></input>
    </div>
  );
}