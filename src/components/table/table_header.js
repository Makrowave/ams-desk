"use client";

import { useRef, useState } from "react";

export default function TableHeader({ singlePlace, setCriterion }) {
  const [active, setActive] = useState(1);
  function handleOptionButton(criterion, id) {
    setActive(id);
    setCriterion(criterion);
  }

  let data = JSON.parse(process.env.NEXT_PUBLIC_PLACES)
    .sort((a, b) => a.placeId - b.placeId)
    .map((place, index) => {
      return (
        <th className={`w-24 ${place.color}`} key={place.placeId}>
          <SortButton
            onClick={handleOptionButton}
            activeId={active}
            id={index + 6}
            value='amount'
            subValue={index + 1}
            defeaultIsAscending={false}
          >
            {place.placeName}
          </SortButton>
        </th>
      );
    });

  return (
    <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
      <tr>
        <th className='w-96 pl-8'>
          <SortButton onClick={handleOptionButton} activeId={active} id={1} value='name'>
            Rower
          </SortButton>
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={2} value='size'>
            Rozmiar
          </SortButton>
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={3} value='wheel'>
            Koła
          </SortButton>
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={4} value='price'>
            Cena
          </SortButton>
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={5} value='total' defeaultIsAscending={false}>
            Ilość
          </SortButton>
        </th>
        {!singlePlace && data}
      </tr>
    </thead>
  );
}

function SortButton({ onClick, activeId, id, value, subValue, defeaultIsAscending = true, children }) {
  const [isAscending, setIsAscending] = useState(defeaultIsAscending);
  function handleChange() {
    console.log(activeId);
    let order = isAscending;
    if (activeId === id) {
      order = !isAscending;
      setIsAscending(order);
    } else {
      order = defeaultIsAscending;
      setIsAscending(defeaultIsAscending);
    }
    let criterion = {
      name: value,
      isAscending: order,
      key: subValue,
    };
    onClick(criterion, id);
  }

  return (
    <button className='w-full' onClick={() => handleChange()}>
      <div className='flex place-content-center'>
        {children}
        {activeId === id && (
          <img className={isAscending ? "h-2 self-center ml-2" : "h-2 self-center ml-2 rotate-180"} src='chevron.png' />
        )}
      </div>
    </button>
  );
}
