import { useState } from "react"


// Despite the name, it selects table or rather changes the query
export default function ChangeTable({ changePlaceId }) {

  const [active, setActive] = useState(0);

  const places = [
    { id: 0, name: 'Wszystkie' },
    { id: 1, name: 'Wojc' },
    { id: 2, name: 'Gala' },
    { id: 3, name: 'Gęsia' },
    { id: 4, name: 'Mag A' },
    { id: 5, name: 'Mag B' },
    { id: 6, name: 'Mag D' },
  ]

  function handleClick(index) {
    changePlaceId(index);
    setActive(index);
  }

  return (
    <div className="flex *:px-5 ">
      {
        places.map((place, index) => (
          <ChangeTableButton key={place.id} title={place.name} isActive={index === active} onClick={() => handleClick(index)} />
        ))
      }
    </div>
  )
}




function ChangeTableButton({ isActive, title, onClick }) {
  return (
    <button className={
      isActive
        ? 'bg-secondary rounded-t-lg h-10'
        : 'bg-primary'
    }
      onClick={onClick}
    >
      {title}
    </button>
  )
}