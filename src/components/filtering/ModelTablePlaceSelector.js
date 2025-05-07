import {useState} from "react";
import useModal from "@/hooks/useModal";
import AddModelModal from "@/components/modals/record/model/AddModelModal";
import ExpandButton from "../buttons/ExpandButton";
import {FaPlus} from "react-icons/fa6";
import {usePlacesQuery} from "@/hooks/queryHooks";
// Switches places for frontend user. Buttons change placeId in query
export default function ModelTablePlaceSelector({changePlaceId}) {
  const [active, setActive] = useState(0);
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const {data, isLoading, isError} = usePlacesQuery();

  function openModal() {
    setModalContent(<AddModelModal/>);
    setModalTitle("Dodaj rower");
    setIsModalOpen(true);
  }

  const createPlaces = (places) => {
    return [{placeId: 0, placeName: "Wszystkie"}, ...places];
  }

  function handleClick(index) {
    changePlaceId(index);
    setActive(index);
  }

  return (
    <div className='flex justify-between items-center h-fit'>
      <div className='flex *:px-5 h-12'>
        {createPlaces(!isLoading && !isError ? data : []).map((place, index) => (
          <ChangeTableButton
            key={place.placeId}
            title={place.placeName}
            isActive={index === active}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <ExpandButton className='bg-gray-200 mb-2' text='Dodaj model' onClick={openModal}>
        <FaPlus/>
      </ExpandButton>
    </div>
  );
}

function ChangeTableButton({isActive, title, onClick}) {
  return (
    <button
      className={
        isActive ? "bg-secondary rounded-t-lg h-full hover:bg-tertiary" : "bg-primary rounded-t-lg h-full hover:bg-tertiary"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
}
