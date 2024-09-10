"use client";

export default function FilterInput({ onChange, value, title }) {

  return (
    <div className="flex justify-center flex-col py-2">
      <div className="flex justify-center">
        <p>{title}</p>
      </div>
      <input className="text-black text-center bg-primary border-2 border-tertiary rounded-l" placeholder="Dowolny" value={value} onChange={onChange}></input>
    </div>
  );
}