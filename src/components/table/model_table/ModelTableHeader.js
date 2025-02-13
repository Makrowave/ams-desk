"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

/**
 * ModelTable's header. It consists of sortable buttons generated
 * from .env NEXT_PUBLIC_PLACES.
 * @param {Object} props - Props
 * @param {boolean} props.singlePlace - value that specifies if data shown should be for
 *  one specific place or all places. If false - data generated from .env won't render.
 * @param {({name: string, isAscending: boolean, key: number}) => (void)} props.setCriterion - Reference to parent's function used to
 *  set sorting criterion. For criterion object refer to ModelTable.
 */
export default function ModelTableHeader({ singlePlace, setCriterion }) {
  const [active, setActive] = useState(1);
  function handleOptionButton(criterion, id) {
    setActive(id);
    setCriterion(criterion);
  }

  //Map of places from .env to sortable buttons
  let tableHeaders = JSON.parse(process.env.NEXT_PUBLIC_PLACES)
    .sort((a, b) => a.placeId - b.placeId)
    .map((place, index) => {
      return (
        <th className={`w-24 ${place.color}`} key={place.placeId}>
          <SortButton
            onClick={handleOptionButton}
            activeId={active}
            id={index + 6}
            criterionName='amount'
            subValue={index + 1}
            defeaultIsAscending={false}
            title={place.placeName}
          />
        </th>
      );
    });

  return (
    <thead className='bg-secondary mb-px sticky top-0 z-5 shadow-lg h-10'>
      <tr>
        {/* Standard buttons */}
        <th className='w-96 pl-8'>
          <SortButton onClick={handleOptionButton} activeId={active} id={1} criterionName='name' title='Rower' />
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={2} criterionName='size' title='Rozmiar' />
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={3} criterionName='wheel' title='Koła' />
        </th>
        <th className='w-24'>
          <SortButton onClick={handleOptionButton} activeId={active} id={4} criterionName='price' title='Cena' />
        </th>
        <th className='w-24'>
          <SortButton
            onClick={handleOptionButton}
            activeId={active}
            id={5}
            criterionName='total'
            title='Ilość'
            defeaultIsAscending={false}
          />
        </th>
        {/* Mapped buttons */}
        {!singlePlace && tableHeaders}
      </tr>
    </thead>
  );
}

/**
 * @param {Object} props - Props
 * @param {(criterion: {name: string, isAscending: boolean, key: number}, id: number) => (void)} props.onClick -
 *  Reference to function that should set active button to 'id' in parent and
 *  set criterion in parent.
 * @param {number} props.activeId - Active button's id in parent.
 * @param {string} props.criterionName - Criterion's name.
 * @param {subValue} props.subValue - Criterion's key.
 * @param {subValue} props.defeaultIsAscending - Default value for isAscending's value. True (ascending) by default.
 * @param {subValue} props.title - Button's title
 */
function SortButton({ onClick, activeId, id, criterionName, subValue, defeaultIsAscending = true, title }) {
  const [isAscending, setIsAscending] = useState(defeaultIsAscending);
  /**
   * If not pressed - sets order to default and button to active.
   * If pressed - reverses ordering.
   * Calls onClick.
   */
  function handleChange() {
    let order = isAscending;
    if (activeId === id) {
      order = !isAscending;
      setIsAscending(order);
    } else {
      order = defeaultIsAscending;
      setIsAscending(defeaultIsAscending);
    }
    let criterion = {
      name: criterionName,
      isAscending: order,
      key: subValue,
    };
    onClick(criterion, id);
  }
  //Renders chevron next to title if active
  return (
    <button className='w-full' onClick={() => handleChange()}>
      <div className='flex place-content-center items-center'>
        {title}
        {activeId === id && (isAscending ? <FaChevronDown className='ml-1' /> : <FaChevronUp className='ml-1' />)}
      </div>
    </button>
  );
}
