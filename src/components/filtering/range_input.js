

export default function RangeInput({minValue, maxValue, title, minOnChange, maxOnChange}) {



  return(
    <div className="flex justify-center flex-col">
      <div className="flex justify-center self-start">
        <p>{title}</p>
      </div>
      <div className="flex justify-items-center">
        <input className="text-black text-center bg-primary border-2 border-tertiary rounded w-2/5 block" placeholder="min" value={minValue} onChange={minOnChange}></input>
        <span className="m-auto block">-</span>
        <input className="text-black text-center bg-primary border-2 border-tertiary rounded w-2/5 block" placeholder="max" value={maxValue} onChange={maxOnChange}></input>
      </div>
    </div>
  )
}