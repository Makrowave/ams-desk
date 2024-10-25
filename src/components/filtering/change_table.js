import { useState } from "react";

// Despite the name, it selects table or rather changes the query
export default function ChangeTable({ changePlaceId }) {
  const [active, setActive] = useState(0);
  const places = JSON.parse(process.env.NEXT_PUBLIC_PLACES);

  function handleClick(index) {
    changePlaceId(index);
    setActive(index);
  }

  return (
    <div className='flex *:px-5 '>
      {places.map((place, index) => (
        <ChangeTableButton
          key={place.placeId}
          title={place.placeName}
          isActive={index === active}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

function ChangeTableButton({ isActive, title, onClick }) {
  return (
    <button
      className={
        isActive ? "bg-secondary rounded-t-lg h-10 hover:bg-tertiary" : "bg-primary rounded-t-lg h-10 hover:bg-tertiary"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
}
